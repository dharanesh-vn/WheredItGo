// client/src/components/Dashboard/Accounts/AccountList.js
import React from 'react';
import styled from 'styled-components';
import { FaUniversity, FaPaypal, FaFolderOpen } from 'react-icons/fa';
import EmptyState from '../../Layout/EmptyState';
import { SkeletonCard, SkeletonTitle } from '../../Layout/Skeleton';

const SectionWrapper=styled.div` margin-bottom:2rem; `;
const SectionTitle=styled.h3` font-size:1.5rem; color:#E0E0E0; margin-bottom:1.5rem; padding-bottom:0.5rem; border-bottom:1px solid #333; `;
const AccountsGrid=styled.div` display:grid; grid-template-columns:repeat(auto-fill,minmax(250px,1fr)); gap:1.5rem; `;
const AccountCard=styled.div` background:#2a2a2a; border-radius:12px; padding:1.5rem; border:1px solid #3a3a3a; transition:all 0.3s ease; &:hover{transform:translateY(-5px); box-shadow:0 4px 20px rgba(0,0,0,0.3);} `;
const CardHeader=styled.div` display:flex; align-items:center; margin-bottom:1rem; svg{font-size:1.5rem; margin-right:0.75rem; color:#bb86fc;} `;
const AccountName=styled.p` font-size:1.1rem; font-weight:600; color:#fff; margin:0; `;
const AccountBalance=styled.p` font-size:1.8rem; font-weight:700; color:#fff; margin:0; text-align:right; `;

const AccountList = ({ accounts, loading }) => {
  const formatCurrency = (amount) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  const bankAccounts = accounts.filter(acc => acc.type === 'Bank Account' || acc.type === 'Savings');
  const paymentPlatforms = accounts.filter(acc => acc.type === 'Payment Platform' || acc.type === 'Crypto');

  if (loading) return ( <> <SkeletonTitle /> <AccountsGrid><SkeletonCard /><SkeletonCard /><SkeletonCard /></AccountsGrid> </> );

  return (
    <>
      <SectionWrapper>
        <SectionTitle>Bank Accounts & Savings</SectionTitle>
        {bankAccounts.length>0? <AccountsGrid>{bankAccounts.map(account=>(<AccountCard key={account._id}><CardHeader><FaUniversity /><AccountName>{account.name}</AccountName></CardHeader><AccountBalance>{formatCurrency(account.balance)}</AccountBalance></AccountCard>))}</AccountsGrid> : <EmptyState icon={<FaUniversity/>} title="No Bank Accounts" message="Add a bank or savings account to see it here."/>}
      </SectionWrapper>
      <SectionWrapper>
        <SectionTitle>Payment Platforms</SectionTitle>
        {paymentPlatforms.length > 0 ? <AccountsGrid>{paymentPlatforms.map(account=>(<AccountCard key={account._id}><CardHeader><FaPaypal/><AccountName>{account.name}</AccountName></CardHeader><AccountBalance>{formatCurrency(account.balance)}</AccountBalance></AccountCard>))}</AccountsGrid> : <EmptyState icon={<FaPaypal/>} title="No Payment Platforms" message="Add a platform like PayPal to see it here."/>}
      </SectionWrapper>
    </>
  );
};
export default AccountList;