import { useState, useEffect } from 'react';
import { X, Download, FileText, Smartphone, Monitor } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ResumeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ResumeModal = ({ isOpen, onClose }: ResumeModalProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [showMobileFallback, setShowMobileFallback] = useState(false);

    // Detect mobile device
    useEffect(() => {
        const checkMobile = () => {
            const userAgent = navigator.userAgent.toLowerCase();
            const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
            const isSmallScreen = window.innerWidth <= 768;
            setIsMobile(isMobileDevice || isSmallScreen);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Show mobile fallback after a short delay if on mobile
    useEffect(() => {
        if (isMobile && isOpen) {
            const timer = setTimeout(() => {
                setShowMobileFallback(true);
            }, 2000); // Give iframe 2 seconds to load
            return () => clearTimeout(timer);
        } else {
            setShowMobileFallback(false);
        }
    }, [isMobile, isOpen]);

    const handleDownload = async () => {
        setIsLoading(true);
        try {
            // Create a link element to trigger download
            const link = document.createElement('a');
            link.href = '/resume.pdf';
            link.download = 'Palash_Bhagwatkar_Resume.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading resume:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenInNewTab = () => {
        window.open('/resume.pdf', '_blank');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black bg-opacity-75"
                        onClick={onClose}
                    />

                    {/* Modal Content */}
                    <motion.div
                        className="relative bg-white dark:bg-gray-900 rounded-lg shadow-2xl max-w-4xl w-full mx-4 max-h-[95vh] overflow-hidden z-[10000]"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-3">
                                <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-primary-500" />
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                                    Resume
                                </h2>
                                {isMobile && (
                                    <Smartphone className="h-4 w-4 text-blue-500" />
                                )}
                            </div>
                            <div className="flex items-center gap-2 sm:gap-3">
                                <button
                                    onClick={handleDownload}
                                    disabled={isLoading}
                                    className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                                >
                                    <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                                    <span className="hidden sm:inline">{isLoading ? 'Downloading...' : 'Download'}</span>
                                    <span className="sm:hidden">{isLoading ? '...' : 'DL'}</span>
                                </button>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
                                    aria-label="Close modal"
                                >
                                    <X className="h-5 w-5 sm:h-6 sm:w-6 text-gray-500 dark:text-gray-400" />
                                </button>
                            </div>
                        </div>

                        {/* PDF Viewer */}
                        <div className="p-4 sm:p-6 h-[75vh] overflow-hidden">
                            {isMobile && showMobileFallback ? (
                                // Mobile fallback view
                                <div className="w-full h-full bg-gray-100 dark:bg-gray-800 rounded-lg flex flex-col items-center justify-center p-6">
                                    <div className="text-center space-y-4">
                                        <FileText className="h-16 w-16 text-gray-400 mx-auto" />
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            Resume PDF
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs">
                                            For the best viewing experience on mobile, please use one of the options below.
                                        </p>
                                        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
                                            <button
                                                onClick={handleOpenInNewTab}
                                                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 text-sm font-medium"
                                            >
                                                <Monitor className="h-4 w-4" />
                                                Open in Browser
                                            </button>
                                            <button
                                                onClick={handleDownload}
                                                disabled={isLoading}
                                                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 text-sm font-medium disabled:opacity-50"
                                            >
                                                <Download className="h-4 w-4" />
                                                {isLoading ? 'Downloading...' : 'Download'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                // Desktop/iframe view
                                <div className="w-full h-full bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                                    <iframe
                                        src="/resume.pdf#toolbar=0&navpanes=0&scrollbar=0"
                                        className="w-full h-full border-0"
                                        title="Resume PDF Viewer"
                                        onLoad={() => {
                                            // If iframe loads successfully, hide mobile fallback
                                            if (isMobile) {
                                                setShowMobileFallback(false);
                                            }
                                        }}
                                    >
                                        <p className="p-6 text-center text-gray-600 dark:text-gray-400">
                                            Your browser doesn't support PDF viewing.
                                            <button
                                                onClick={handleDownload}
                                                className="ml-2 text-primary-500 hover:text-primary-600 underline"
                                            >
                                                Click here to download the resume
                                            </button>
                                        </p>
                                    </iframe>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between p-4 sm:p-6 border-t border-gray-200 dark:border-gray-700">
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 flex-1">
                                {isMobile
                                    ? "Mobile view optimized. Use the buttons above for best experience."
                                    : "View your complete resume above. Use the download button to save a copy."
                                }
                            </p>
                            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                <FileText className="h-3 w-3 sm:h-4 sm:w-4" />
                                <span className="hidden sm:inline">PDF Document</span>
                                <span className="sm:hidden">PDF</span>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ResumeModal; 