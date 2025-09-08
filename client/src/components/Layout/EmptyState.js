// client/src/components/Layout/EmptyState.js
import React from 'react';
import styled from 'styled-components';

const EmptyStateWrapper = styled.div`
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  padding: 3rem 1rem; text-align: center; border: 2px dashed #3a3a3a;
  border-radius: 15px; margin-top: 1rem; color: #888;
`;
const IconWrapper = styled.div` font-size: 3rem; margin-bottom: 1rem; color: #555; `;
const Title = styled.h4` font-size: 1.2rem; color: #ccc; margin: 0 0 0.5rem 0; `;
const Message = styled.p` margin: 0; `;

const EmptyState = ({ icon, title, message }) => (
  <EmptyStateWrapper>
    <IconWrapper>{icon}</IconWrapper>
    <Title>{title}</Title>
    <Message>{message}</Message>
  </EmptyStateWrapper>
);
export default EmptyState;