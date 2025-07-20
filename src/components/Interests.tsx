import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Cloud,
  Brain,
  BarChart3,
  DivideIcon,
  LucideIcon as LucideIconType,
} from 'lucide-react';
import { interests } from '../data/portfolio';
import ScrollDownIndicator from './ScrollDownIndicator';

const iconMap: Record<string, LucideIconType> = {
  Cloud,
  Brain,
  BarChart3,
  DivideIcon,
};

const Interests = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="interests"
      className="relative min-h-[100vh] lg:min-h-[100vh] xl:min-h-[80vh] pt-20 pb-10 bg-gray-50 dark:bg-dark-800"
    >

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Areas of Interest
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Exploring cutting-edge technologies and methodologies that drive innovation in data science and analytics
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {interests.map((interest, index) => {
            const IconComponent = iconMap[interest.icon];
            return (
              <motion.div
                key={interest.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white dark:bg-dark-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="h-6 w-6 text-white" />
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {interest.title}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {interest.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* <div className="text-center mt-12 lg:mt-20">
        <p className="italic text-gray-500 dark:text-gray-400">
          “Turning data into decisions.”
        </p>
      </div> */}

      {/* Scroll Down Indicator to Projects */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
        <ScrollDownIndicator targetId="projects" />
      </div>
    </section>
  );
};

export default Interests;
