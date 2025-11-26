import { useState } from 'react';
import { useTerminal } from '../contexts/TerminalContext';

export const useMatrixTransition = () => {
    const { setTerminalMode } = useTerminal();
    const [isRaining, setIsRaining] = useState(false);
    const [pendingTransition, setPendingTransition] = useState<'simple' | 'contact' | 'projects' | null>(null);

    const triggerTransition = (type: 'simple' | 'contact' | 'projects' | 'rain') => {
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
            } else if (pendingTransition === 'projects') {
                // Wait for mode switch then scroll with retry logic
                const scrollToProjects = (retries = 0) => {
                    const projectsSection = document.getElementById('projects');
                    if (projectsSection) {
                        projectsSection.scrollIntoView({ behavior: 'smooth' });
                    } else if (retries < 10) {
                        setTimeout(() => scrollToProjects(retries + 1), 100);
                    } else {
                        // Fallback
                        window.location.hash = 'projects';
                    }
                };
                setTimeout(() => scrollToProjects(), 100);
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
