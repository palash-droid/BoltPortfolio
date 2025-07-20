import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import Interests from '../components/Interests';
import Projects from '../components/Projects';
import Certifications from '../components/Certifications';
import Blog from '../components/Blog';
import Contact from '../components/Contact';

const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      <Hero />
      <Interests />
      <Projects />
      <Certifications />
      <Blog />
      <Contact />
    </motion.div>
  );
};

export default HomePage;
