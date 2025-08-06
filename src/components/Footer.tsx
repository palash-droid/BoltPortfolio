import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { contactInfo } from '../data/portfolio';

const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-gray-800 border-t border-gray-700 dark:border-gray-600 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-gray-400 text-sm">
              © 2024 Palash Bhagwatkar. All rights reserved.
            </p>
          </div>

          <div className="flex gap-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-700"
              aria-label="GitHub Profile"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-200 p-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-700"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href={`mailto:${contactInfo.email}`}
              className="text-gray-400 hover:text-primary-500 transition-colors duration-200 p-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-700"
              aria-label="Send Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;