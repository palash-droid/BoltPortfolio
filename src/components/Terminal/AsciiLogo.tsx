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
        }, 500); // Change color every 500ms

        return () => clearInterval(interval);
    }, []);

    // "Palash Bhagwatkar" in ANSI Shadow font with extra spacing
    const asciiArt = `
██████╗   █████╗  ██╗       █████╗  ███████╗ ██╗  ██╗      ██████╗  ██╗  ██╗  █████╗   ██████╗   ██╗    ██╗  █████╗  ████████╗ ██╗  ██╗  █████╗  ██████╗ 
██╔══██╗ ██╔══██╗ ██║      ██╔══██╗ ██╔════╝ ██║  ██║      ██╔══██╗ ██║  ██║ ██╔══██╗ ██╔════╝   ██║    ██║ ██╔══██╗ ╚══██╔══╝ ██║ ██╔╝ ██╔══██╗ ██╔══██╗
██████╔╝ ███████║ ██║      ███████║ ███████╗ ███████║      ██████╔╝ ███████║ ███████║ ██║  ███╗  ██║ █╗ ██║ ███████║    ██║    █████╔╝  ███████║ ██████╔╝
██╔═══╝  ██╔══██║ ██║      ██╔══██║ ╚════██║ ██╔══██║      ██╔══██╗ ██╔══██║ ██╔══██║ ██║   ██║  ██║███╗██║ ██╔══██║    ██║    ██╔═██╗  ██╔══██║ ██╔══██╗
██║      ██║  ██║ ███████╗ ██║  ██║ ███████║ ██║  ██║      ██████╔╝ ██║  ██║ ██║  ██║ ╚██████╔╝  ╚███╔███╔╝ ██║  ██║    ██║    ██║  ██╗ ██║  ██║ ██║  ██║
╚═╝      ╚═╝  ╚═╝ ╚══════╝ ╚═╝  ╚═╝ ╚══════╝ ╚═╝  ╚═╝      ╚═════╝  ╚═╝  ╚═╝ ╚═╝  ╚═╝  ╚═════╝    ╚══╝╚══╝  ╚═╝  ╚═╝    ╚═╝    ╚═╝  ╚═╝ ╚═╝  ╚═╝ ╚═╝  ╚═╝
    `;

    return (
        <div className={`font-mono whitespace-pre text-xs sm:text-sm md:text-base leading-none mb-6 transition-colors duration-500 ${colors[colorIndex]}`}>
            {asciiArt}
        </div>
    );
};

export default AsciiLogo;
