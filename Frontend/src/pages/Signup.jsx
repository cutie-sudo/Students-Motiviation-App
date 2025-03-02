import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { FcGoogle } from 'react-icons/fc';
import { handleGoogleSignIn } from '../authService';  // ✅ Import the correct function

export default function Register() {
  const { addUser } = useContext(UserContext);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('student'); // Default role is student
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // State for displaying messages

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addUser(firstName, lastName, email, password, role);
      setMessage('User registered successfully!');
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  // Handle Google Sign-Up
  const handleGoogleSignUp = async () => {
    try {
      await handleGoogleSignIn();  // ✅ Corrected function call
      setMessage('Signed up successfully with Google!');
    } catch (error) {
      console.error('Google Sign-Up Failed:', error);
      setMessage('Google sign-up failed. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-100">
      <form className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full" onSubmit={handleSubmit}>
        <p className="text-gray-800 text-3xl font-semibold mb-4 text-center">Sign Up</p>
        <p className="text-gray-600 text-sm mb-6 text-center">
          Hi! Welcome to TechElevate. Your home of Tech excellence.
        </p>
        {message && <p className="text-red-500 text-center mb-4">{message}</p>}

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">First Name</label>
            <input
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Last Name</label>
            <input
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Role</label>
          <select
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-2 mt-4 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-lg font-semibold focus:outline-none"
        >
          Sign Up
        </button>

        <p className="text-sm text-center mt-4 text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:text-blue-400">
            Sign In
          </Link>
        </p>

        <div className="flex flex-col items-center mt-6">
          <p className="text-gray-500 mb-2">Or sign up with</p>
          <button
            onClick={handleGoogleSignUp}  
            className="w-full flex items-center justify-center gap-2 py-2 mt-2 bg-gray-100 text-black rounded-lg shadow-md hover:shadow-lg transition duration-300"
          >
            <FcGoogle className="text-2xl" />
            Sign Up with Google
          </button>
        </div>

      </form>
    </div>
  );
}
