import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, ExternalLink } from 'lucide-react';
import { certifications } from '../data/portfolio';
import ScrollDownIndicator from './ScrollDownIndicator';

const Certifications = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="certifications" className="relative min-h-[100vh] py-20 bg-gray-50 dark:bg-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Certifications & Achievements
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Professional certifications and achievements that validate my expertise in data science and technology
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-white dark:bg-dark-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                <Award className="h-6 w-6 text-white" />
              </div>

              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                {cert.title}
              </h3>

              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
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
                  className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200 text-sm"
                >
                  <ExternalLink className="h-4 w-4" />
                  Verify
                </a>
              )}
            </motion.div>
          ))}
        </div>

        {/* ✅ Scroll Indicator */}
        <div className="flex justify-center mt-12">
          <ScrollDownIndicator targetId="blogs" />
        </div>
      </div>
    </section>
  );
};

export default Certifications;