import { ChevronDown, Github, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';
import { skills } from '../data/portfolio';

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill.name);
    return acc;
  }, {} as Record<string, string[]>);

  const allSkills = Object.values(skillsByCategory).flat();

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-15">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Profile Picture */}
          <motion.div
            className="flex justify-center mt-8 lg:-mt-24"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full animate-pulse"></div>
              <div className="relative bg-white dark:bg-dark-900 rounded-full p-2">
                <img
                  src="./profile.jpg"
                  alt="Palash Bhagwatkar"
                  className="w-96 h-96 rounded-full object-cover border-4 border-white dark:border-dark-900"
                />
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full opacity-20 animate-float"></div>
            </div>
          </motion.div>

          {/* Right Column - Text Content and Interactive Elements */}
          <motion.div
            className="text-center lg:text-left space-y-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                Palash Bhagwatkar
              </span>
            </h1>

            {/* Professional Summary */}
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Data Analyst passionate about transforming complex data into actionable insights.
              Specialized in Python, SQL, and Business Intelligence tools.
            </p>

            {/* Call-to-Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <button
                onClick={() => scrollToSection('projects')}
                className="px-8 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-semibold hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                View My Work
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-3 border-2 border-primary-500 text-primary-600 dark:text-primary-400 rounded-lg font-semibold hover:bg-primary-500 hover:text-white transition-all duration-300"
              >
                Get in Touch
              </button>
            </div>

            {/* Data Analyst Skills Subheading */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Data Analyst Skills
              </h3>

              {/* Auto-scrolling Skills Carousel */}
              <div className="relative overflow-hidden">
                <div className="flex animate-scroll">
                  {[...allSkills, ...allSkills].map((skill, index) => (
                    <span
                      key={index}
                      className="inline-block bg-gray-100 dark:bg-dark-800 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-full text-sm font-medium mr-3 whitespace-nowrap"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-4 justify-center lg:justify-start mt-6">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label='GitHub'
                  className="p-3 bg-gray-100 dark:bg-dark-800 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-700 transition-colors duration-200 group"
                >
                  <Github className="h-6 w-6 text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label='Linkedin'
                  className="p-3 bg-gray-100 dark:bg-dark-800 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-700 transition-colors duration-200 group"
                >
                  <Linkedin className="h-6 w-6 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                </a>
              </div>

              {/* Scroll Indicator - moved here */}
              <motion.div
                className="mt-10 flex justify-center lg:justify-start"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <button
                  onClick={() => scrollToSection('interests')}
                  className="flex flex-col items-center text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200"
                >
                  <span className="text-sm mb-2">Scroll Down</span>
                  <ChevronDown className="h-6 w-6 animate-bounce" />
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
