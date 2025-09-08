// client/src/components/Welcome/Footer.js
import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: #111;
  color: #888;
  padding: 2.5rem 2rem;
  text-align: center;
  font-size: 0.95rem;
  font-family: 'Poppins', sans-serif;
  border-top: 1px solid #222;
`;

const FooterText = styled.div`
  margin-bottom: 1rem;
`;

const Link = styled.a`
  color: #888;
  margin: 0 0.75rem;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #bb86fc;
  }
`;

const Footer = () => (
  <FooterContainer>
    <FooterText>© {new Date().getFullYear()} Where’dItGo? — All rights (barely) managed.</FooterText>
    <div>
      <Link href="#">Privacy</Link>
      <Link href="#">Terms</Link>
      <Link href="mailto:lvnzoro.99@gmail.com">Contact</Link>
    </div>
  </FooterContainer>
);

export default Footer;