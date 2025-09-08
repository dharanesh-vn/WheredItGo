// client/src/components/Dashboard/FinancialSummary/FinancialSummary.js
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { FaWallet, FaArrowUp, FaArrowDown, FaReceipt } from 'react-icons/fa';

// --- Styled Components ---
const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;
const StatCard = styled.div`
  background: #2a2a2a;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #3a3a3a;
`;
const CardHeader = styled.div`
  display: flex;
  align-items: center;
  color: #aaa;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  svg {
    margin-right: 0.75rem;
  }
`;
const CardValue = styled.p`
  font-size: 2rem;
  font-weight: 600;
  color: #f0f0f0;
  margin: 0;
`;
const formatCurrency = (amount) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

// --- Main Component ---
const FinancialSummary = ({ accounts, transactions }) => {
  const summaryData = useMemo(() => {
    const totalBalance = accounts.reduce((acc, account) => acc + account.balance, 0);
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    let monthlyIncome = 0;
    let monthlyExpenses = 0;
    transactions.forEach(t => {
      const transactionDate = new Date(t.date);
      if (transactionDate >= startOfMonth && transactionDate <= endOfMonth) {
        if (t.type === 'Income') { monthlyIncome += t.amount; }
        else { monthlyExpenses += t.amount; }
      }
    });
    return { totalBalance, monthlyIncome, monthlyExpenses };
  }, [accounts, transactions]);

  return (
    <SummaryGrid>
      <StatCard>
        <CardHeader><FaWallet />Total Balance</CardHeader>
        <CardValue>{formatCurrency(summaryData.totalBalance)}</CardValue>
      </StatCard>
      <StatCard>
        <CardHeader style={{ color: '#28a745' }}><FaArrowDown />Income This Month</CardHeader>
        <CardValue style={{ color: '#28a745' }}>{formatCurrency(summaryData.monthlyIncome)}</CardValue>
      </StatCard>
      <StatCard>
        <CardHeader style={{ color: '#dc3545' }}><FaArrowUp />Expenses This Month</CardHeader>
        <CardValue>{formatCurrency(summaryData.monthlyExpenses)}</CardValue>
      </StatCard>
      <StatCard>
        <CardHeader><FaReceipt />Monthly Transactions</CardHeader>
        <CardValue>{transactions.filter(t => new Date(t.date).getMonth() === new Date().getMonth()).length}</CardValue>
      </StatCard>
    </SummaryGrid>
  );
};
export default FinancialSummary;