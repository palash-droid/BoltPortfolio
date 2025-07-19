import React from 'react';
import Hero from '../components/Hero';
import Interests from '../components/Interests';
import Projects from '../components/Projects';
import Certifications from '../components/Certifications';
import Blog from '../components/Blog';
import Contact from '../components/Contact';

const HomePage = () => {
  return (
    <>
      <Hero />
      <Interests />
      <Projects />
      <Certifications />
      <Blog />
      <Contact />
    </>
  );
};

export default HomePage;