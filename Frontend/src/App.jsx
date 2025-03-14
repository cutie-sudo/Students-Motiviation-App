// src/App.jsx
import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Admin from "./pages/Admin";
import Student from "./pages/Student";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserProvider, { UserContext } from "./context/UserContext";
import ErrorBoundary from "./components/ErrorBoundary";
import UserProfile from "./components/UserProfile";
import Blog from "./pages/Blog";
import Wishlist from "./pages/Wishlist";

function App() {
    return (
        <ErrorBoundary>
            <UserProvider>
                <div className="flex flex-col min-h-screen">
                    <Navbar />
                    <div className="flex-grow">
                        <ToastContainer />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/profile" element={<UserProfile />} />
                            <Route path="/blog" element={<Blog />} />
                            <Route path="/wishlist" element={<Wishlist />} />


                            <Route
                                path="/admin"
                                element={
                                    <ProtectedRoute>
                                        <Admin />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/student"
                                element={
                                    <ProtectedRoute>
                                        <Student />
                                    </ProtectedRoute>
                                }
                            />
                        </Routes>
                    </div>
                    <Footer />
                </div>
            </UserProvider>
        </ErrorBoundary>
    );
}

function ProtectedRoute({ children }) {
    const { current_user } = useContext(UserContext);
    if (!current_user) {
        return <Navigate to="/login" />;
    }
    return children;
}

export default App;
