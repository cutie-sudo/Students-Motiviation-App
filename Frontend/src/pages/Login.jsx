// src/pages/Login.jsx
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export default function Login() {
  const { login } = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); 
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password, role.toLowerCase());
    } catch (error) {
      setErrorMessage('Invalid login credentials');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-100">
      <form onSubmit={handleSubmit} className="w-[40%] bg-white p-8 rounded-xl shadow-md">
        <h3 className="text-2xl mb-4 font-bold font-mono text-center">Welcome back to TechElevate!!</h3>
        <p className="text-gray-600 text-sm mb-6 text-center">
          We are happy to see you here again. Enter your email and password to proceed.
        </p>

        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-gray-600">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full h-11 px-5 py-2.5 bg-white text-base shadow-xs border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
            placeholder="Enter Email"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-gray-600">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full h-11 px-5 py-2.5 bg-white text-base shadow-xs border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
            placeholder="Password"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-gray-600">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="block w-full h-11 px-5 py-2.5 bg-white text-base shadow-xs border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
            required
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full h-12 bg-gradient-to-r from-blue-500 to-cyan-400 hover:bg-blue-600 transition-all duration-500 rounded-full shadow-xs text-white text-base font-semibold mb-6"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
