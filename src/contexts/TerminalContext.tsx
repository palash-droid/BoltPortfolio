import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';

export type TerminalOutputItem = {
    type: 'text' | 'error' | 'success' | 'info' | 'warning' | 'component';
    content: string | React.ReactNode;
    className?: string;
};

interface TerminalContextType {
    isTerminalMode: boolean;
    setTerminalMode: (mode: boolean) => void;
    history: string[];
    addToHistory: (command: string) => void;
    output: TerminalOutputItem[];
    addOutput: (item: TerminalOutputItem) => void;
    clearOutput: () => void;
    currentPath: string;
    setCurrentPath: (path: string) => void;
    inputOverride?: ((input: string, addOutput: (item: TerminalOutputItem) => void) => void) | null;
    setInputOverride?: (handler: ((input: string, addOutput: (item: TerminalOutputItem) => void) => void) | null) => void;
    pendingCommand?: string | null;
    setPendingCommand?: (command: string | null) => void;
}

const TerminalContext = createContext<TerminalContextType | undefined>(undefined);

export const TerminalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isTerminalMode, setIsTerminalMode] = useState(true);
    const [history, setHistory] = useState<string[]>(() => {
        const saved = localStorage.getItem('terminal_history');
        return saved ? JSON.parse(saved) : [];
    });

    const [output, setOutput] = useState<TerminalOutputItem[]>([]);
    const [currentPath, setCurrentPath] = useState('~/');
    const [inputOverride, setInputOverride] = useState<((input: string, addOutput: (item: TerminalOutputItem) => void) => void) | null>(null);
    const [pendingCommand, setPendingCommand] = useState<string | null>(null);

    useEffect(() => {
        localStorage.setItem('terminal_history', JSON.stringify(history));
    }, [history]);

    const addToHistory = useCallback((command: string) => {
        setHistory((prev) => {
            const newHistory = [...prev, command];
            if (newHistory.length > 50) return newHistory.slice(newHistory.length - 50);
            return newHistory;
        });
    }, []);

    const addOutput = useCallback((item: TerminalOutputItem) => {
        setOutput((prev) => [...prev, item]);
    }, []);

    const clearOutput = useCallback(() => {
        setOutput([]);
    }, []);

    const value = React.useMemo(() => ({
        isTerminalMode,
        setTerminalMode: setIsTerminalMode,
        history,
        addToHistory,
        output,
        addOutput,
        clearOutput,
        currentPath,
        setCurrentPath,
        inputOverride,
        setInputOverride,
        pendingCommand,
        setPendingCommand,
    }), [isTerminalMode, history, addToHistory, output, addOutput, clearOutput, currentPath, inputOverride, pendingCommand]);

    return (
        <TerminalContext.Provider value={value}>
            {children}
        </TerminalContext.Provider>
    );
};

export const useTerminal = () => {
    const context = useContext(TerminalContext);
    if (context === undefined) {
        throw new Error('useTerminal must be used within a TerminalProvider');
    }
    return context;
};
