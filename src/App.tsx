import React, { Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import BlogModal from './components/BlogModal';
import { BlogProvider } from './contexts/BlogContext';
import { TerminalProvider, useTerminal } from './contexts/TerminalContext';
import ChatWidget from './components/ChatWidget';

import Terminal from './components/Terminal/Terminal';

// Lazy load pages for better performance
const HomePage = React.lazy(() => import('./pages/HomePage'));
const ProjectsPage = React.lazy(() => import('./pages/ProjectsPage'));
const BlogsPage = React.lazy(() => import('./pages/BlogsPage'));

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-white dark:bg-dark-900">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
  </div>
);

const AppContent = () => {
  const location = useLocation();
  const { isTerminalMode, setTerminalMode } = useTerminal();

  if (isTerminalMode) {
    return <Terminal />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-dark-900 text-gray-900 dark:text-white transition-colors duration-300 overflow-x-hidden w-full">
      <Navigation />
      <main className="relative w-full overflow-x-hidden">
        <AnimatePresence mode="wait">
          <Suspense fallback={<LoadingFallback />}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<HomePage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/blogs" element={<BlogsPage />} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </main>
      <Footer />
      <BlogModal />
      <ChatWidget />

      {/* Floating button to return to terminal */}
      <button
        onClick={() => setTerminalMode(true)}
        className="fixed bottom-4 right-4 bg-black text-green-500 px-4 py-2 rounded-full font-mono shadow-lg hover:bg-gray-900 transition-colors z-50 border border-green-500/30"
      >
        &gt;_ Terminal
      </button>
    </div>
  );
};

function App() {
  return (
    <BlogProvider>
      <TerminalProvider>
        <AppContent />
      </TerminalProvider>
    </BlogProvider>
  );
}

export default App;
