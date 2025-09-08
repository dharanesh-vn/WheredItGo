// client/src/components/Welcome/AboutSection.js
import React from 'react';
import styled from 'styled-components';
// Adjusted import paths for all assets
import trusted from '../../assets/trusted.png';
import secure from '../../assets/secure.png';
import simple from '../../assets/simple.png';
import insightful from '../../assets/insightful.png';

const Section = styled.section`
  background: linear-gradient(135deg, #1d1d1d, #111111);
  padding: 5rem 2rem;
  color: white;
  font-family: 'Poppins', sans-serif;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 600;
  background: linear-gradient(90deg, #8e2de2, #4a00e0);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #cccccc;
  margin-top: 0.5rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const Cards = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  margin-top: 4rem;
`;

const Card = styled.div`
  background: #1e1e1e;
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  width: 260px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid #333;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 30px rgba(138, 43, 226, 0.4);
  }

  img {
    width: 64px;
    height: 64px;
    object-fit: contain;
    margin-bottom: 1.5rem;
  }

  h3 {
    margin-bottom: 0.75rem;
    font-size: 1.3rem;
    color: #bb86fc;
    font-weight: 600;
  }

  p {
    font-size: 0.95rem;
    line-height: 1.5;
    color: #e0e0e0;
  }
`;

// `React.forwardRef` is used to pass the `ref` down to the `section` element
// This is necessary for the `scrollToAbout` functionality.
const AboutSection = React.forwardRef((props, ref) => {
  return (
    <Section ref={ref} id="about">
      <Header>
        <Title>Why Choose Us?</Title>
        <Subtitle>
          We're not just another tracker. We provide the cold, hard truths about your spending, but in a pretty package.
        </Subtitle>
      </Header>
      <Cards>
        <Card>
          <img src={trusted} alt="Trusted Icon" />
          <h3>Trusted</h3>
          <p>
            Thousands track their expenses with us daily without crying.
            (Mostly.)
          </p>
        </Card>
        <Card>
          <img src={secure} alt="Secure Icon" />
          <h3>Secure</h3>
          <p>Your data is hashed, salted, and kept safer than your weekend spending secrets.</p>
        </Card>
        <Card>
          <img src={simple} alt="Simple Icon" />
          <h3>Simple</h3>
          <p>Clean UI. No ads. Just pure, unadulterated financial reality checks.</p>
        </Card>
        <Card>
          <img src={insightful} alt="Insightful Icon" />
          <h3>Insightful</h3>
          <p>Charts that slap. Trends you might not like. But insights you definitely need.</p>
        </Card>
      </Cards>
    </Section>
  );
});

export default AboutSection;