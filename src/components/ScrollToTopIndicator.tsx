import { ChevronUp } from 'lucide-react';

const ScrollToTopIndicator = () => {
    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <button
            onClick={handleScrollToTop}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-500 hover:bg-primary-600 transition-all duration-300 shadow-md hover:shadow-lg"
            aria-label="Scroll to top"
        >
            <ChevronUp className="text-white h-6 w-6" />
        </button>
    );
};

export default ScrollToTopIndicator;
