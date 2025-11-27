import React from 'react';
import logoArt from '../../assets/Palash_Logo.txt?raw';

const AsciiLogo: React.FC = () => {
    // We removed useState/useEffect because CSS animation is smoother and more performant.

    return (
        <div className="flex flex-col items-start justify-start w-full mb-2 md:mb-6">

            {/* 1. 'animate-soothe': Applies the custom animation defined below.
                2. Sizing: I adjusted the 'lg' text size. 3vw is usually too big for desktop ASCII 
                   and causes wrapping. 1.2vw is safer for wide screens.
            */}
            <div className={`font-mono whitespace-pre leading-none animate-soothe
                text-[6vw] 
                sm:text-[1.8vw]
                md:text-[1.4vw] 
                lg:text-[2.4vw] 
            `}>
                {logoArt}
            </div>

            {/* Custom CSS for the smooth color morphing.
               We use specific hex codes matching Tailwind's '300' series for a pastel look.
            */}
            <style>{`
                @keyframes soothe {
                   0%   { color: #86efac; } /* Emerald-300: Fresh Start */
                    15%  { color: #67e8f9; } /* Cyan-300: Clear Water */
                    30%  { color: #93c5fd; } /* Blue-300: Day Sky */
                    45%  { color: #c4b5fd; } /* Violet-300: Deep Calm */
                    60%  { color: #f0abfc; } /* Fuchsia-300: Soft Magic */
                    75%  { color: #fda4af; } /* Rose-300: Gentle Love */
                    90%  { color: #fcd34d; } /* Amber-300: Warm Sunset */
                    100% { color: #86efac; } /* Back to Emerald */
                }
                .animate-soothe {
                    animation: soothe 15s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

export default AsciiLogo;