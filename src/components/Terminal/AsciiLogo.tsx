import React from 'react';
import logoArt from '../../assets/Palash_Logo.txt?raw';

const AsciiLogo: React.FC = () => {
    // Split the logo text by space to separate "PALASH" and "BHAGWATKAR"
    // logoArt is likely "🅿🅰🅻🅰🆂🅷 🅱🅷🅰🅶🆆🅰🆃🅺🅰🆁"
    const parts = logoArt.trim().split(' ');
    const firstPart = parts[0] || logoArt;
    const secondPart = parts[1] || '';

    return (
        <div className="flex flex-col items-center md:items-start justify-start w-full mb-2 md:mb-6">

            {/* 
                Responsive Layout:
                - Mobile (< md): Split into two lines (PALASH \n BHAGWATKAR) to fit width.
                - Desktop (>= md): Single line.
            */}
            <div className={`font-mono leading-none animate-soothe tracking-[-0.09em] flex flex-col items-center md:block`}>

                {/* Mobile: Split View */}
                <div className="md:hidden flex flex-col items-start gap-2">
                    <div className="text-[13vw] sm:text-[10vw]">{firstPart}</div>
                    {secondPart && <div className="text-[13vw] sm:text-[10vw]">{secondPart}</div>}
                </div>

                {/* Desktop: Full View */}
                <div className="hidden md:block whitespace-pre text-[6vw] lg:text-[2.4vw]">
                    {logoArt}
                </div>
            </div>

            {/* Custom CSS for the smooth color morphing. */}
            <style>{`
                @keyframes soothe {
                   0%   { color: #86efac; } /* Emerald-300 */
                    15%  { color: #67e8f9; } /* Cyan-300 */
                    30%  { color: #93c5fd; } /* Blue-300 */
                    45%  { color: #c4b5fd; } /* Violet-300 */
                    60%  { color: #f0abfc; } /* Fuchsia-300 */
                    75%  { color: #fda4af; } /* Rose-300 */
                    90%  { color: #fcd34d; } /* Amber-300 */
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