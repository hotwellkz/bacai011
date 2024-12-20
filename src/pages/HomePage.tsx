import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Curriculum from '../components/Curriculum';
import AITeacher from '../components/AITeacher';
import CTA from '../components/CTA';

const HomePage = () => {
  return (
    <>
      <Hero />
      <Features />
      <Curriculum />
      <AITeacher />
      <CTA />
    </>
  );
};

export default HomePage;