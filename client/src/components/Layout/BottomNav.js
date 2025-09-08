// client/src/components/Layout/BottomNav.js
import React from 'react';
import styled from 'styled-components';
import { MdReceipt, MdDonutLarge, MdCreditCard, MdNotifications, MdEqualizer } from 'react-icons/md';

const NavGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  margin-top: 2rem;
  
  @media (max-width: 992px) { grid-template-columns: repeat(3, 1fr); }
  @media (max-width: 576px) { grid-template-columns: repeat(2, 1fr); }
`;
const NavCard = styled.div`
  background: #2a2a2a; border-radius: 12px; padding: 1.5rem 1rem;
  border: 1px solid #3a3a3a; display: flex; flex-direction: column;
  align-items: center; justify-content: center; text-align: center;
  cursor: pointer; transition: all 0.3s ease;
  &:hover { transform: translateY(-5px); background: #3a3a3a; border-color: #7F00FF; }
`;
const IconWrapper = styled.div` font-size: 2rem; color: #bb86fc; margin-bottom: 0.75rem; `;
const NavText = styled.p` font-size: 1rem; font-weight: 500; color: #f0f0f0; margin: 0; `;
const NavSubtext = styled.p` font-size: 0.8rem; color: #888; margin: 0.25rem 0 0 0; `;

const BottomNav = () => {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  
  return (
    <NavGrid>
      <NavCard onClick={() => scrollTo('subscriptions')}><IconWrapper><MdReceipt/></IconWrapper><NavText>Bills</NavText><NavSubtext>Manage your bills</NavSubtext></NavCard>
      <NavCard onClick={() => scrollTo('reports')}><IconWrapper><MdDonutLarge/></IconWrapper><NavText>Categories</NavText><NavSubtext>Income & Expenses</NavSubtext></NavCard>
      <NavCard><IconWrapper><MdCreditCard/></IconWrapper><NavText>Cards</NavText><NavSubtext>View statistics</NavSubtext></NavCard>
      <NavCard onClick={() => scrollTo('subscriptions')}><IconWrapper><MdNotifications/></IconWrapper><NavText>Subscriptions</NavText><NavSubtext>Control payments</NavSubtext></NavCard>
      <NavCard>
        <IconWrapper><MdEqualizer/></IconWrapper>
        <NavText>Reports</NavText>
        {/* THIS IS THE CORRECTED LINE */}
        <NavSubtext>Get useful insights</NavSubtext>
      </NavCard>
    </NavGrid>
  );
};

export default BottomNav;