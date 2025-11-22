import { useState } from 'react';
import { useTerminal } from '../contexts/TerminalContext';

export const useMatrixTransition = () => {
    const { setTerminalMode } = useTerminal();
    const [isRaining, setIsRaining] = useState(false);
    const [pendingTransition, setPendingTransition] = useState<'simple' | 'contact' | null>(null);

    const triggerTransition = (type: 'simple' | 'contact' | 'rain') => {
        setIsRaining(true);
        if (type !== 'rain') {
            setPendingTransition(type);
        }
    };

    const handleRainComplete = () => {
        setIsRaining(false);
        if (pendingTransition) {
            setTerminalMode(false);
            if (pendingTransition === 'contact') {
                // Wait for mode switch then scroll with retry logic
                const scrollToContact = (retries = 0) => {
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                    } else if (retries < 10) {
                        setTimeout(() => scrollToContact(retries + 1), 100);
                    } else {
                        // Fallback
                        window.location.hash = 'contact';
                    }
                };
                setTimeout(() => scrollToContact(), 100);
            }
            setPendingTransition(null);
        }
    };

    return {
        isRaining,
        triggerTransition,
        handleRainComplete
    };
};
