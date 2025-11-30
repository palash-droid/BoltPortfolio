import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, Briefcase, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { projects } from '../data/portfolio';
import ScrollDownIndicator from './ScrollDownIndicator';
import LearningModal from './LearningModal';

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [learningModalOpen, setLearningModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<{ id: string; title: string } | null>(null);

  const featuredProjects = projects.filter(project => project.featured).slice(0, 3);

  const handleLearningClick = (projectId: string, projectTitle: string) => {
    setSelectedProject({ id: projectId, title: projectTitle });
    setLearningModalOpen(true);
  };

  const handleCloseLearningModal = () => {
    setLearningModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="relative min-h-screen flex flex-col justify-center pt-20 pb-20 sm:pb-16 md:pb-10 bg-white dark:bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A showcase of my best work in data analysis, visualization, and machine learning
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`bg-gray-50 dark:bg-dark-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group ${index > 0 ? 'hidden md:block' : 'block'}`}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {project.title}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1 mb-3">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3 flex-wrap">
                  {project.liveDemo && (
                    <a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200 text-sm"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Live Demo
                    </a>
                  )}
                  {project.code && (
                    <a
                      href={project.code}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 text-sm"
                    >
                      <Github className="h-4 w-4" />
                      Code
                    </a>
                  )}
                  <button
                    onClick={() => handleLearningClick(project.id, project.title)}
                    className="flex items-center gap-2 text-red-600 dark:text-green-400 hover:text-red-700 dark:hover:text-green-300 transition-colors duration-200 text-sm"
                  >
                    <BookOpen className="h-4 w-4" />
                    What I Learned
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mb-16"
        >
          <Link
            to="/projects"
            onClick={() => {
              // Scroll to top of the page when navigating
              window.scrollTo(0, 0);
            }}
            className="px-8 py-3 bg-white dark:bg-dark-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-dark-800 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 inline-flex"
          >
            <Briefcase className="h-5 w-5 text-primary-500" />
            View All Projects
          </Link>
        </motion.div>

        {/* Scroll Down Indicator */}
        <div className="flex justify-center">
          <ScrollDownIndicator targetId="certifications" />
        </div>
      </div>

      {/* Learning Modal */}
      {selectedProject && (
        <LearningModal
          isOpen={learningModalOpen}
          onClose={handleCloseLearningModal}
          projectId={selectedProject.id}
          projectTitle={selectedProject.title}
        />
      )}
    </section>
  );
};

export default Projects;