// client/src/components/Dashboard/Bills/AddSubscriptionForm.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, Select, Button, ErrorMessage } from '../../Forms/FormStyles';
import GradientTitle from '../../Forms/GradientTitle';
import { addSubscription } from '../../../services/api';

const Form = styled.form` display: flex; flex-direction: column; gap: 1rem; `;

const AddSubscriptionForm = ({ onSubscriptionAdded, onClose }) => {
  const [formData, setFormData] = useState({ name: '', amount: '', billingCycle: 'Monthly', nextDueDate: new Date().toISOString().slice(0, 10) });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { name, amount, billingCycle, nextDueDate } = formData;
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async e => {
    e.preventDefault();
    if (parseFloat(amount) < 0 || !name || !nextDueDate) { setError('Please fill in valid details.'); return; }
    setLoading(true);
    try {
      const { data } = await addSubscription({ ...formData, amount: parseFloat(amount) });
      onSubscriptionAdded(data.data);
      onClose();
    } catch (err) { setError(err.response?.data?.error[0] || 'Failed to add subscription.');
    } finally { setLoading(false); }
  };
  return (
    <>
      <GradientTitle style={{fontSize: '2rem'}}>Add Subscription</GradientTitle>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Form onSubmit={onSubmit}>
        <Input type="text" name="name" value={name} onChange={onChange} placeholder="Subscription Name (e.g., Netflix)" required />
        <Input type="number" name="amount" value={amount} onChange={onChange} placeholder="Fixed Amount" step="0.01" required />
        <Select name="billingCycle" value={billingCycle} onChange={onChange}><option value="Monthly">Monthly</option><option value="Annually">Annually</option><option value="Weekly">Weekly</option></Select>
        <label htmlFor="nextDueDate" style={{fontSize: '0.9rem', color: '#ccc'}}>Next Due Date</label>
        <Input type="date" name="nextDueDate" id="nextDueDate" value={nextDueDate} onChange={onChange} required />
        <Button type="submit" disabled={loading}>{loading ? 'Adding...' : 'Add Subscription'}</Button>
      </Form>
    </>
  );
};
export default AddSubscriptionForm;