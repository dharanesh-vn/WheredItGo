// client/src/components/Dashboard/Loans/AddLoanForm.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, Select, Button, ErrorMessage } from '../../Forms/FormStyles';
import GradientTitle from '../../Forms/GradientTitle';
import { addLoan } from '../../../services/api';

const Form = styled.form` 
  display: flex; 
  flex-direction: column; 
  gap: 1rem; 
`;

const AddLoanForm = ({ onLoanAdded, onClose }) => {
  const [formData, setFormData] = useState({ 
    name: '', 
    totalAmount: '', 
    amountPaid: '0', 
    type: 'Debt' 
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { name, totalAmount, amountPaid, type } = formData;
  
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const onSubmit = async e => {
    e.preventDefault();
    setError('');
    if (!name || !totalAmount || parseFloat(totalAmount) <= 0) { 
      setError('Name and a positive Total Amount are required.'); 
      return; 
    }
    setLoading(true);
    try {
      const payload = { 
        ...formData, 
        totalAmount: parseFloat(totalAmount), 
        amountPaid: parseFloat(amountPaid || '0') 
      };
      const { data } = await addLoan(payload);
      onLoanAdded(data.data);
      onClose();
    } catch (err) { 
      setError(err.response?.data?.error?.[0] || 'Failed to add loan record.');
    } finally { 
      setLoading(false); 
    }
  };
  
  return (
    <>
      <GradientTitle style={{fontSize: '2rem'}}>Add Debt or Loan</GradientTitle>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Form onSubmit={onSubmit}>
        <Input 
          type="text" 
          name="name" 
          value={name} 
          onChange={onChange} 
          placeholder="Name (e.g., Car Loan)" 
          required 
        />
        <Input 
          type="number" 
          name="totalAmount" 
          value={totalAmount} 
          onChange={onChange} 
          placeholder="Total Amount" 
          step="0.01" 
          required
        />
        <Input 
          type="number" 
          name="amountPaid" 
          value={amountPaid} 
          onChange={onChange} 
          placeholder="Amount Already Paid (Optional)" 
          step="0.01" 
        />
        <Select name="type" value={type} onChange={onChange}>
          <option value="Debt">This is a Debt (I Owe)</option>
          <option value="Loan">This is a Receivable (Owed to Me)</option>
        </Select>
        <Button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Record'}
        </Button>
      </Form>
    </>
  );
};

export default AddLoanForm;