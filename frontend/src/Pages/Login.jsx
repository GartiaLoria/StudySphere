import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import userLogin from '../Hook/userLogin';

const Login = () => {
  const userData = useRef({
    email: '',
    password: '',
  });

  const { loading, login } = userLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    userData.current = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    await login(userData.current);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-800 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-6">
        <h1 className="text-4xl font-extrabold text-center text-indigo-600">Welcome Back</h1>
        <p className="text-center text-gray-600">Login to continue to <span className="text-blue-500 font-medium">Study-Here</span></p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-700 font-medium">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
              className="h-12 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-indigo-400 p-3 outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-gray-700 font-medium">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              required
              className="h-12 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-indigo-400 p-3 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            {loading ? <span className="loading loading-spinner"></span> : 'Login'}
          </button>
        </form>

        <p className="text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-600 hover:underline font-medium">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
