// client/src/components/Dashboard/Transactions/AddTransactionForm.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, Select, Button, ErrorMessage } from '../../Forms/FormStyles';
import GradientTitle from '../../Forms/GradientTitle';
import { addTransaction } from '../../../services/api';

const Form = styled.form` display: flex; flex-direction: column; gap: 1rem; `;
const FieldRow = styled.div` display: flex; gap: 1rem; & > * { flex: 1; }`;

const AddTransactionForm = ({ accounts, onTransactionAdded, onClose }) => {
  const [formData, setFormData] = useState({ description: '', amount: '', category: '', type: 'Expense', date: new Date().toISOString().slice(0, 10), account: accounts[0]?._id || '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { description, amount, category, type, date, account } = formData;
  
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!account) { setError('You must add an account before adding a transaction.'); return; }
    if (!amount || !category || !type || !date) { setError('Please fill out all required fields.'); return; }
    setLoading(true);
    try {
      const { data } = await addTransaction({ ...formData, amount: parseFloat(amount) });
      onTransactionAdded(data.data);
      onClose();
    } catch (err) { setError(err.response?.data?.error[0] || 'Failed to add transaction.');
    } finally { setLoading(false); }
  };
  return (
    <>
      <GradientTitle style={{ marginBottom: '1.5rem', fontSize: '2rem' }}>Add Transaction</GradientTitle>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Form onSubmit={onSubmit}>
        <Input type="text" name="description" value={description} onChange={onChange} placeholder="e.g., Dinner with friends" required/>
        <FieldRow><Input type="number" name="amount" value={amount} onChange={onChange} placeholder="Amount" step="0.01" required/><Input type="text" name="category" value={category} onChange={onChange} placeholder="e.g., Food" required/></FieldRow>
        <FieldRow>
            <Select name="type" value={type} onChange={onChange}><option value="Expense">Expense</option><option value="Income">Income</option></Select>
            <Select name="account" value={account} onChange={onChange}>{accounts.map(acc => (<option key={acc._id} value={acc._id}>{acc.name}</option>))}</Select>
        </FieldRow>
        <Input type="date" name="date" value={date} onChange={onChange} required />
        <Button type="submit" disabled={loading}>{loading ? 'Adding...' : 'Add Transaction'}</Button>
      </Form>
    </>
  );
};
export default AddTransactionForm;