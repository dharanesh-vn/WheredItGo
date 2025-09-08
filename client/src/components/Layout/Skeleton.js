// client/src/components/Layout/Skeleton.js
import React from 'react';
import styled, { keyframes } from 'styled-components';

const shimmer = keyframes` 0% { background-position: -468px 0; } 100% { background-position: 468px 0; }`;
const SkeletonBase = styled.div`
  background: #2a2a2a;
  background-image: linear-gradient(to right, #2a2a2a 0%, #3a3a3a 20%, #2a2a2a 40%, #2a2a2a 100%);
  background-repeat: no-repeat; background-size: 800px 104px; display: inline-block;
  position: relative; animation: ${shimmer} 1.2s linear infinite;
`;
export const SkeletonCard = styled(SkeletonBase)` height: 120px; width: 100%; border-radius: 12px; `;
export const SkeletonTitle = styled(SkeletonBase)` height: 30px; width: 200px; border-radius: 6px; margin-bottom: 1.5rem; `;
export const SkeletonTable = styled.div` & > div { height: 50px; width: 100%; border-radius: 8px; margin-bottom: 10px; }`;
export const SkeletonRow = styled(SkeletonBase)``;