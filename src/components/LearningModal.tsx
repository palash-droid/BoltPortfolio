import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, XCircle } from 'lucide-react';

interface LearningModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  projectTitle: string;
}

const LearningModal = ({ isOpen, onClose, projectId, projectTitle }: LearningModalProps) => {
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const loadContent = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`/learned-from-projects/project-${projectId}.md`);
      if (!response.ok) {
        throw new Error('Content not found');
      }
      const text = await response.text();
      setContent(text);
    } catch {
      setError('Learning content not available for this project yet.');
      setContent('');
    } finally {
      setIsLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    if (isOpen && projectId) {
      loadContent();
    }
  }, [isOpen, projectId, loadContent]);

  const renderMarkdown = (text: string) => {
    // Simple markdown to HTML conversion for basic formatting
    return text
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4 mt-6">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/^- (.*$)/gim, '<li class="ml-4 mb-1">$1</li>')
      .replace(/\n\n/g, '</p><p class="mb-3">')
      .replace(/^(?!<[h|p|li])(.*$)/gim, '<p class="mb-3 text-gray-700 dark:text-gray-300">$1')
      .replace(/<p class="mb-3 text-gray-700 dark:text-gray-300"><\/p>/g, '')
      .replace(/<p class="mb-3 text-gray-700 dark:text-gray-300">(.*?)<\/p>/g, (match, content) => {
        if (content.trim() === '') return '';
        return match;
      });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white dark:bg-dark-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-dark-700">
              <div className="flex items-center gap-3">
                <BookOpen className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  What I Learned: {projectTitle}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-lg transition-colors duration-200"
                aria-label="Close modal"
              >
                <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">{error}</p>
                </div>
              ) : (
                <div
                  className="prose prose-gray dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
                />
              )}
            </div>

            {/* Bottom Close Button */}
            <div className="flex justify-center p-6 border-t border-gray-200 dark:border-dark-700">
              <button
                onClick={onClose}
                className="flex items-center gap-2 px-6 py-3 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 rounded-lg transition-colors duration-200 font-medium"
              >
                <XCircle className="h-5 w-5" />
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LearningModal; 