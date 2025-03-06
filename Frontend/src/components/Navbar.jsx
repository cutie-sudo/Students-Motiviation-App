import { Outlet, Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext"; 
import SearchButton from "./SearchButton"; 

const Navbar = () => {
  const navigate = useNavigate();
  const { authToken, logout, current_user } = useContext(UserContext); 

  const [isLoggedIn, setIsLoggedIn] = useState(!!authToken);

  // ✅ Ensure Navbar updates when login/logout happens
  useEffect(() => {
    setIsLoggedIn(!!authToken);
  }, [authToken]);

  // ✅ Logout Function (Triggers Context Logout)
  const handleLogout = () => {
    logout(); 
    setIsLoggedIn(false); 
    navigate("/login"); 
  };

  return (
    <>
      <nav className="p-4 flex items-center justify-between bg-gradient-to-r from-blue-600 to-cyan-500 shadow-md">
        {/* Left Side: Project Name as a clickable Link to home */}
        <Link to="/" className="ml-6">
          <h1 className="text-white text-[64px] font-semibold font-['Oswald'] cursor-pointer">
            TechElevate
          </h1>
        </Link>

        {/* Right Side: Navigation Links */}
        <ul className="flex space-x-6 items-center mr-6">
          {isLoggedIn ? (
            <>

              {/* Conditionally render Admin/Student page button */}
              {current_user && current_user.role === "admin" && (
                <li className="border border-white rounded-[10px] p-2">
                  <Link
                    className="text-white text-[24px] font-light font-['Oswald'] hover:bg-blue-500 px-4 py-2 rounded transition duration-300"
                    to="/admin"
                  >
                    Admin Page
                  </Link>
                </li>
              )}
              {current_user && current_user.role === "student" && (
                <li className="border border-white rounded-[10px] p-2">
                  <Link
                    className="text-white text-[24px] font-light font-['Oswald'] hover:bg-blue-500 px-4 py-2 rounded transition duration-300"
                    to="/student"
                  >
                    Student Page
                  </Link>
                </li>
              )}
                   <li className="border border-white rounded-[10px] p-2">
            <Link
            className="text-white text-[24px] font-light font-['Oswald'] hover:bg-blue-500 px-4 py-2 rounded transition duration-300"
            to="/blog">Blog</Link> {/* New Blog Link */}
          </li>

              <li className="border border-white rounded-[10px] p-2">
                <button 
                  onClick={handleLogout}
                  className="bg-cyan-500 text-white text-[23px] font-light font-['Oswald'] px-4 py-2 hover:bg-blue-600 rounded transition duration-300"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="border border-white rounded-[10px] p-2">
                <Link
                  className="text-white text-[24px] font-light font-['Oswald'] hover:bg-blue-500 px-4 py-2 rounded transition duration-300"
                  to="/login"
                >
                  Login
                </Link>
              </li>
              <li className="border border-white rounded-[10px] p-2">
                <Link
                  className="text-white text-[24px] font-light font-['Oswald'] hover:bg-blue-500 px-4 py-2 rounded transition duration-300"
                  to="/signup"
                >
                  Sign Up
                </Link>
              </li>
           
              {/* Search Button Component */}
              <li className="nav-item relative flex items-center border border-gray-300 rounded-full bg-white px-4 py-2">
                <input
                  type="text"
                  placeholder="Search"
                  className="bg-transparent text-gray-700 placeholder-gray-500 outline-none px-2"
                />
                <button className="ml-2 p-2 rounded-full text-white transition">
                  🔍
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Navbar;
