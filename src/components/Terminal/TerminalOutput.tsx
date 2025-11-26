import React, { useState, useEffect } from 'react';
import { TerminalOutputItem } from '../../contexts/TerminalContext';

interface TerminalOutputProps {
    item: TerminalOutputItem;
}

const TerminalOutput: React.FC<TerminalOutputProps> = ({ item }) => {
    const [displayedContent, setDisplayedContent] = useState<string | React.ReactNode>('');
    const [isTyping, setIsTyping] = useState(false);

    // Utility function to convert URLs in text to clickable links
    const linkify = (text: string): React.ReactNode => {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const parts = text.split(urlRegex);

        return parts.map((part, i) => {
            if (part.match(urlRegex)) {
                return (
                    <a
                        key={i}
                        href={part}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400 hover:text-cyan-300 underline cursor-pointer transition-colors"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {part}
                    </a>
                );
            }
            return part;
        });
    };

    useEffect(() => {
        if (typeof item.content === 'string' && item.type !== 'component') {
            const text = item.content;

            // Immediate render for empty string or very short text to avoid timer overhead
            if (!text) {
                setDisplayedContent('');
                setIsTyping(false);
                return;
            }

            setIsTyping(true);
            let i = 0;
            setDisplayedContent('');

            // Faster typing for longer text
            const speed = text.length > 100 ? 1 : 10;

            const intervalId = setInterval(() => {
                const currentText = text.slice(0, i + 1);
                setDisplayedContent(currentText);
                i++;
                if (i === text.length) {
                    clearInterval(intervalId);
                    setIsTyping(false);
                    // Apply linkification after typing completes
                    setDisplayedContent(linkify(text));
                }
            }, speed);

            return () => clearInterval(intervalId);
        } else {
            // Defensive check: if content is an object but not a valid React element, stringify it
            if (typeof item.content === 'object' && item.content !== null && !React.isValidElement(item.content)) {
                console.warn('TerminalOutput received object content:', item.content);
                setDisplayedContent(JSON.stringify(item.content, null, 2));
            } else {
                setDisplayedContent(item.content);
            }
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

export default React.memo(TerminalOutput);
