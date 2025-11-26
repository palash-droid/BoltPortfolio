import React, { useEffect, useRef } from 'react';

interface MatrixRainProps {
    onComplete: () => void;
}

const CHARS = '0123456789ABCDEF';

const MatrixRain: React.FC<MatrixRainProps> = ({ onComplete }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const columns = Math.floor(canvas.width / 20);
        const drops: number[] = [];

        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }

        const draw = () => {
            // Semi-transparent black to create trail effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#0F0'; // Green text
            ctx.font = '15px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = CHARS.charAt(Math.floor(Math.random() * CHARS.length));
                ctx.fillText(text, i * 20, drops[i] * 20);

                if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }

                drops[i]++;
            }
        };

        const interval = setInterval(draw, 33);

        // Auto-close after 5 seconds
        const timeout = setTimeout(() => {
            onComplete();
        }, 5000);

        let resizeTimeout: number;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = window.setTimeout(() => {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }, 100);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
            clearTimeout(resizeTimeout);
            window.removeEventListener('resize', handleResize);
        };
    }, [onComplete]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full z-50 cursor-pointer bg-black"
            onClick={onComplete}
        />
    );
};

export default MatrixRain;
