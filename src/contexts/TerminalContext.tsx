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

    return (
        <TerminalContext.Provider
            value={{
                isTerminalMode,
                setTerminalMode: setIsTerminalMode,
                history,
                addToHistory,
                output,
                addOutput,
                clearOutput,
                currentPath,
                setCurrentPath,
            }}
        >
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
