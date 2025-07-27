import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Cloud,
  Brain,
  BarChart3,
  DivideIcon,
  LucideIcon as LucideIconType,
} from 'lucide-react';
import { interests, skills } from '../data/portfolio';
import SkillsCarousel from './SkillsCarousel';
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
      className="relative py-20 bg-gray-50 dark:bg-dark-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Skills Carousel Section with Animated Heading - Moved to top */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          {/* Animated Skills Heading */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-12"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Technical Skills & Expertise
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            >
              A comprehensive toolkit of technologies and tools I use to transform data into actionable insights
            </motion.p>

            {/* Animated decorative elements */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex justify-center items-center space-x-2 mt-4"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 0
                }}
                className="w-2 h-2 bg-primary-500 rounded-full"
              />
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 0.3
                }}
                className="w-2 h-2 bg-secondary-500 rounded-full"
              />
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 0.6
                }}
                className="w-2 h-2 bg-accent-500 rounded-full"
              />
            </motion.div>
          </motion.div>

          {/* Skills Carousel */}
          <SkillsCarousel skills={skills} className="w-full" />
        </motion.div>

        {/* Areas of Interest Section */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Areas of Interest
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Exploring cutting-edge technologies and methodologies that drive innovation in data science and analytics
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-16">
          {interests.map((interest, index) => {
            const IconComponent = iconMap[interest.icon];
            return (
              <motion.div
                key={interest.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white dark:bg-dark-900 rounded-xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>

                <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {interest.title}
                </h3>

                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {interest.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Scroll Down Indicator */}
        <div className="flex justify-center">
          <ScrollDownIndicator targetId="projects" />
        </div>
      </div>
    </section>
  );
};

export default Interests;