import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTerminal } from '../../contexts/TerminalContext';
import TerminalOutput from './TerminalOutput';
import MatrixRain from './MatrixRain';
import MobileToolbar from './MobileToolbar';
import { executeCommand, commands } from '../../utils/CommandRegistry';
import { useMatrixTransition } from '../../hooks/useMatrixTransition';
import AsciiLogo from './AsciiLogo';

const GHOST_COMMANDS = ['help', 'about', 'projects', 'contact-me', 'ask <Question> Example: ask what are your skills?', 'ask <Question> Example: ask what are your Projects?', 'GUI, Note: This Command Takes You To Interactive GUI Mode of my Portfolio'];
const TYPING_SPEED_MIN = 50;
const TYPING_SPEED_MAX = 150;
const DELETING_SPEED = 50;
const PAUSE_END = 1500;
const PAUSE_START = 500;

const Terminal: React.FC = () => {
    const {
        history,
        addToHistory,
        output,
        addOutput,
        clearOutput,
        currentPath,
        setCurrentPath,
        setTerminalMode,
        inputOverride,
        setInputOverride,
        pendingCommand,
        setPendingCommand,
    } = useTerminal();

    const [input, setInput] = useState('');
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [isGhostTyping, setIsGhostTyping] = useState(true);
    const [ghostIndex, setGhostIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const { isRaining, triggerTransition, handleRainComplete } = useMatrixTransition();

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [output]);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    // Auto-resize textarea when input changes (including ghost typing)
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.style.height = 'auto';
            inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
        }
    }, [input]);

    const stopGhostTyping = useCallback(() => {
        if (isGhostTyping) {
            setIsGhostTyping(false);
            setInput('');
        }
    }, [isGhostTyping]);

    useEffect(() => {
        if (!isGhostTyping) return;

        const currentCommand = GHOST_COMMANDS[ghostIndex];

        let timeout: ReturnType<typeof setTimeout>;

        if (isDeleting) {
            if (charIndex > 0) {
                timeout = setTimeout(() => {
                    setInput(currentCommand.substring(0, charIndex - 1));
                    setCharIndex(charIndex - 1);
                }, DELETING_SPEED);
            } else {
                setIsDeleting(false);
                setGhostIndex((prev) => (prev + 1) % GHOST_COMMANDS.length);
                timeout = setTimeout(() => { }, PAUSE_START);
            }
        } else {
            if (charIndex < currentCommand.length) {
                const randomSpeed = Math.floor(Math.random() * (TYPING_SPEED_MAX - TYPING_SPEED_MIN + 1)) + TYPING_SPEED_MIN;
                timeout = setTimeout(() => {
                    setInput(currentCommand.substring(0, charIndex + 1));
                    setCharIndex(charIndex + 1);
                }, randomSpeed);
            } else {
                timeout = setTimeout(() => {
                    setIsDeleting(true);
                }, PAUSE_END);
            }
        }

        return () => clearTimeout(timeout);
    }, [charIndex, isDeleting, ghostIndex, isGhostTyping]);

    // Effect to handle pending commands triggered by UI components
    useEffect(() => {
        if (pendingCommand) {
            executeInput(pendingCommand);
            setPendingCommand?.(null);
        }
    }, [pendingCommand]);

    const handleTab = useCallback(() => {
        const trimmedInput = input.trim();
        if (!trimmedInput) return;

        const availableCommands = Object.keys(commands);
        const matches = availableCommands.filter(cmd => cmd.startsWith(trimmedInput));

        if (matches.length === 1) {
            setInput(matches[0]);
        } else if (matches.length > 1) {
            addOutput({ type: 'info', content: matches.join('  '), className: 'text-blue-300' });
        }
        // Removed focus call to prevent keyboard popping up on mobile
    }, [input, addOutput]);

    const handleArrowUp = useCallback(() => {
        if (history.length > 0) {
            const newIndex = historyIndex < history.length - 1 ? historyIndex + 1 : historyIndex;
            setHistoryIndex(newIndex);
            setInput(history[history.length - 1 - newIndex]);
        }
        // Removed focus call
    }, [history, historyIndex]);

    const handleArrowDown = useCallback(() => {
        if (historyIndex > 0) {
            const newIndex = historyIndex - 1;
            setHistoryIndex(newIndex);
            setInput(history[history.length - 1 - newIndex]);
        } else {
            setHistoryIndex(-1);
            setInput('');
        }
        // Removed focus call
    }, [history, historyIndex]);

    const executeInput = useCallback((cmdOverride?: string) => {
        const cmd = cmdOverride || input.trim();
        if (!cmd) return;

        addOutput({ type: 'text', content: `${currentPath} ❯ ${cmd}`, className: 'text-gray-100 font-bold' });
        addToHistory(cmd);

        if (inputOverride) {
            inputOverride(cmd, addOutput);
            setInputOverride?.(null);
            setInput('');
            setHistoryIndex(-1);
            return;
        }

        const [commandName, ...args] = cmd.split(' ');

        const result = executeCommand(commandName, args, {
            currentPath,
            setCurrentPath,
            setInputOverride,
            triggerTransition
        });

        if (result.action === 'clear') {
            clearOutput();
        } else if (result.action === 'switch_mode') {
            setTerminalMode(false);
        } else if (result.action === 'rain') {
            triggerTransition('rain');
        } else if (result.action === 'matrix_transition') {
            triggerTransition('simple');
        } else if (result.action === 'switch_mode_contact') {
            triggerTransition('contact');
        } else if (result.action === 'navigate_projects') {
            triggerTransition('projects');
        } else if (result.action === 'navigate_contact') {
            triggerTransition('contact');
        } else {
            result.output.forEach(addOutput);
        }

        setInput('');
        setHistoryIndex(-1);
    }, [input, currentPath, addOutput, addToHistory, setCurrentPath, clearOutput, setTerminalMode, triggerTransition, inputOverride, setInputOverride]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        stopGhostTyping();
        if (e.key === 'Enter') {
            e.preventDefault();
            executeInput();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            handleArrowUp();
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            handleArrowDown();
        } else if (e.key === 'Tab') {
            e.preventDefault();
            handleTab();
        }
    };

    const handleContainerClick = () => {
        inputRef.current?.focus();
    };

    const handleMobileAction = (action: () => void) => {
        action();
        // Explicitly blur to prevent/close keyboard
        setTimeout(() => {
            inputRef.current?.blur();
        }, 0);
    };

    return (
        <>
            {isRaining && <MatrixRain onComplete={handleRainComplete} />}
            <div
                ref={containerRef}
                className="min-h-screen bg-black text-green-500 p-4 font-mono overflow-y-auto relative crt pb-20 md:pb-4"
                onClick={handleContainerClick}
            >
                <div className="max-w-4xl mx-auto relative z-10">
                    <div className="flex flex-col items-start mb-6 w-full">
                        {/* Logo Container */}
                        <div className="w-full">
                            <AsciiLogo />
                        </div>

                        {/* Welcome Message */}
                        <div>
                            <div className="text-blue-300 font-bold text-lg mb-2">Welcome to Palash's Portfolio Terminal v1.0.0</div>
                            <div className="text-blue-300">Type "help" for commands, "ask &lt;question&gt;" to chat with AI, or "simple" for GUI.</div>
                        </div>
                    </div>

                    {output.map((item, index) => (
                        <TerminalOutput key={index} item={item} />
                    ))}

                    <div className="flex items-start mt-2">
                        <span className="mr-2 text-blue-400 font-bold whitespace-nowrap">{currentPath}</span>
                        <span className="mr-2 text-green-500">❯</span>
                        <textarea
                            ref={inputRef}
                            value={input}
                            onChange={(e) => {
                                if (isGhostTyping) stopGhostTyping();
                                setInput(e.target.value.toLowerCase());
                                // Auto-resize
                                e.target.style.height = 'auto';
                                e.target.style.height = `${e.target.scrollHeight}px`;
                            }}
                            onClick={stopGhostTyping}
                            onKeyDown={handleKeyDown}
                            className="bg-transparent border-none outline-none text-gray-100 flex-1 caret-green-500 resize-none overflow-hidden min-h-[24px] whitespace-pre-wrap break-words"
                            autoComplete="off"
                            spellCheck="false"
                            autoCapitalize="none"
                            aria-label="Terminal Input"
                            rows={1}
                        />
                    </div>
                </div>
            </div>
            <MobileToolbar
                onTab={() => handleMobileAction(handleTab)}
                onArrowUp={() => handleMobileAction(handleArrowUp)}
                onArrowDown={() => handleMobileAction(handleArrowDown)}
                onEnter={() => handleMobileAction(executeInput)}
            />
        </>
    );
};

export default Terminal;
