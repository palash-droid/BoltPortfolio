import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTerminal } from '../../contexts/TerminalContext';
import TerminalOutput from './TerminalOutput';
import MatrixRain from './MatrixRain';
import MobileToolbar from './MobileToolbar';
import { executeCommand, commands } from '../../utils/CommandRegistry';
import { useMatrixTransition } from '../../hooks/useMatrixTransition';

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
    } = useTerminal();

    const [input, setInput] = useState('');
    const [historyIndex, setHistoryIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
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

    const executeInput = useCallback(() => {
        const cmd = input.trim();
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

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
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
                    <div className="mb-4">
                        <div className="text-blue-300">Welcome to Palash's Portfolio Terminal v1.0.0</div>
                        <div className="text-blue-300">Type "help" for commands, "ask &lt;question&gt;" to chat with AI, or "simple" for GUI.</div>
                    </div>

                    {output.map((item, index) => (
                        <TerminalOutput key={index} item={item} />
                    ))}

                    <div className="flex items-center mt-2">
                        <span className="mr-2 text-blue-400 font-bold">{currentPath}</span>
                        <span className="mr-2 text-green-500">❯</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value.toLowerCase())}
                            onKeyDown={handleKeyDown}
                            className="bg-transparent border-none outline-none text-gray-100 flex-1 caret-green-500"
                            autoComplete="off"
                            spellCheck="false"
                            autoCapitalize="none"
                            aria-label="Terminal Input"
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
