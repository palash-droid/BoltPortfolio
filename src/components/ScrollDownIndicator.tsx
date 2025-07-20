import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface Props {
    targetId: string;
}

export default function ScrollDownIndicator({ targetId }: Props) {
    const handleClick = () => {
        const el = document.getElementById(targetId);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        } else {
            console.warn(`Element with ID "${targetId}" not found.`);
        }
    };

    return (
        <motion.button
            aria-label="Scroll down"
            onClick={handleClick}
            className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300"
            initial={{ y: 0 }}
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
            <ChevronDown size={28} className="animate-bounce" />
        </motion.button>
    );
}
