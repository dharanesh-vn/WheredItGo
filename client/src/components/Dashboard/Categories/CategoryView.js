// client/src/components/Dashboard/Categories/CategoryView.js
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { FaTags } from 'react-icons/fa';
import { SkeletonCard, SkeletonTitle } from '../../Layout/Skeleton';

const SectionWrapper = styled.div` margin-top: 3rem; `;
const SectionTitle = styled.h3` font-size: 1.5rem; color: #E0E0E0; margin-bottom: 1.5rem; padding-bottom: 0.5rem; border-bottom: 1px solid #333; `;
const CategoryGrid = styled.div` display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; `;
const CategoryCard = styled.div` background: #2a2a2a; border-radius: 12px; padding: 1rem 1.5rem; border: 1px solid #3a3a3a; display: flex; align-items: center; justify-content: space-between; `;
const CategoryInfo = styled.div` display: flex; align-items: center; svg { font-size: 1rem; margin-right: 0.8rem; color: #888; } `;
const CategoryName = styled.p` font-size: 1rem; font-weight: 500; color: #fff; margin: 0; `;
const CategoryTotal = styled.p` font-size: 1.1rem; font-weight: 600; color: #fff; margin: 0; `;
const formatCurrency = (amount) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

const CategoryView = ({ transactions, loading }) => {
  const categoryTotals = useMemo(() => {
    const aggregate = (trans, type) => trans.filter(t => t.type === type).reduce((acc, curr) => { const cat = curr.category||'Uncategorized'; if (!acc[cat]) acc[cat]=0; acc[cat]+=curr.amount; return acc; }, {});
    const sortedIncome = Object.entries(aggregate(transactions, 'Income')).sort(([, a], [, b]) => b - a);
    const sortedExpenses = Object.entries(aggregate(transactions, 'Expense')).sort(([, a], [, b]) => b - a);
    return { sortedIncome, sortedExpenses };
  }, [transactions]);

  if (loading) return (<SectionWrapper><SkeletonTitle /><CategoryGrid><SkeletonCard style={{ height: '65px' }} /><SkeletonCard style={{ height: '65px' }} /><SkeletonCard style={{ height: '65px' }} /><SkeletonCard style={{ height: '65px' }} /></CategoryGrid></SectionWrapper>);

  return (
    <SectionWrapper>
        <SectionTitle>Income By Category</SectionTitle>
        <CategoryGrid>{categoryTotals.sortedIncome.map(([cat, total]) => (<CategoryCard key={`inc-${cat}`}><CategoryInfo><FaTags /><CategoryName>{cat}</CategoryName></CategoryInfo><CategoryTotal style={{ color: '#28a745'}}>{formatCurrency(total)}</CategoryTotal></CategoryCard>))}</CategoryGrid>
        {categoryTotals.sortedIncome.length === 0 && <p>No income data for category view.</p>}
        <SectionTitle style={{ marginTop: '3rem' }}>Expenses By Category</SectionTitle>
        <CategoryGrid>{categoryTotals.sortedExpenses.map(([cat, total]) => (<CategoryCard key={`exp-${cat}`}><CategoryInfo><FaTags /><CategoryName>{cat}</CategoryName></CategoryInfo><CategoryTotal>{formatCurrency(total)}</CategoryTotal></CategoryCard>))}</CategoryGrid>
        {categoryTotals.sortedExpenses.length === 0 && <p>No expense data for category view.</p>}
    </SectionWrapper>
  );
};
export default CategoryView;