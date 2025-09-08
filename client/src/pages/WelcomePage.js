// client/src/pages/WelcomePage.js
import React, { useRef } from 'react';
import styled from 'styled-components';

// Import all the welcome page components
import Navbar from '../components/Welcome/Navbar';
import HeroSection from '../components/Welcome/HeroSection';
import AboutSection from '../components/Welcome/AboutSection';
import Footer from '../components/Welcome/Footer';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
`;

const WelcomePage = () => {
  const aboutRef = useRef(null);

  // Function to be passed to the Navbar component
  const scrollToAbout = () => {
    // The `?.current?.scrollIntoView` safely checks if ref exists before calling scrollIntoView
    aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <PageWrapper>
      <Navbar scrollToAbout={scrollToAbout} />
      <MainContent>
        <HeroSection />
        {/* Pass the ref to the AboutSection component */}
        <AboutSection ref={aboutRef} />
      </MainContent>
      <Footer />
    </PageWrapper>
  );
};

export default WelcomePage;