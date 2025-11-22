import React, { useState, useEffect } from 'react';
import { TerminalOutputItem } from '../../contexts/TerminalContext';

interface TerminalOutputProps {
    item: TerminalOutputItem;
}

const TerminalOutput: React.FC<TerminalOutputProps> = ({ item }) => {
    const [displayedContent, setDisplayedContent] = useState<string | React.ReactNode>('');
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        if (typeof item.content === 'string' && item.type !== 'component') {
            setIsTyping(true);
            let i = 0;
            const text = item.content;
            setDisplayedContent('');

            // Faster typing for longer text
            const speed = text.length > 100 ? 1 : 10;

            const intervalId = setInterval(() => {
                setDisplayedContent((prev) => text.slice(0, i + 1));
                i++;
                if (i === text.length) {
                    clearInterval(intervalId);
                    setIsTyping(false);
                }
            }, speed);

            return () => clearInterval(intervalId);
        } else {
            setDisplayedContent(item.content);
        }
    }, [item.content, item.type]);

    const getBaseClasses = () => {
        if (item.className) return item.className;

        switch (item.type) {
            case 'error':
                return 'text-red-500';
            case 'success':
                return 'text-green-400';
            case 'info':
                return 'text-blue-300';
            case 'warning':
                return 'text-yellow-400';
            case 'component':
                return '';
            case 'text':
            default:
                return 'text-gray-300';
        }
    };

    return (
        <div className={`mb-1 whitespace-pre-wrap ${getBaseClasses()} ${isTyping ? 'typing-cursor' : ''}`}>
            {displayedContent}
        </div>
    );
};

export default TerminalOutput;
