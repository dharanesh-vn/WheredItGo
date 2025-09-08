// client/src/components/Dashboard/Loans/LoanList.js
import React from 'react';
import styled from 'styled-components';
import { FaCar, FaUniversity, FaTrash } from 'react-icons/fa';
import EmptyState from '../../Layout/EmptyState';
import { SkeletonCard, SkeletonTitle } from '../../Layout/Skeleton';

const SectionWrapper = styled.div` margin-top: 3rem; `;
const SectionTitle = styled.h3` font-size: 1.5rem; color: #E0E0E0; margin-bottom: 1.5rem; padding-bottom: 0.5rem; border-bottom: 1px solid #333; `;
const Grid = styled.div` display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; `;
const Card = styled.div` background: #2a2a2a; border-radius: 12px; padding: 1.5rem; border: 1px solid #3a3a3a; position: relative; `;
const Name = styled.p` font-size: 1.2rem; font-weight: 600; color: #fff; margin: 0 0 1rem 0; `;
const Price = styled.p` font-size: 1rem; color: #ccc; margin: 0.25rem 0; `;
const ProgressBarContainer = styled.div` width: 100%; height: 12px; background-color: #444; border-radius: 10px; margin: 0.75rem 0; `;
const ProgressBar = styled.div` height: 100%; width: ${p => p.progress}%; background: linear-gradient(90deg, ${p=>p.color1}, ${p=>p.color2}); border-radius: 10px; transition: width 0.5s ease-in-out; `;
const ProgressText = styled.p` font-size: 0.9rem; color: #aaa; margin: 0; `;
const DeleteButton = styled.button` position: absolute; top: 1rem; right: 1rem; background: none; border: none; color: #666; cursor: pointer; font-size: 0.9rem; padding: 0.25rem; transition: color 0.2s ease; &:hover { color: #dc3545; } `;
const formatCurrency = (amount) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

const LoanList = ({ loans, loading, onDelete }) => {
  if (loading) return (<SectionWrapper><SkeletonTitle /><Grid><SkeletonCard style={{ height: '140px' }} /><SkeletonCard style={{ height: '140px' }} /></Grid></SectionWrapper>);
  
  const debts = loans.filter(l => l.type === 'Debt');
  const receivables = loans.filter(l => l.type === 'Loan');

  const renderLoanCard = (loan, isReceivable = false) => {
    const progress = loan.totalAmount > 0 ? (loan.amountPaid / loan.totalAmount) * 100 : 0;
    const remaining = loan.totalAmount - loan.amountPaid;
    return (
      <Card key={loan._id}>
        <DeleteButton onClick={() => window.confirm('Are you sure?') && onDelete(loan._id)}><FaTrash /></DeleteButton>
        <Name>{loan.name}</Name>
        <Price>Total: {formatCurrency(loan.totalAmount)}</Price>
        <Price>Remaining: {formatCurrency(remaining)}</Price>
        <ProgressBarContainer><ProgressBar progress={progress} color1={isReceivable ? '#28a745' : '#7F00FF'} color2={isReceivable ? '#20c997' : '#5E35B1'} /></ProgressBarContainer>
        <ProgressText>{Math.round(progress)}% {isReceivable ? 'Received' : 'Paid Off'}</ProgressText>
      </Card>
    );
  };
  return (
    <SectionWrapper>
        <SectionTitle>Debts (Money You Owe)</SectionTitle>
        {debts.length>0?<Grid>{debts.map(l=>renderLoanCard(l,false))}</Grid>:<EmptyState icon={<FaCar/>} title="No Debts" message="Track student loans, car payments, etc."/>}
        <SectionTitle style={{ marginTop: '3rem' }}>Receivables (Money Owed to You)</SectionTitle>
        {receivables.length>0?<Grid>{receivables.map(l=>renderLoanCard(l,true))}</Grid>:<EmptyState icon={<FaUniversity/>} title="No Receivables" message="Track money you have lent to others."/>}
    </SectionWrapper>
  );
};
export default LoanList;