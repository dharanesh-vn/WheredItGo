// client/src/pages/LoginPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormContainer, Input, Button, FormWrapper, SwitchText, ErrorMessage } from '../components/Forms/FormStyles';
import GradientTitle from '../components/Forms/GradientTitle';
import { login } from '../services/api'; // Use the specific login function

const LoginPage = () => {
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await login({ email, password });
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/dashboard'); 
    } catch (err) {
      setError(err.response?.data?.message || 'Login Failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer>
      <FormWrapper>
        <GradientTitle>Login</GradientTitle>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <form onSubmit={onSubmit}>
          <Input type="email" name="email" placeholder="Email" value={email} onChange={onChange} required />
          <Input type="password" name="password" placeholder="Password" value={password} onChange={onChange} required />
          <Button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
        <SwitchText>
          Don’t have an account?
          <span onClick={() => navigate("/signup")}>Sign Up</span>
        </SwitchText>
      </FormWrapper>
    </FormContainer>
  );
};

export default LoginPage;