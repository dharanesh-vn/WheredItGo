// client/src/pages/SignUpPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormContainer, Input, Button, Select, FormWrapper, SwitchText, ErrorMessage } from '../components/Forms/FormStyles';
import GradientTitle from '../components/Forms/GradientTitle';
import { register } from '../services/api'; // Use the specific register function

const SignUpPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('authToken')) { navigate('/dashboard'); }
  }, [navigate]);

  const [formData, setFormData] = useState({ fullName: '', dob: '', gender: '', industry: '', company: '', role: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { fullName, dob, gender, industry, company, role, email, password } = formData;

  const onChange = (e) => setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    setLoading(true);
    try {
      const { data } = await register(formData);
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/dashboard'); 
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer>
      <FormWrapper>
        <GradientTitle>Create Account</GradientTitle>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <form onSubmit={onSubmit}>
          <Input type="text" name="fullName" placeholder="Full Name" value={fullName} onChange={onChange} required />
          <Input type="date" name="dob" placeholder="Date of Birth" value={dob} onChange={onChange} required />
          <Select name="gender" value={gender} onChange={onChange} required>
            <option value="">Select Gender</option><option value="female">Female</option><option value="male">Male</option><option value="other">Other</option>
          </Select>
          <Input type="text" name="industry" placeholder="Your Industry (e.g., Tech)" value={industry} onChange={onChange} required />
          <Input type="text" name="company" placeholder="Company Name (optional)" value={company} onChange={onChange} />
          <Input type="text" name="role" placeholder="Your Role (e.g., Developer)" value={role} onChange={onChange} required />
          <Input type="email" name="email" placeholder="Email" value={email} onChange={onChange} required />
          <Input type="password" name="password" placeholder="Password" value={password} onChange={onChange} required />
          <Button type="submit" disabled={loading}>
            {loading ? 'Signing up...' : 'Sign Up'}
          </Button>
        </form>
        <SwitchText>
          Already have an account?
          <span onClick={() => navigate("/login")}>Login</span>
        </SwitchText>
      </FormWrapper>
    </FormContainer>
  );
};
export default SignUpPage;