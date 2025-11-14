import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Login } from '../components/auth/Login';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate('/dashboard');
  };

  return <Login onLoginSuccess={handleLoginSuccess} />;
};
