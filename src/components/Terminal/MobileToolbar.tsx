import React from 'react';
import { ArrowUp, ArrowDown, CornerDownLeft } from 'lucide-react';

interface MobileToolbarProps {
    onTab: () => void;
    onArrowUp: () => void;
    onArrowDown: () => void;
    onEnter: () => void;
}

const MobileToolbar: React.FC<MobileToolbarProps> = ({ onTab, onArrowUp, onArrowDown, onEnter }) => {
    return (
        <div className="md:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-50">
            <button
                onPointerDown={(e) => { e.preventDefault(); onTab(); }}
                className="bg-gray-800/80 backdrop-blur-sm border border-green-500/30 text-green-500 p-3 rounded-full shadow-lg active:bg-gray-700 transition-colors"
                aria-label="Tab Complete"
            >
                <span className="font-mono text-xs font-bold">TAB</span>
            </button>
            <button
                onPointerDown={(e) => { e.preventDefault(); onArrowUp(); }}
                className="bg-gray-800/80 backdrop-blur-sm border border-green-500/30 text-green-500 p-3 rounded-full shadow-lg active:bg-gray-700 transition-colors"
                aria-label="Previous Command"
            >
                <ArrowUp className="w-5 h-5" />
            </button>
            <button
                onPointerDown={(e) => { e.preventDefault(); onArrowDown(); }}
                className="bg-gray-800/80 backdrop-blur-sm border border-green-500/30 text-green-500 p-3 rounded-full shadow-lg active:bg-gray-700 transition-colors"
                aria-label="Next Command"
            >
                <ArrowDown className="w-5 h-5" />
            </button>
            <button
                onPointerDown={(e) => { e.preventDefault(); onEnter(); }}
                className="bg-gray-800/80 backdrop-blur-sm border border-green-500/30 text-green-500 p-3 rounded-full shadow-lg active:bg-gray-700 transition-colors"
                aria-label="Enter"
            >
                <CornerDownLeft className="w-5 h-5" />
            </button>
        </div>
    );
};

export default MobileToolbar;
