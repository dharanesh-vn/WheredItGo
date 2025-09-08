// client/src/components/Dashboard/Transactions/TransactionList.js
import React from 'react';
import styled from 'styled-components';
import { FaArrowUp, FaArrowDown, FaTrash, FaReceipt } from 'react-icons/fa';
import EmptyState from '../../Layout/EmptyState';
import { SkeletonTitle, SkeletonTable, SkeletonRow } from '../../Layout/Skeleton';

const SectionWrapper = styled.div` margin-top: 2rem; `;
const SectionTitle = styled.h3` font-size: 1.5rem; color: #E0E0E0; margin-bottom: 1.5rem; padding-bottom: 0.5rem; border-bottom: 1px solid #333; `;
const Table = styled.table` width: 100%; border-collapse: collapse; color: #e0e0e0; `;
const Thead = styled.thead` th { text-align: left; padding: 0.75rem 1rem; font-weight: 600; color: #aaa; border-bottom: 2px solid #444; font-size: 0.9rem; text-transform: uppercase; }`;
const Tbody = styled.tbody` tr { border-bottom: 1px solid #2a2a2a; transition: background-color 0.2s ease; &:hover { background-color: #252525; } &:last-child { border-bottom: none; } } td { padding: 1rem; vertical-align: middle; }`;
const TypeIcon = styled.span` display: flex; align-items: center; justify-content: center; width: 30px; height: 30px; border-radius: 50%; color: white; margin-right: 1rem; background-color: ${p => p.type === 'Income' ? '#28a745' : '#dc3545'}; `;
const DescriptionCell = styled.div` display: flex; align-items: center; `;
const DescriptionText = styled.div` display: flex; flex-direction: column; .main { font-weight: 600; font-size: 1rem; } .sub { font-size: 0.8rem; color: #aaa; }`;
const AmountCell = styled.td` font-weight: 600; color: ${p => p.type === 'Income' ? '#28a745' : '#e0e0e0'}; `;
const DeleteButton = styled.button` background: none; border: none; color: #888; cursor: pointer; font-size: 1rem; display: flex; align-items: center; justify-content: center; padding: 0.5rem; border-radius: 50%; transition: all 0.2s ease; &:hover { background-color: #dc3545; color: white; }`;

const formatCurrency = (amount) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
const formatDate = (dateString) => new Date(dateString).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });

const TransactionList = ({ transactions, accounts, onDelete, loading }) => {
  const incomes = transactions.filter(t => t.type === 'Income');
  const expenses = transactions.filter(t => t.type === 'Expense');

  if (loading) return (<SectionWrapper><SkeletonTitle /><SkeletonTable><SkeletonRow /><SkeletonRow /><SkeletonRow /></SkeletonTable></SectionWrapper>);

  const renderTransactionRow = (transaction) => {
      const account = accounts.find(a => a._id === transaction.account);
      return (
        <tr key={transaction._id}>
          <td><DescriptionCell><TypeIcon type={transaction.type}>{transaction.type === 'Income' ? <FaArrowDown/> : <FaArrowUp/>}</TypeIcon><DescriptionText><span className='main'>{transaction.description || transaction.category}</span><span className='sub'>{account?.name || 'N/A'}</span></DescriptionText></DescriptionCell></td>
          <td>{transaction.category}</td>
          <AmountCell type={transaction.type}>{formatCurrency(transaction.amount)}</AmountCell>
          <td>{formatDate(transaction.date)}</td>
          <td><DeleteButton onClick={() => window.confirm('Are you sure?') && onDelete(transaction._id)}><FaTrash /></DeleteButton></td>
        </tr>
      );
  };
  return (
    <SectionWrapper>
        <SectionTitle>Incomes</SectionTitle>
        {incomes.length > 0 ? <Table><Thead><tr><th>Description</th><th>Category</th><th>Amount</th><th>Date</th><th></th></tr></Thead><Tbody>{incomes.map(renderTransactionRow)}</Tbody></Table> : <EmptyState icon={<FaReceipt />} title="No Income" message="Add an income transaction to see your earnings." />}
        <SectionTitle style={{ marginTop: '3rem' }}>Expenses</SectionTitle>
        {expenses.length > 0 ? <Table><Thead><tr><th>Description</th><th>Category</th><th>Amount</th><th>Date</th><th></th></tr></Thead><Tbody>{expenses.map(renderTransactionRow)}</Tbody></Table> : <EmptyState icon={<FaReceipt />} title="No Expenses" message="Add an expense to track your spending."/>}
    </SectionWrapper>
  );
};
export default TransactionList;
