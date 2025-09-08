// client/src/components/Dashboard/Goals/AddGoalForm.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, Button, ErrorMessage } from '../../Forms/FormStyles';
import GradientTitle from '../../Forms/GradientTitle';
import { addGoal } from '../../../services/api';

const Form = styled.form` display: flex; flex-direction: column; gap: 1rem; `;

const AddGoalForm = ({ onGoalAdded, onClose }) => {
  const [formData, setFormData] = useState({ name: '', targetAmount: '', savedAmount: '0' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { name, targetAmount, savedAmount } = formData;
  
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async e => {
    e.preventDefault();
    if (parseFloat(targetAmount) <= 0 || !name) { setError('Please enter a valid name and a target amount greater than 0.'); return; }
    setLoading(true);
    try {
      const { data } = await addGoal({ ...formData, targetAmount: parseFloat(targetAmount), savedAmount: parseFloat(savedAmount || '0') });
      onGoalAdded(data.data);
      onClose();
    } catch (err) { setError(err.response?.data?.error[0] || 'Failed to add goal.');
    } finally { setLoading(false); }
  };
  return (
    <>
      <GradientTitle style={{fontSize: '2rem'}}>Add New Goal</GradientTitle>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Form onSubmit={onSubmit}>
        <Input type="text" name="name" value={name} onChange={onChange} placeholder="Goal Name (e.g., New Laptop)" required/>
        <Input type="number" name="targetAmount" value={targetAmount} onChange={onChange} placeholder="Target Amount (Price)" step="0.01" required/>
        <Input type="number" name="savedAmount" value={savedAmount} onChange={onChange} placeholder="Amount Already Saved (Optional)" step="0.01"/>
        <Button type="submit" disabled={loading}>{loading ? 'Adding...' : 'Set Goal'}</Button>
      </Form>
    </>
  );
};
export default AddGoalForm;