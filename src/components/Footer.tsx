import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { contactInfo } from '../data/portfolio';

const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-dark-900 border-t border-gray-800 dark:border-dark-700 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-400 text-sm">
              © 2024 Palash Bhagwatkar. All rights reserved.
            </p>
          </div>

          <div className="flex gap-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href={`mailto:${contactInfo.email}`}
              className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
            >
              <Mail className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;