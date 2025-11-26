import React, { useState, useEffect } from 'react';

const AsciiLogo: React.FC = () => {
    const [colorIndex, setColorIndex] = useState(0);

    const colors = [
        'text-red-500',
        'text-orange-500',
        'text-yellow-500',
        'text-green-500',
        'text-blue-500',
        'text-indigo-500',
        'text-purple-500',
        'text-pink-500'
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setColorIndex((prev) => (prev + 1) % colors.length);
        }, 500);

        return () => clearInterval(interval);
    }, []);

    const nameArt = `
██████╗   █████╗  ██╗       █████╗  ███████╗ ██╗  ██╗      ██████╗  ██╗  ██╗  █████╗   ██████╗   ██╗    ██╗  █████╗  ████████╗ ██╗  ██╗  █████╗  ██████╗ 
██╔══██╗ ██╔══██╗ ██║      ██╔══██╗ ██╔════╝ ██║  ██║      ██╔══██╗ ██║  ██║ ██╔══██╗ ██╔════╝   ██║    ██║ ██╔══██╗ ╚══██╔══╝ ██║ ██╔╝ ██╔══██╗ ██╔══██╗
██████╔╝ ███████║ ██║      ███████║ ███████╗ ███████║      ██████╔╝ ███████║ ███████║ ██║  ███╗  ██║ █╗ ██║ ███████║    ██║    █████╔╝  ███████║ ██████╔╝
██╔═══╝  ██╔══██║ ██║      ██╔══██║ ╚════██║ ██╔══██║      ██╔══██╗ ██╔══██║ ██╔══██║ ██║   ██║  ██║███╗██║ ██╔══██║    ██║    ██╔═██╗  ██╔══██║ ██╔══██╗
██║      ██║  ██║ ███████╗ ██║  ██║ ███████║ ██║  ██║      ██████╔╝ ██║  ██║ ██║  ██║ ╚██████╔╝  ╚███╔███╔╝ ██║  ██║    ██║    ██║  ██╗ ██║  ██║ ██║  ██║
╚═╝      ╚═╝  ╚═╝ ╚══════╝ ╚═╝  ╚═╝ ╚══════╝ ╚═╝  ╚═╝      ╚═════╝  ╚═╝  ╚═╝ ╚═╝  ╚═╝  ╚═════╝    ╚══╝╚══╝  ╚═╝  ╚═╝    ╚═╝    ╚═╝  ╚═╝ ╚═╝  ╚═╝ ╚═╝  ╚═╝
`.trim();

    return (
        // Changed classes:
        // 1. Removed 'text-xs sm:text-sm...'
        // 2. Added 'text-[0.7vw]' -> Sets font size to 0.7% of the total screen width
        // 3. Added 'w-full' and 'overflow-hidden' to ensure container behaves
        <div className={`flex flex-row items-center justify-center w-full overflow-hidden font-mono whitespace-pre leading-none mb-6 transition-colors duration-500 ${colors[colorIndex]} text-[0.7vw] md:text-[0.6vw]`}>
            <div className="leading-[1.15]">{nameArt}</div>
        </div>
    );
};

export default AsciiLogo;