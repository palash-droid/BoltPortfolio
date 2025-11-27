import React from 'react';
import logoArt from '../../assets/Palash_Logo.txt?raw';

const AsciiLogo: React.FC = () => {
    return (
        <div className="flex flex-col items-start justify-start w-full mb-2 md:mb-6">

            {/* 
                Responsive Layout:
                - Unified single line for all devices as per user request.
                - Mobile: Scaled down to fit width without splitting (approx 2.5vw).
                - Desktop: Standard size.
            */}
            <div className={`font-mono leading-none animate-soothe tracking-[-0.09em] flex flex-col items-start`}>
                <div className="whitespace-pre text-[6.3vw] sm:text-[6vw] md:text-[4vw] lg:text-[4vw] xl:text-[2.5vw]">
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