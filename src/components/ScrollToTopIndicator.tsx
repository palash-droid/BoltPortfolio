import { ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';

const ScrollToTopIndicator = () => {
    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex justify-center"
        >
            <button
                type="button" // ✅ Fix 1: explicitly declare button type
                onClick={handleScrollToTop}
                aria-label="Scroll to top" // ✅ Fix 2: for screen readers
                title="Scroll to top"     // ✅ Fix 3: visible tooltip on hover
                className="flex flex-col items-center text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200"
            >
                <ChevronUp className="h-6 w-6 animate-bounce mb-2" />
            </button>
        </motion.div>
    );
};

export default ScrollToTopIndicator;
