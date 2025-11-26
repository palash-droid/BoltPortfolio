import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Loader2, AlertCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import { useBlog } from '../contexts/BlogContext';

// Import highlight.js CSS (you'll need to add this to your index.css or main CSS file)
import 'highlight.js/styles/github-dark.css';

const BlogModal = () => {
  const { selectedBlog, selectedBlogContent, isLoading, error, closeBlog } = useBlog();

  useEffect(() => {
    if (selectedBlog) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedBlog]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeBlog();
    }
  };

  // Handle ESC key press
  useEffect(() => {
    const handleEscPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedBlog) {
        closeBlog();
      }
    };

    document.addEventListener('keydown', handleEscPress);
    return () => document.removeEventListener('keydown', handleEscPress);
  }, [selectedBlog, closeBlog]);

  return (
    <AnimatePresence>
      {selectedBlog && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={closeBlog}
              className="absolute top-4 right-4 z-10 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors duration-200 shadow-lg"
              aria-label="Close modal"
            >
              <X className="h-6 w-6 text-gray-600 dark:text-gray-400" />
            </button>

            {/* Modal Content */}
            <div className="overflow-y-auto max-h-[90vh]">
              {/* Header Image */}
              <div className="relative h-64 md:h-80 overflow-hidden">
                <img
                  src={selectedBlog.image}
                  alt={selectedBlog.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full shadow-lg">
                    {selectedBlog.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Meta Information */}
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
                  <span>{new Date(selectedBlog.publishDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {selectedBlog.readTime}
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
                  {selectedBlog.title}
                </h1>

                {/* Content */}
                <div className="mb-8">
                  {isLoading && (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                      <span className="ml-3 text-gray-600 dark:text-gray-400">Loading content...</span>
                    </div>
                  )}

                  {error && (
                    <div className="flex items-center justify-center py-12 text-red-600 dark:text-red-400">
                      <AlertCircle className="h-8 w-8" />
                      <span className="ml-3">{error}</span>
                    </div>
                  )}

                  {selectedBlogContent && !isLoading && !error && (
                    <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-code:text-pink-600 dark:prose-code:text-pink-400 prose-pre:bg-gray-900 prose-pre:text-gray-100">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeHighlight, rehypeRaw]}
                        components={{
                          // Custom components for better styling
                          h1: ({ ...props }) => <h1 className="text-3xl font-bold mb-6 mt-8 text-gray-900 dark:text-white" {...props} />,
                          h2: ({ ...props }) => <h2 className="text-2xl font-semibold mb-4 mt-6 text-gray-900 dark:text-white" {...props} />,
                          h3: ({ ...props }) => <h3 className="text-xl font-semibold mb-3 mt-5 text-gray-900 dark:text-white" {...props} />,
                          p: ({ ...props }) => <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed" {...props} />,
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          code: ({ children, className, ...props }: any) => {
                            const match = /language-(\w+)/.exec(className || '');
                            const isInline = !match;

                            return isInline
                              ? <code className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 text-pink-600 dark:text-pink-400 rounded text-sm font-mono" {...props}>{children}</code>
                              : <code className="block" {...props}>{children}</code>;
                          },
                          pre: ({ ...props }) => <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto mb-4" {...props} />,
                          blockquote: ({ ...props }) => <blockquote className="border-l-4 border-blue-500 pl-6 py-2 my-6 bg-gray-50 dark:bg-gray-800 italic" {...props} />,
                          ul: ({ ...props }) => <ul className="mb-4 pl-6 space-y-2 list-disc" {...props} />,
                          ol: ({ ...props }) => <ol className="mb-4 pl-6 space-y-2 list-decimal" {...props} />,
                          li: ({ children, ...props }) => {
                            // Ensure li is properly structured
                            return <li className="text-gray-700 dark:text-gray-300 ml-0" {...props}>{children}</li>;
                          },
                          a: ({ ...props }) => <a className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
                          img: ({ ...props }) => <img className="rounded-lg shadow-md mx-auto my-6" {...props} />,
                          hr: ({ ...props }) => <hr className="my-8 border-gray-200 dark:border-gray-700" {...props} />,
                        }}
                      >
                        {selectedBlogContent}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>

                {/* Close Button */}
                <div className="text-center border-t border-gray-200 dark:border-gray-700 pt-8">
                  <button
                    onClick={closeBlog}
                    className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Close Article
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BlogModal;