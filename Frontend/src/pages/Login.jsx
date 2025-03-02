import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { auth, provider } from '../firebaseConfig';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export default function Login() {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); 
  const [errorMessage, setErrorMessage] = useState('');

  // ✅ Handle normal login (email/password)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password, role.toLowerCase());

      // ✅ Redirect based on role
      if (role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/student", { replace: true });
      }
    } catch (error) {
      console.error("Login Error:", error);
      setErrorMessage('Invalid login credentials');
    }
  };

  // ✅ Handle Google Sign-In with backend validation and redirection
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const idToken = await user.getIdToken();

      console.log("Google Sign-In Successful:", user);
      console.log("ID Token:", idToken);

      const response = await fetch("http://127.0.0.1:5000/auth/google_login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ idToken }),
      });

      const data = await response.json();
      console.log("Backend Response:", data);

      if (data.success) {
        console.log("Login successful:", data);

        // ✅ Store token & user role in localStorage
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("userRole", data.data?.user?.role || "");

        // ✅ Redirect based on user role
        if (data.data?.user?.role === "admin") {
          navigate("/admin", { replace: true });
        } else if (data.data?.user?.role === "student") {
          navigate("/student", { replace: true });
        } else {
          setErrorMessage("Invalid role received from server.");
        }
      } else {
        setErrorMessage("Google sign-in failed. Please try again.");
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      setErrorMessage("Google sign-in error.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-100">
      <form onSubmit={handleSubmit} className="w-[40%] bg-white p-8 rounded-xl shadow-md">
        <h3 className="text-2xl mb-4 font-bold font-mono text-center">Welcome back to TechElevate!!</h3>
        <p className="text-gray-600 text-sm mb-6 text-center">
          We are happy to see you here again. Enter your email and password to proceed.
        </p>

        {errorMessage && <p className="text-red-500 mb-4 text-center">{errorMessage}</p>}

        {/* Email Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-gray-600">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full h-11 px-5 py-2.5 bg-white border border-gray-300 rounded-full"
            placeholder="Enter Email"
            required
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-gray-600">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full h-11 px-5 py-2.5 bg-white border border-gray-300 rounded-full"
            placeholder="Password"
            required
          />
        </div>

        {/* Role Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-gray-600">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="block w-full h-11 px-5 py-2.5 bg-white border border-gray-300 rounded-full"
            required
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Normal Login Button */}
        <button type="submit" className="w-full h-12 bg-blue-500 rounded-full text-white text-base font-semibold mb-6">
          Sign in
        </button>

        <p className="text-gray-500 text-center mb-2">Or sign in using</p>

        {/* Google Sign-In Button */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center py-2 bg-gray-100 rounded-lg shadow-md"
        >
          <img
            src="https://i.pinimg.com/474x/59/7f/11/597f11b631d7d94492f1adb95110cc44.jpg"
            alt="Google Logo"
            className="h-6"
          />
          Sign in using Google
        </button>

        {/* Sign Up Redirect */}
        <p className="text-sm text-center mt-4 text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-500 hover:text-blue-400">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
