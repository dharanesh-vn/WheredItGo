// client/src/components/Welcome/Navbar.js
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
// The path is adjusted to go up two directories (../..) to reach src/, then down into assets/
import logoImg from '../../assets/logo.png'; 

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 4rem;
  background: linear-gradient(135deg, #232323ff, #1a1a1a);
  color: white;
  font-family: 'Poppins', sans-serif;
  
  @media (max-width: 768px) {
    padding: 1rem 2rem;
    flex-direction: column;
    gap: 1rem;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
`;

const LogoImage = styled.img`
  height: 60px;
  width: 60px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const LogoText = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const NavLink = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.1rem;
  font-family: inherit;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
  padding: 0.5rem;

  &:hover {
    color: #a35aff;
    transform: translateY(-2px);
  }
`;

const SignUpButton = styled(NavLink)`
  background: linear-gradient(90deg, #8e2de2, #4a00e0);
  border-radius: 20px;
  padding: 0.6rem 1.5rem;

  &:hover {
    color: white;
    transform: scale(1.05) translateY(0);
    box-shadow: 0 0 10px #8e2de2;
  }
`;

const Navbar = ({ scrollToAbout }) => {
  const navigate = useNavigate();

  return (
    <Nav>
      <LogoContainer onClick={() => navigate("/")}>
        <LogoImage src={logoImg} alt="Where'dItGo Logo" />
        <LogoText>Where’dItGo?</LogoText>
      </LogoContainer>

      <NavLinks>
        <NavLink onClick={scrollToAbout}>About</NavLink>
        <NavLink onClick={() => navigate("/login")}>Login</NavLink>
        <SignUpButton onClick={() => navigate("/signup")}>Sign Up</SignUpButton>
      </NavLinks>
    </Nav>
  );
};

export default Navbar;