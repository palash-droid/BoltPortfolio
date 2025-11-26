import React, { useState, useEffect } from 'react';

const AsciiLogo: React.FC = () => {
    const [colorIndex, setColorIndex] = useState(0);

    // Modern Pastel Palette (suited for dark backgrounds)
    const colors = [
        'text-rose-400',    // Soft Pink
        'text-amber-300',   // Pastel Gold/Cream
        'text-emerald-400', // Mint Green
        'text-sky-400',     // Baby Blue
        'text-indigo-400',  // Periwinkle
        'text-violet-400',  // Lavender
        'text-fuchsia-400', // Soft Magenta
        'text-teal-300'     // Aqua
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setColorIndex((prev) => (prev + 1) % colors.length);
        }, 500); // Speed of color change
        return () => clearInterval(interval);
    }, []);

    // 1. The Full Wide Logo (For Desktop)
    const fullArt = `
██████╗   █████╗  ██╗       █████╗  ███████╗ ██╗  ██╗      ██████╗  ██╗  ██╗  █████╗   ██████╗   ██╗    ██╗  █████╗  ████████╗ ██╗  ██╗  █████╗  ██████╗ 
██╔══██╗ ██╔══██╗ ██║      ██╔══██╗ ██╔════╝ ██║  ██║      ██╔══██╗ ██║  ██║ ██╔══██╗ ██╔════╝   ██║    ██║ ██╔══██╗ ╚══██╔══╝ ██║ ██╔╝ ██╔══██╗ ██╔══██╗
██████╔╝ ███████║ ██║      ███████║ ███████╗ ███████║      ██████╔╝ ███████║ ███████║ ██║  ███╗  ██║ █╗ ██║ ███████║    ██║    █████╔╝  ███████║ ██████╔╝
██╔═══╝  ██╔══██║ ██║      ██╔══██║ ╚════██║ ██╔══██║      ██╔══██╗ ██╔══██║ ██╔══██║ ██║   ██║  ██║███╗██║ ██╔══██║    ██║    ██╔═██╗  ██╔══██║ ██╔══██╗
██║      ██║  ██║ ███████╗ ██║  ██║ ███████║ ██║  ██║      ██████╔╝ ██║  ██║ ██║  ██║ ╚██████╔╝  ╚███╔███╔╝ ██║  ██║    ██║    ██║  ██╗ ██║  ██║ ██║  ██║
╚═╝      ╚═╝  ╚═╝ ╚══════╝ ╚═╝  ╚═╝ ╚══════╝ ╚═╝  ╚═╝      ╚═════╝  ╚═╝  ╚═╝ ╚═╝  ╚═╝  ╚═════╝    ╚══╝╚══╝  ╚═╝  ╚═╝    ╚═╝    ╚═╝  ╚═╝ ╚═╝  ╚═╝ ╚═╝  ╚═╝
`.trim();

    // 2. The Split Logo (For Mobile) - Part 1: PALASH
    const mobileTop = `
██████╗  █████╗ ██╗      █████╗ ███████╗██╗  ██╗
██╔══██╗██╔══██╗██║     ██╔══██╗██╔════╝██║  ██║
██████╔╝███████║██║     ███████║███████╗███████║
██╔═══╝ ██╔══██║██║     ██╔══██║╚════██║██╔══██║
██║     ██║  ██║███████╗██║  ██║███████║██║  ██║
╚═╝     ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝`.trim();

    // 3. The Split Logo (For Mobile) - Part 2: BHAGWATKAR
    const mobileBottom = `
██████╗ ██╗  ██╗ █████╗  ██████╗ ██╗    ██╗ █████╗ ████████╗██╗  ██╗ █████╗ ██████╗ 
██╔══██╗██║  ██║██╔══██╗██╔════╝ ██║    ██║██╔══██╗╚══██╔══╝██║ ██╔╝██╔══██╗██╔══██╗
██████╔╝███████║███████║██║  ███╗██║ █╗ ██║███████║   ██║   █████╔╝ ███████║██████╔╝
██╔══██╗██╔══██║██╔══██║██║   ██║██║███╗██║██╔══██║   ██║   ██╔═██╗ ██╔══██║██╔══██╗
██████╔╝██║  ██║██║  ██║╚██████╔╝╚███╔███╔╝██║  ██║   ██║   ██║  ██╗██║  ██║██║  ██║
╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝  ╚══╝╚══╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝`.trim();

    return (
        <div className={`flex flex-col items-center justify-center w-full mb-6 transition-colors duration-500 ${colors[colorIndex]} font-mono whitespace-pre leading-none`}>

            {/* MOBILE VIEW: Shows stacked logo. 
                text-[1.8vw] makes it large enough to read on phone */}
            <div className="flex flex-col items-center gap-2 md:hidden">
                <div className="text-[1.8vw] sm:text-[1.2vw]">{mobileTop}</div>
                <div className="text-[1.8vw] sm:text-[1.2vw]">{mobileBottom}</div>
            </div>

            {/* DESKTOP VIEW: Shows full single line logo. 
                Hidden on mobile, appears on 'md' screens and up */}
            <div className="hidden md:block text-[0.6vw] lg:text-[0.5vw]">
                {fullArt}
            </div>
        </div>
    );
};

export default AsciiLogo;