import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User, Bot, ArrowDown, MoreHorizontal, RotateCcw } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    processQuery,
    ChatResponse,
    getProjectDetails,
    getSkillDetails,
    getCertificationDetails,
    getContactDetails,
    getAboutDetails,
    getBlogDetails
} from '../utils/ChatbotBrain';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
    isMenu?: boolean;
    remainingOptions?: { label: string, value: string }[];
    showEndConfirmation?: boolean;
}

const ChatWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [visitedTopics, setVisitedTopics] = useState<string[]>([]);
    const [showNewMessageAlert, setShowNewMessageAlert] = useState(false);
    const [isAtBottom, setIsAtBottom] = useState(true);
    const [isTyping, setIsTyping] = useState(false);

    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const lastContentIdRef = useRef<string>('');
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { text: "Read about me to know who I am", label: "About Me", value: "about" },
        { text: "Have a look at my skills", label: "Skills", value: "skills" },
        { text: "Explore the projects I have built", label: "Projects", value: "projects" },
        { text: "See what certifications I own", label: "Certifications", value: "certifications" },
        { text: "You can also read some of my blogs", label: "Blogs", value: "blogs" },
        { text: "Or, if you want to reach out", label: "Contact Me", value: "contact" }
    ];

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good Morning";
        if (hour < 18) return "Good Afternoon";
        return "Good Evening";
    };

    const initializeChat = () => {
        const welcomeMsg: Message = {
            id: 'welcome',
            text: `${getGreeting()}! Here is how I can help you:`,
            sender: 'bot',
            timestamp: new Date(),
            isMenu: true
        };
        setMessages([welcomeMsg]);
        setVisitedTopics([]);
        lastContentIdRef.current = 'welcome';
    };

    // Initialize welcome message
    useEffect(() => {
        if (messages.length === 0) {
            initializeChat();
        }
    }, []);

    const scrollToTarget = (targetId: string) => {
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
        setShowNewMessageAlert(false);
    };

    const scrollToNewMessage = () => {
        if (lastContentIdRef.current) {
            scrollToTarget(lastContentIdRef.current);
        } else {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
            setShowNewMessageAlert(false);
        }
    };

    // Handle scroll to detect if user is at bottom
    const handleScroll = () => {
        if (chatContainerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
            const atBottom = scrollHeight - scrollTop - clientHeight < 100;
            setIsAtBottom(atBottom);
            if (atBottom) {
                setShowNewMessageAlert(false);
            }
        }
    };

    // Focus input when opening
    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
        }
    }, [isOpen]);

    const renderMessageContent = (msg: Message, isLast: boolean) => {
        if (msg.isMenu) {
            // Filter menu items based on visited topics
            const filteredItems = menuItems.filter(item => !visitedTopics.includes(item.value));

            if (filteredItems.length === 0) {
                return <p>You've explored everything! Feel free to ask anything else.</p>;
            }

            return (
                <div className="flex flex-col gap-4">
                    <p>{msg.text}</p>
                    <div className="flex flex-col gap-3 pl-1">
                        {filteredItems.map((item, idx) => (
                            <div key={idx} className="flex flex-col items-start gap-1">
                                <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">{item.text}</span>
                                <button
                                    onClick={() => handleOptionClick(item.value)}
                                    disabled={!isLast}
                                    className="px-3 py-1.5 bg-white dark:bg-gray-700 border border-blue-500 dark:border-green-500 text-blue-600 dark:text-green-400 text-xs rounded-md hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors shadow-sm w-full text-left font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {item.label}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        const renderRemainingOptions = () => {
            if (!msg.remainingOptions || msg.remainingOptions.length === 0) {
                return null;
            }

            return (
                <div className="flex flex-col gap-3 mt-2">
                    <hr className="border-gray-200 dark:border-gray-700 border-t" />
                    <p className="text-sm">Would you like to have a look at my:</p>
                    <div className="flex flex-wrap gap-2">
                        {msg.remainingOptions.map((item, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleOptionClick(item.value)}
                                disabled={!isLast}
                                className="px-3 py-1.5 bg-white dark:bg-gray-700 border border-blue-500 dark:border-green-500 text-blue-600 dark:text-green-400 text-xs rounded-md hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors shadow-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>
            );
        };

        const renderEndConfirmation = () => {
            if (!msg.showEndConfirmation) return null;
            return (
                <div className="flex gap-3 mt-2">
                    <button
                        onClick={() => handleOptionClick('yes_end')}
                        disabled={!isLast}
                        className="px-4 py-1.5 bg-blue-600 dark:bg-green-600 text-white text-xs rounded-md hover:bg-blue-700 dark:hover:bg-green-700 transition-colors shadow-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Yes
                    </button>
                    <button
                        onClick={() => handleOptionClick('no_end')}
                        disabled={!isLast}
                        className="px-4 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors shadow-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        No
                    </button>
                </div>
            );
        };

        // Handle View All Projects placeholder
        if (msg.text.includes('{{VIEW_ALL_PROJECTS}}')) {
            const parts = msg.text.split('{{VIEW_ALL_PROJECTS}}');
            return (
                <div className="whitespace-pre-wrap">
                    {renderFormattedText(parts[0])}
                    <button
                        onClick={() => handleOptionClick('view_all_projects')}
                        disabled={!isLast}
                        className="mt-4 px-4 py-2 bg-blue-600 dark:bg-green-600 text-white text-sm rounded-lg hover:bg-blue-700 dark:hover:bg-green-700 transition-colors shadow-md w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        View all Projects
                    </button>
                    {renderFormattedText(parts[1])}
                    {renderRemainingOptions()}
                    {renderEndConfirmation()}
                </div>
            );
        }

        return (
            <div className="whitespace-pre-wrap">
                {renderFormattedText(msg.text)}
                {renderRemainingOptions()}
                {renderEndConfirmation()}
            </div>
        );
    };

    const renderFormattedText = (text: string) => {
        if (!text) return null;
        const parts = text.split(/(\*\*[^*]+\*\*)|(\[[^\]]+\]\([^)]+\))|(https?:\/\/[^\s]+)|(\n\n---\n\n)|(\^\^[^\^]+\^\^)/g).filter(t => t);
        return parts.map((token, i) => {
            if (token === '\n\n---\n\n') {
                return <hr key={i} className="my-3 border-gray-200 dark:border-gray-700 border-t" />;
            }
            if (token.startsWith('**') && token.endsWith('**')) {
                return <strong key={i} className="font-bold">{token.slice(2, -2)}</strong>;
            }
            if (token.startsWith('^^') && token.endsWith('^^')) {
                return <strong key={i} className="font-bold text-blue-600 dark:text-green-400">{token.slice(2, -2)}</strong>;
            }
            const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
            if (linkMatch) {
                return <a key={i} href={linkMatch[2]} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{linkMatch[1]}</a>;
            }
            if (token.match(/^https?:\/\//)) {
                return <a key={i} href={token} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{token}</a>;
            }
            return <span key={i}>{token}</span>;
        });
    };

    const addMessage = (msg: Message) => {
        if (msg.sender === 'bot') {
            lastContentIdRef.current = msg.id;
        }

        setMessages(prev => [...prev, msg]);

        setTimeout(() => {
            if (isAtBottom) {
                scrollToNewMessage();
            } else {
                setShowNewMessageAlert(true);
            }
        }, 100);
    };

    const handleOptionClick = (value: string) => {
        if (value === 'view_all_projects') {
            if (location.pathname !== '/') {
                navigate('/');
                setTimeout(() => {
                    const element = document.getElementById('projects');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                }, 500);
            } else {
                const element = document.getElementById('projects');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
            }
            return;
        }

        if (value === 'yes_end') {
            setIsOpen(false);
            setTimeout(() => {
                initializeChat();
            }, 500);
            return;
        }

        if (value === 'no_end') {
            setIsTyping(true);
            if (isAtBottom) setTimeout(scrollToNewMessage, 100);
            setTimeout(() => {
                setIsTyping(false);
                addMessage({
                    id: Date.now().toString(),
                    text: "Okay, feel free to ask anything else!",
                    sender: 'bot',
                    timestamp: new Date()
                });
            }, 1000);
            return;
        }

        // Standard Topic Selection
        const newVisited = [...visitedTopics, value];
        setVisitedTopics(newVisited);

        // 1. Show user selection
        const label = menuItems.find(i => i.value === value)?.label || value;
        const userMsg: Message = {
            id: Date.now().toString(),
            text: label,
            sender: 'user',
            timestamp: new Date()
        };
        setMessages(prev => [...prev, userMsg]);
        if (isAtBottom) setTimeout(scrollToNewMessage, 100);

        // 2. Show typing indicator
        setIsTyping(true);
        if (isAtBottom) setTimeout(scrollToNewMessage, 100);

        // 3. Process response
        setTimeout(() => {
            let details = '';
            switch (value) {
                case 'about': details = getAboutDetails(); break;
                case 'projects': details = getProjectDetails(); break;
                case 'skills': details = getSkillDetails(); break;
                case 'certifications': details = getCertificationDetails(); break;
                case 'contact': details = getContactDetails(); break;
                case 'blogs': details = getBlogDetails(); break;
                default: details = "I couldn't find those details.";
            }

            setIsTyping(false);

            // Calculate remaining options
            const remaining = menuItems.filter(item => !newVisited.includes(item.value));

            if (remaining.length > 0) {
                // Show details with remaining options
                addMessage({
                    id: Date.now().toString(),
                    text: details,
                    sender: 'bot',
                    timestamp: new Date(),
                    remainingOptions: remaining
                });
            } else {
                // Show details, then End Confirmation
                addMessage({
                    id: Date.now().toString(),
                    text: details,
                    sender: 'bot',
                    timestamp: new Date()
                });

                setTimeout(() => {
                    addMessage({
                        id: (Date.now() + 1).toString(),
                        text: "Thank you for exploring my portfolio! I hope you found everything you were looking for.\n\nWould you like to clear the chat and exit?",
                        sender: 'bot',
                        timestamp: new Date(),
                        showEndConfirmation: true
                    });
                }, 1000);
            }

        }, 1500);
    };

    const processBotResponse = (query: string) => {
        setIsTyping(true);
        if (isAtBottom) setTimeout(scrollToNewMessage, 100);

        setTimeout(() => {
            const response: ChatResponse = processQuery(query);

            setIsTyping(false);

            // Calculate remaining options (using current visitedTopics)
            const remaining = menuItems.filter(item => !visitedTopics.includes(item.value));

            addMessage({
                id: (Date.now() + 1).toString(),
                text: response.text,
                sender: 'bot',
                timestamp: new Date(),
                remainingOptions: remaining
            });

        }, 1500);
    };

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            text: input,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        if (isAtBottom) setTimeout(scrollToNewMessage, 100);

        setInput('');
        processBotResponse(userMsg.text);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <div className="fixed bottom-20 right-4 z-50">
            {/* Chat Window */}
            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm animate-in fade-in duration-200"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute bottom-16 right-0 w-[300px] sm:w-[350px] h-[500px] bg-white dark:bg-gray-900/95 backdrop-blur-md border border-gray-200 dark:border-green-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-200">
                        {/* Header */}
                        <div className="bg-gray-50/50 dark:bg-gray-800/50 p-4 border-b border-gray-200 dark:border-white/10 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-500 dark:bg-green-500 rounded-full animate-pulse" />
                                <span className="font-bold text-gray-900 dark:text-white">Assistant</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={initializeChat}
                                    className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-green-400 transition-colors"
                                    title="Reset Chat"
                                >
                                    <RotateCcw className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div
                            ref={chatContainerRef}
                            onScroll={handleScroll}
                            className="flex-1 overflow-y-auto p-4 space-y-4 bg-white/50 dark:bg-transparent relative"
                        >
                            {messages.map((msg, index) => (
                                <div
                                    key={msg.id}
                                    id={msg.id} // Add ID for scrolling
                                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                                >
                                    <div className={`flex items-start gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.sender === 'user' ? 'bg-blue-600' : 'bg-blue-600 dark:bg-green-600'
                                            }`}>
                                            {msg.sender === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                                        </div>
                                        <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.sender === 'user'
                                            ? 'bg-blue-600 text-white rounded-tr-none'
                                            : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-tl-none border border-gray-200 dark:border-white/10'
                                            } break-words shadow-sm`}>
                                            {renderMessageContent(msg, index === messages.length - 1)}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Typing Indicator */}
                            {isTyping && (
                                <div className="flex flex-col items-start">
                                    <div className="flex items-start gap-2">
                                        <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-blue-600 dark:bg-green-600">
                                            <Bot className="w-4 h-4 text-white" />
                                        </div>
                                        <div className="p-3 rounded-2xl rounded-tl-none bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-white/10">
                                            <MoreHorizontal className="w-5 h-5 text-gray-400 animate-pulse" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />

                            {/* New Message Alert (Left Side, Icon Only) */}
                            {showNewMessageAlert && (
                                <button
                                    onClick={scrollToNewMessage}
                                    className="absolute bottom-4 left-4 bg-blue-600 dark:bg-green-600 text-white p-2 rounded-full shadow-lg animate-bounce z-10 hover:bg-blue-700 dark:hover:bg-green-700 transition-colors"
                                    aria-label="New messages"
                                >
                                    <ArrowDown className="w-4 h-4" />
                                </button>
                            )}
                        </div>

                        {/* Input */}
                        <div className="p-4 bg-gray-50/50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-white/10">
                            <div className="flex gap-2">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Ask about projects, skills..."
                                    className="flex-1 bg-white dark:bg-gray-900 border border-gray-300 dark:border-white/10 rounded-full px-4 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-500/50 dark:focus:border-green-500/50 transition-colors placeholder-gray-400 dark:placeholder-gray-500"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!input.trim()}
                                    className="bg-blue-600 hover:bg-blue-500 dark:bg-green-600 dark:hover:bg-green-500 text-white p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-blue-600 hover:bg-blue-500 dark:bg-green-600 dark:hover:bg-green-500 text-white p-3 rounded-full shadow-lg transition-all hover:scale-110 active:scale-95"
                aria-label="Toggle Chat"
            >
                {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
            </button>
        </div>
    );
};

export default ChatWidget;
