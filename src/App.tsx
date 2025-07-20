import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import BlogsPage from './pages/BlogsPage';
import Footer from './components/Footer';
import BlogModal from './components/BlogModal';
import { BlogProvider } from './contexts/BlogContext';

function App() {
  const location = useLocation();

  return (
    <BlogProvider>
      <div className="min-h-screen bg-white dark:bg-dark-900 text-gray-900 dark:text-white transition-colors duration-300">
        <Navigation />
        <main className="relative">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<HomePage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/blogs" element={<BlogsPage />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
        <BlogModal />
      </div>
    </BlogProvider>
  );
}

export default App;
