// client/src/components/Dashboard/Bills/SubscriptionList.js
import React from 'react';
import styled from 'styled-components';
import { FaRegCreditCard, FaTrash, FaExclamationCircle, FaCheckCircle, FaHourglassHalf } from 'react-icons/fa';
import EmptyState from '../../Layout/EmptyState';
import { SkeletonCard, SkeletonTitle } from '../../Layout/Skeleton';

const SectionWrapper = styled.div` margin-top: 3rem; `;
const SectionTitle = styled.h3` font-size: 1.5rem; color: #E0E0E0; margin-bottom: 1.5rem; padding-bottom: 0.5rem; border-bottom: 1px solid #333; `;
const Grid = styled.div` display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; `;
const Card = styled.div` background: #2a2a2a; border-radius: 12px; padding: 1.5rem; border-left: 5px solid ${p => p.statusColor || '#555'}; position: relative; `;
const Header = styled.div` display: flex; justify-content: space-between; align-items: flex-start; `;
const Name = styled.p` font-size: 1.2rem; font-weight: 600; color: #fff; margin: 0; `;
const Amount = styled.p` font-size: 1rem; color: #ccc; margin: 0; `;
const StatusText = styled.p` display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem; font-weight: 500; color: ${p => p.statusColor || '#888'}; margin: 1rem 0 0 0; `;
const DeleteButton = styled.button` position: absolute; top: 0.5rem; right: 0.5rem; background: none; border: none; color: #666; cursor: pointer; font-size: 0.9rem; padding: 0.25rem; transition: color 0.2s ease; &:hover { color: #dc3545; }`;
const formatCurrency = (amount) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
const getStatus = (dueDate) => {
    const today = new Date(); const nextDue = new Date(dueDate);
    today.setHours(0,0,0,0); nextDue.setHours(0,0,0,0);
    const diffDays = Math.ceil((nextDue - today) / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return { text: `${Math.abs(diffDays)} days past due`, color: '#dc3545', icon: <FaExclamationCircle/> };
    if (diffDays <= 7) return { text: `${diffDays} days left`, color: '#ffc107', icon: <FaHourglassHalf/> };
    return { text: `${diffDays} days left`, color: '#28a745', icon: <FaCheckCircle/> };
};

const SubscriptionList = ({ subscriptions, loading, onDelete }) => {
  if (loading) return (<SectionWrapper><SkeletonTitle /><Grid><SkeletonCard style={{height: '100px'}}/></Grid></SectionWrapper>);
  
  return (
    <SectionWrapper>
        <SectionTitle>Subscriptions & Bills</SectionTitle>
        {subscriptions.length > 0 ? (
            <Grid>
                {subscriptions.map(sub => {
                    const status = getStatus(sub.nextDueDate);
                    return (
                        <Card key={sub._id} statusColor={status.color}>
                            <DeleteButton onClick={() => window.confirm('Are you sure?') && onDelete(sub._id)}><FaTrash /></DeleteButton>
                            <Header><Name>{sub.name}</Name><Amount>{formatCurrency(sub.amount)} / {sub.billingCycle.slice(0, 2).toLowerCase()}</Amount></Header>
                            <StatusText statusColor={status.color}>{status.icon} {status.text}</StatusText>
                        </Card>
                    );
                })}
            </Grid>
        ) : <EmptyState icon={<FaRegCreditCard/>} title="No Subscriptions Yet" message="Add a recurring bill or subscription to track due dates."/>}
    </SectionWrapper>
  );
};
export default SubscriptionList;