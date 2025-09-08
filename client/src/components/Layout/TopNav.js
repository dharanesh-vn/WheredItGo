// client/src/components/Layout/TopNav.js
import React from 'react';
import styled from 'styled-components';
import { FaLandmark, FaExchangeAlt, FaHeart, FaUniversity, FaPiggyBank } from 'react-icons/fa';
import { MdAccountBalance, MdSwapHoriz, MdFavorite, MdAttachMoney, MdShowChart, MdAssessment } from 'react-icons/md';


const NavGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const NavCard = styled.div`
  background: #2a2a2a;
  border-radius: 12px;
  padding: 1.5rem 1rem;
  border: 1px solid #3a3a3a;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    background: #3a3a3a;
    border-color: #7F00FF;
  }
`;

const IconWrapper = styled.div`
  font-size: 2rem;
  color: #bb86fc;
  margin-bottom: 0.75rem;
`;

const NavText = styled.p`
  font-size: 1rem;
  font-weight: 500;
  color: #f0f0f0;
  margin: 0;
`;

const NavSubtext = styled.p`
    font-size: 0.8rem;
    color: #888;
    margin: 0.25rem 0 0 0;
`;

const TopNav = () => {
  // In a multi-page dashboard, these would use `useNavigate` to link to different pages.
  // For a single-page dash, they can be used to scroll to sections.
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <NavGrid>
        <NavCard onClick={() => scrollTo('accounts')}>
            <IconWrapper><MdAccountBalance/></IconWrapper>
            <NavText>Accounts</NavText>
            <NavSubtext>Manage accounts</NavSubtext>
        </NavCard>
        <NavCard onClick={() => scrollTo('transactions')}>
            <IconWrapper><MdSwapHoriz/></IconWrapper>
            <NavText>Transactions</NavText>
            <NavSubtext>Record transactions</NavSubtext>
        </NavCard>
        <NavCard onClick={() => scrollTo('goals')}>
            <IconWrapper><MdFavorite/></IconWrapper>
            <NavText>Wish List</NavText>
            <NavSubtext>Organize your goals</NavSubtext>
        </NavCard>
        <NavCard onClick={() => scrollTo('loans')}>
            <IconWrapper><MdAttachMoney/></IconWrapper>
            <NavText>Debts & Loans</NavText>
            <NavSubtext>Check loan stats</NavSubtext>
        </NavCard>
        <NavCard onClick={() => scrollTo('investments')}>
            <IconWrapper><MdShowChart/></IconWrapper>
            <NavText>Investments</NavText>
            <NavSubtext>Manage portfolio</NavSubtext>
        </NavCard>
         <NavCard onClick={() => scrollTo('reports')}>
            <IconWrapper><MdAssessment/></IconWrapper>
            <NavText>Reports</NavText>
            <NavSubtext>Financial insights</NavSubtext>
        </NavCard>
    </NavGrid>
  );
};

export default TopNav;