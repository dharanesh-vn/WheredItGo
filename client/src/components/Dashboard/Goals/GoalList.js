// client/src/components/Dashboard/Goals/GoalList.js
import React from 'react';
import styled from 'styled-components';
import { FaFlagCheckered, FaTrash } from 'react-icons/fa';
import EmptyState from '../../Layout/EmptyState';
import { SkeletonCard, SkeletonTitle } from '../../Layout/Skeleton';

const SectionWrapper = styled.div` margin-top: 3rem; `;
const SectionTitle = styled.h3` font-size: 1.5rem; color: #E0E0E0; margin-bottom: 1.5rem; padding-bottom: 0.5rem; border-bottom: 1px solid #333; `;
const GoalsGrid = styled.div` display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; `;
const GoalCard = styled.div` background: #2a2a2a; border-radius: 12px; padding: 1.5rem; border: 1px solid #3a3a3a; position: relative; `;
const GoalName = styled.p` font-size: 1.2rem; font-weight: 600; color: #fff; margin: 0 0 1rem 0; `;
const Price = styled.p` font-size: 1rem; color: #ccc; margin: 0; `;
const ProgressBarContainer = styled.div` width: 100%; height: 12px; background-color: #444; border-radius: 10px; margin: 0.75rem 0; `;
const ProgressBar = styled.div` height: 100%; width: ${p => p.progress}%; background: linear-gradient(90deg, #7F00FF, #5E35B1); border-radius: 10px; transition: width 0.5s ease-in-out; `;
const ProgressText = styled.p` font-size: 0.9rem; color: #aaa; margin: 0; `;
const DeleteButton = styled.button` position: absolute; top: 1rem; right: 1rem; background: none; border: none; color: #666; cursor: pointer; font-size: 0.9rem; padding: 0.25rem; transition: color 0.2s ease; &:hover { color: #dc3545; } `;
const formatCurrency = (amount) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

const GoalList = ({ goals, loading, onDelete }) => {
  if (loading) return (<SectionWrapper><SkeletonTitle /><GoalsGrid><SkeletonCard style={{height:'140px'}}/><SkeletonCard style={{height:'140px'}}/></GoalsGrid></SectionWrapper>);
  
  return (
    <SectionWrapper>
        <SectionTitle>Wish List & Goals</SectionTitle>
        {goals.length > 0 ? (
            <GoalsGrid>
                {goals.map(goal => {
                    const progress = goal.targetAmount > 0 ? Math.min((goal.savedAmount / goal.targetAmount) * 100, 100) : 0;
                    return (
                        <GoalCard key={goal._id}>
                            <DeleteButton onClick={() => window.confirm('Are you sure?') && onDelete(goal._id)}><FaTrash /></DeleteButton>
                            <GoalName>{goal.name}</GoalName>
                            <Price>Price: {formatCurrency(goal.targetAmount)}</Price>
                            <ProgressBarContainer><ProgressBar progress={progress} /></ProgressBarContainer>
                            <ProgressText>{Math.round(progress)}% Progress</ProgressText>
                        </GoalCard>
                    )
                })}
            </GoalsGrid>
        ) : <EmptyState icon={<FaFlagCheckered />} title="No Goals Yet" message="Set a financial goal to start tracking your progress."/>}
    </SectionWrapper>
  );
};
export default GoalList;