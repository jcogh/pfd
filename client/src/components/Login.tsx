import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login as loginAction } from '../store/authSlice';
import { login as loginAPI } from '../services/api';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await loginAPI(email, password);
      const { token, user } = response.data;
      console.log('Login successful. Token:', token);
      dispatch(loginAction({ user, token }));
      navigate('/dashboard');
    } catch (error: any) {
      setError(error.response?.data?.message || 'An error occurred during login');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full space-y-8 p-8 bg-currentLine rounded-lg shadow-lg">
        <h2 className="text-3xl font-extrabold text-center text-purple">Log in to your account</h2>
        {error && <p className="text-red text-center">{error}</p>}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-selection placeholder-comment text-magenta rounded-t-md focus:outline-none focus:ring-cyan focus:border-cyan focus:z-10 sm:text-sm bg-background"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-selection placeholder-comment text-magenta rounded-b-md focus:outline-none focus:ring-cyan focus:border-cyan focus:z-10 sm:text-sm bg-background"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-background bg-purple hover:bg-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan transition-colors duration-200"
            >
              Sign in
            </button>
          </div>
          <div className="text-center">
            <p className="text-magenta">Don't have an account?</p>
            <Link
              to="/register"
              className="mt-2 inline-block px-4 py-2 border border-transparent text-sm font-medium rounded-md text-background bg-green hover:bg-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan transition-colors duration-200"
            >
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
