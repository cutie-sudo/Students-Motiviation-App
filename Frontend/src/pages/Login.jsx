import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export default function Login() {
  const { login, resetPassword } = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // Default role is student
  const [errorMessage, setErrorMessage] = useState('');
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetMessage, setResetMessage] = useState('');

  // Handle form submission for login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password, role);
    } catch (error) {
      setErrorMessage('Invalid login credentials');
    }
  };

  // Handle password reset submission
  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(resetEmail);
      setResetMessage('Password reset link sent to your email.');
    } catch (error) {
      setResetMessage('Failed to send password reset link.');
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

        <div className="text-center mb-4">
          <button
            type="button"
            onClick={() => setShowReset(true)}
            className="text-blue-500 hover:underline font-medium"
          >
            Forgot password?
          </button>
        </div>

        <div className="text-center">
          <p className="text-gray-600">or</p>
          <Link to="/signup" className="text-blue-500 hover:underline font-medium">
            Create Account!
          </Link>
        </div>
      </form>

      {showReset && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <form onSubmit={handleResetPassword} className="bg-white p-8 rounded-lg shadow-lg w-[30%]">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Reset Password</h3>

            {resetMessage && <p className="text-green-500 mb-4">{resetMessage}</p>}

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-gray-600">Email</label>
              <input
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your email for password reset"
                required
              />
            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Send Reset Link
              </button>
              <button
                type="button"
                onClick={() => setShowReset(false)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
