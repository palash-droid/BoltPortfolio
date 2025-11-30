import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, BookOpen } from 'lucide-react';
import { useState } from 'react';
import { projects } from '../data/portfolio';
import LearningModal from '../components/LearningModal';

const ProjectsPage = () => {
  const [learningModalOpen, setLearningModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<{ id: string; title: string } | null>(null);

  const scrollToProjectsSection = () => {
    // Navigate to home page and then scroll to projects section
    setTimeout(() => {
      // Try multiple times to ensure the element is available
      const attemptScroll = (attempts = 0) => {
        const element = document.getElementById('projects');
        if (element) {
          element.scrollIntoView({ behavior: 'auto' });
        } else if (attempts < 10) {
          // Retry after 100ms if element not found
          setTimeout(() => attemptScroll(attempts + 1), 100);
        }
      };
      attemptScroll();
    }, 500); // Increased timeout to ensure page loads properly
  };

  const handleLearningClick = (projectId: string, projectTitle: string) => {
    setSelectedProject({ id: projectId, title: projectTitle });
    setLearningModalOpen(true);
  };

  const handleCloseLearningModal = () => {
    setLearningModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className="min-h-screen pt-16 bg-white dark:bg-dark-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <Link
            to="/"
            onClick={scrollToProjectsSection}
            className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200 mb-8 cursor-pointer"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Projects
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            All Projects
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A comprehensive collection of my work in data analysis, visualization, and machine learning
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-gray-50 dark:bg-dark-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                {project.featured && (
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-accent-600 text-white text-sm font-medium rounded-full">
                      Featured
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {project.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 flex-wrap">
                  {project.liveDemo && (
                    <a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200"
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
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                    >
                      <Github className="h-4 w-4" />
                      Code
                    </a>
                  )}
                  <button
                    onClick={() => handleLearningClick(project.id, project.title)}
                    className="flex items-center gap-2 text-red-600 dark:text-green-400 hover:text-red-700 dark:hover:text-green-300 transition-colors duration-200"
                  >
                    <BookOpen className="h-4 w-4" />
                    What I Learned
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            to="/"
            onClick={scrollToProjectsSection}
            className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200 cursor-pointer"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Projects
          </Link>
        </motion.div>
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
    </motion.div>
  );
};

export default ProjectsPage;
