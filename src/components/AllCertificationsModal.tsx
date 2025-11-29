import { motion, AnimatePresence } from 'framer-motion';
import { X, Award, ExternalLink, Image } from 'lucide-react';
import { certifications } from '../data/portfolio';
import { useState } from 'react';
import CertificationImageModal from './CertificationImageModal';

interface AllCertificationsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AllCertificationsModal = ({ isOpen, onClose }: AllCertificationsModalProps) => {
    const [selectedCert, setSelectedCert] = useState<{
        imageUrl: string;
        title: string;
        issuer: string;
    } | null>(null);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleImageClick = (cert: any) => {
        if (cert.image) {
            setSelectedCert({
                imageUrl: cert.image,
                title: cert.title,
                issuer: cert.issuer
            });
        }
    };

    const closeImageModal = () => {
        setSelectedCert(null);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black bg-opacity-75 backdrop-blur-sm"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="relative w-full max-w-6xl max-h-[90vh] bg-gray-50 dark:bg-dark-900 rounded-xl overflow-hidden shadow-2xl flex flex-col"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-800">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                All Certifications
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                A complete list of my professional certifications and achievements
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                            aria-label="Close modal"
                        >
                            <X className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                        </button>
                    </div>

                    {/* Content - Scrollable Grid */}
                    <div className="flex-1 overflow-y-auto p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {certifications.map((cert, index) => (
                                <motion.div
                                    key={cert.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.05 }}
                                    className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-dark-700"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg shadow-sm">
                                            <Award className="h-6 w-6 text-white" />
                                        </div>
                                        {cert.image && (
                                            <button
                                                onClick={() => handleImageClick(cert)}
                                                className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-500 hover:text-primary-500 hover:bg-gray-50 dark:hover:bg-dark-700 rounded-lg transition-all duration-200"
                                                title="View Certificate Image"
                                            >
                                                <Image className="h-4 w-4" />
                                                <span>View Certificate</span>
                                            </button>
                                        )}
                                    </div>

                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                                        {cert.title}
                                    </h3>

                                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                                        {cert.issuer}
                                    </p>

                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                                        Issued: {new Date(cert.issueDate).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long'
                                        })}
                                    </p>

                                    {cert.verifyLink && (
                                        <a
                                            href={cert.verifyLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200"
                                        >
                                            <ExternalLink className="h-4 w-4" />
                                            Verify Credential
                                        </a>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-800">
                        <div className="flex justify-center">
                            <button
                                onClick={onClose}
                                className="px-8 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 font-medium"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Nested Image Modal */}
            {selectedCert && (
                <CertificationImageModal
                    isOpen={!!selectedCert}
                    onClose={closeImageModal}
                    imageUrl={selectedCert.imageUrl}
                    title={selectedCert.title}
                    issuer={selectedCert.issuer}
                />
            )}
        </AnimatePresence>
    );
};

export default AllCertificationsModal;
