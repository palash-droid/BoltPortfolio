import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface CertificationImageModalProps {
    isOpen: boolean;
    onClose: () => void;
    imageUrl: string;
    title: string;
    issuer: string;
}

const CertificationImageModal = ({ isOpen, onClose, imageUrl, title, issuer }: CertificationImageModalProps) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="relative max-w-4xl w-full max-h-[90vh] bg-white dark:bg-dark-900 rounded-xl overflow-hidden shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                {issuer}
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
                            aria-label="Close modal"
                        >
                            <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                        </button>
                    </div>

                    {/* Image */}
                    <div className="relative overflow-hidden">
                        <img
                            src={imageUrl}
                            alt={`${title} certification`}
                            className="w-full h-auto max-h-[70vh] object-contain"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=500';
                            }}
                        />
                    </div>

                    {/* Footer */}
                    <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                            Click outside to close
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default CertificationImageModal; 