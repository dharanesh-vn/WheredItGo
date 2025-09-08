// client/src/components/Dashboard/Portfolio/PortfolioView.js
import React, { useMemo } from 'react';
import styled from 'styled-components';
import PortfolioChart from './PortfolioChart';
import EmptyState from '../../Layout/EmptyState';
import { SkeletonCard, SkeletonTitle } from '../../Layout/Skeleton';
import { FaChartPie } from 'react-icons/fa';

const SectionWrapper = styled.div` margin-top: 3rem; `;
const SectionTitle = styled.h3` font-size: 1.5rem; color: #E0E0E0; margin-bottom: 1.5rem; padding-bottom: 0.5rem; border-bottom: 1px solid #333; `;
const PortfolioGrid = styled.div` display: grid; grid-template-columns: 2fr 1fr; gap: 2rem; @media (max-width: 992px) { grid-template-columns: 1fr; }`;
const Table = styled.table` width: 100%; border-collapse: collapse; `;
const Th = styled.th` text-align: left; padding: 0.5rem; color: #aaa; font-size: 0.9rem; border-bottom: 1px solid #444; text-transform: uppercase; `;
const Td = styled.td` text-align: left; padding: 0.75rem 0.5rem; border-bottom: 1px solid #2a2a2a; `;
const formatCurrency = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

const PortfolioView = ({ holdings, loading, onDelete }) => {
  const portfolioData = useMemo(() => {
    const sectors = holdings.reduce((acc, holding) => {
      const value = holding.quantity * holding.purchasePrice;
      if (!acc[holding.sector]) { acc[holding.sector] = { value: 0 }; }
      acc[holding.sector].value += value;
      return acc;
    }, {});
    
    const totalValue = Object.values(sectors).reduce((sum, sector) => sum + sector.value, 0);
    const chartData = Object.entries(sectors).map(([name, data]) => ({ name, value: data.value })).sort((a,b) => b.value - a.value);
    const sectorList = Object.entries(sectors).map(([name, data]) => ({ name, value: data.value, percentage: totalValue > 0 ? (data.value / totalValue) * 100 : 0 })).sort((a,b) => b.value - a.value);

    return { totalValue, chartData, sectorList };
  }, [holdings]);

  if (loading) return ( <SectionWrapper><SkeletonTitle /><SkeletonCard /></SectionWrapper> );
  
  if (holdings.length === 0) return (
    <SectionWrapper>
      <SectionTitle>Investment Portfolio</SectionTitle>
      <EmptyState icon={<FaChartPie />} title="No Investments Tracked" message="Add your first holding to see your portfolio."/>
    </SectionWrapper>
  );

  return (
    <SectionWrapper>
      <SectionTitle>Investment Portfolio - {formatCurrency(portfolioData.totalValue)}</SectionTitle>
      <PortfolioGrid>
        <div>
          <h4>Sector Weighting</h4>
          <Table>
            <thead><tr><Th>Sector</Th><Th>% of Portfolio</Th><Th>Value</Th></tr></thead>
            <tbody>
              {portfolioData.sectorList.map(sector => (
                  <tr key={sector.name}>
                      <Td>{sector.name}</Td>
                      <Td>{sector.percentage.toFixed(2)}%</Td>
                      <Td>{formatCurrency(sector.value)}</Td>
                  </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div>
          <h4>Sector Distribution</h4>
          <PortfolioChart data={portfolioData.chartData} />
        </div>
      </PortfolioGrid>
    </SectionWrapper>
  );
};
export default PortfolioView;