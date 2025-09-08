// client/src/components/Dashboard/Accounts/AddAccountForm.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, Select, Button, ErrorMessage } from '../../Forms/FormStyles';
import GradientTitle from '../../Forms/GradientTitle';
import { addAccount } from '../../../services/api';

const Form = styled.form` display: flex; flex-direction: column; gap: 1rem; `;
const AddAccountForm = ({ onAccountAdded, onClose }) => {
  const [formData, setFormData] = useState({ name: '', type: '', balance: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { name, type, balance } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!name || !type || balance === '') { setError('Please fill out all fields.'); return; }
    setLoading(true);
    try {
      const { data } = await addAccount({ name, type, balance: parseFloat(balance) });
      onAccountAdded(data.data);
      onClose();
    } catch (err) { setError(err.response?.data?.error[0] || 'Failed to add account.');
    } finally { setLoading(false); }
  };
  return (
    <>
      <GradientTitle style={{ marginBottom: '1.5rem', fontSize: '2rem' }}>Add New Account</GradientTitle>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Form onSubmit={onSubmit}>
        <Input type="text" name="name" value={name} onChange={onChange} placeholder="e.g., Chase Personal Checking" required />
        <Select name="type" value={type} onChange={onChange} required>
          <option value="">-- Select Account Type --</option>
          <option value="Bank Account">Bank Account</option><option value="Credit Card">Credit Card</option><option value="Savings">Savings</option><option value="Payment Platform">Payment Platform</option><option value="Investment">Investment</option><option value="Crypto">Crypto</option><option value="Other">Other</option>
        </Select>
        <Input type="number" name="balance" value={balance} onChange={onChange} placeholder="Current Balance (e.g., 1500.50)" step="0.01" required/>
        <Button type="submit" disabled={loading}>{loading ? 'Adding...' : 'Add Account'}</Button>
      </Form>
    </>
  );
};
export default AddAccountForm;