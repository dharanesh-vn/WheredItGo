// client/src/components/Welcome/HeroSection.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
// Adjusted path for the hero image
import heroImg from '../../assets/welcome.png';

const Section = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #121212;
  color: white;
  padding: 4rem 6rem;
  min-height: 80vh;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    padding: 2rem;
    text-align: center;
  }
`;

const TextContent = styled.div`
  flex: 1;
  max-width: 50%;
  
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const glow = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const Title = styled.h1`
  font-size: 3.8rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  background: linear-gradient(270deg, #8e2de2, #4a00e0, #8e2de2, #4a00e0);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${glow} 8s ease-in-out infinite;

  @media (max-width: 768px) {
    font-size: 2.8rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  max-width: 480px;
  line-height: 1.6;
  color: #e2e2e2;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    margin-left: auto;
    margin-right: auto;
  }
`;

const CTAButton = styled.button`
  background: linear-gradient(90deg, #8e2de2, #4a00e0);
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 30px;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 0 10px #4a00e0;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 20px #8e2de2;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 45%;

  @media (max-width: 768px) {
    max-width: 80%;
    margin-bottom: 2rem;
  }
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 16px;
  animation: float 6s ease-in-out infinite;

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-15px); }
  }
`;

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <Section>
      <TextContent>
        <Title>Where’dItGo?</Title>
        <Subtitle>
          Not sure where your salary went?
          <br />
          Same. But now there’s a chart for it.
        </Subtitle>
        <CTAButton onClick={() => navigate("/signup")}>Start Tracking</CTAButton>
      </TextContent>
      <ImageContainer>
        <Image src={heroImg} alt="Finance Dashboard Illustration" />
      </ImageContainer>
    </Section>
  );
};

export default HeroSection;