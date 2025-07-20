import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useBlog } from '../contexts/BlogContext';
import { blogPosts } from '../data/portfolio';
import ScrollDownIndicator from './ScrollDownIndicator';

const Blog = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { openBlog } = useBlog();
  const featuredPosts = blogPosts.filter(post => post.featured).slice(0, 3);

  return (
    <section id="blogs" className="relative py-16 bg-gray-50 dark:bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Latest Blog Posts
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Insights, tutorials, and thoughts on data science, analytics, and emerging technologies
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 max-w-5xl mx-auto">
          {featuredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-gray-50 dark:bg-dark-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer"
              onClick={() => openBlog(post)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-2 py-1 bg-primary-600 text-white text-xs font-medium rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <span>{new Date(post.publishDate).toLocaleDateString()}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {post.readTime}
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                  {post.excerpt}
                </p>

                <button className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200 font-medium">
                  Read More →
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mb-6"
        >
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white rounded-lg font-semibold hover:from-secondary-600 hover:to-secondary-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Read All Articles
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>

        {/* Scroll indicator with proper spacing */}
        <div className="flex justify-center pb-4">
          <ScrollDownIndicator targetId="contact" />
        </div>
      </div>
    </section>
  );
};

export default Blog;