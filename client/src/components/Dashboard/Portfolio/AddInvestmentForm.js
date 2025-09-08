// client/src/components/Dashboard/Portfolio/AddInvestmentForm.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, Button, ErrorMessage } from '../../Forms/FormStyles';
import GradientTitle from '../../Forms/GradientTitle';
import { addHolding } from '../../../services/api';

const Form = styled.form` display: flex; flex-direction: column; gap: 1rem; `;
const FieldRow = styled.div` display: flex; gap: 1rem; & > * { flex: 1; }`;

const AddInvestmentForm = ({ onHoldingAdded, onClose }) => {
  const [formData, setFormData] = useState({ name: '', symbol: '', quantity: '', purchasePrice: '', sector: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { name, symbol, quantity, purchasePrice, sector } = formData;
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      const payload = { ...formData, quantity: parseFloat(quantity), purchasePrice: parseFloat(purchasePrice) };
      if (isNaN(payload.quantity) || isNaN(payload.purchasePrice) || payload.quantity <= 0 || payload.purchasePrice < 0) {
          setError('Please enter valid positive numbers for quantity and price.'); setLoading(false); return;
      }
      const { data } = await addHolding(payload);
      onHoldingAdded(data.data); onClose();
    } catch(err) { setError(err.response?.data?.error?.[0] || 'Failed to add holding.');
    } finally { setLoading(false); }
  };
  return (
    <>
      <GradientTitle style={{fontSize: '2rem'}}>Add Investment Holding</GradientTitle>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Form onSubmit={onSubmit}>
        <FieldRow><Input name="name" value={name} onChange={onChange} placeholder="Name (e.g., Apple Inc.)" required/>
        <Input name="symbol" value={symbol.toUpperCase()} onChange={onChange} placeholder="Symbol (e.g., AAPL)" required /></FieldRow>
        <FieldRow><Input type="number" name="quantity" value={quantity} onChange={onChange} placeholder="Quantity of Shares" required/>
        <Input type="number" name="purchasePrice" value={purchasePrice} onChange={onChange} placeholder="Avg. Purchase Price" step="0.01" required /></FieldRow>
        <Input name="sector" value={sector} onChange={onChange} placeholder="Sector (e.g., Technology)" required />
        <Button type="submit" disabled={loading}>{loading ? 'Adding...' : 'Add Holding'}</Button>
      </Form>
    </>
  );
};
export default AddInvestmentForm;