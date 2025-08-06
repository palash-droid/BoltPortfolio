import { useState } from 'react';
import { X, Download, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ResumeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ResumeModal = ({ isOpen, onClose }: ResumeModalProps) => {
    const [isLoading, setIsLoading] = useState(false);

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
                        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-3">
                                <FileText className="h-6 w-6 text-primary-500" />
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    Resume
                                </h2>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={handleDownload}
                                    disabled={isLoading}
                                    className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                                >
                                    <Download className="h-4 w-4" />
                                    {isLoading ? 'Downloading...' : 'Download'}
                                </button>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
                                    aria-label="Close modal"
                                >
                                    <X className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                                </button>
                            </div>
                        </div>

                        {/* PDF Viewer */}
                        <div className="p-6 h-[75vh] overflow-hidden">
                            <div className="w-full h-full bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                                <iframe
                                    src="/resume.pdf#toolbar=0&navpanes=0&scrollbar=0"
                                    className="w-full h-full border-0"
                                    title="Resume PDF Viewer"
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
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                View your complete resume above. Use the download button to save a copy.
                            </p>
                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                <FileText className="h-4 w-4" />
                                PDF Document
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ResumeModal; 