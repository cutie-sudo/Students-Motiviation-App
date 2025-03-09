import { createContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const UserContext = createContext();

export default function UserProvider({ children }) {
    const navigate = useNavigate();
    const API_BASE_URL = "https://backend-student-motivation-app-4.onrender.com";

    // Function to check if token is expired
    const isTokenExpired = (token) => {
        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            const expiration = payload.exp * 1000; // JWT expiration time is in milliseconds
            return expiration < Date.now();
        } catch (error) {
            console.error("Error decoding token:", error);
            return true; // Treat as expired if there's an error
        }
    };

    const [authToken, setAuthToken] = useState(() => {
        const token = localStorage.getItem("token");
        if (token && isTokenExpired(token)) {
            localStorage.removeItem("token");
            return null;
        }
        return token || null;
    });

    const [current_user, setCurrentUser] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("user")) || null;
        } catch (error) {
            console.warn("Invalid JSON in local storage.", error);
            return null;
        }
    });

    const [loading, setLoading] = useState(true);

    // Fetch current user from /profile
    const fetchCurrentUser = useCallback(async () => {
        if (!authToken) {
            console.log("No authToken found, skipping user fetch.");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/profile`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
                credentials: "include",
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setCurrentUser(data.data);
                localStorage.setItem("user", JSON.stringify(data.data));
            } else {
                console.error("Failed to fetch user:", data.error);
            }
        } catch (error) {
            console.error("Error fetching user:", error);
        } finally {
            setLoading(false);
        }
    }, [authToken]);

    const addUser = async (firstName, lastName, email, password, role = "student") => {
        toast.loading("Registering...");

        try {
            const response = await fetch(`${API_BASE_URL}/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ firstName, lastName, email, password, role }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                toast.dismiss();
                toast.success(data.message || "User registered successfully!");

                // Store token and user data
                setAuthToken(data.access_token);
                setCurrentUser(data.data);
                localStorage.setItem("token", data.access_token);
                localStorage.setItem("user", JSON.stringify(data.data));

                // Navigate to the appropriate dashboard
                navigate(data.data.role === "admin" ? "/admin" : "/student");
            } else {
                toast.dismiss();
                toast.error(data.error || "Failed to register user.");
            }
        } catch (error) {
            toast.dismiss();
            console.error("Error:", error);
            toast.error("Failed to connect to the server.");
        }
    };

    // User login
    const login = async (email, password, role) => {
        if (!role) {
            toast.error("Role is required for login.");
            return;
        }
    
        toast.loading("Logging in...");
    
        try {
            console.log("Sending login request to:", `${API_BASE_URL}/login`);
    
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", // Ensures cookies/tokens are sent
                body: JSON.stringify({ email, password, role }), // Added role
            });
    
            console.log("Response received:", response);
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Login failed.");
            }
    
            const data = await response.json();
            console.log("Login success:", data);
    
            localStorage.setItem("token", data.access_token);
            localStorage.setItem("user", JSON.stringify(data.user));
    
            toast.dismiss();
            toast.success("Login successful!");
    
            navigate(data.user.role === "admin" ? "/admin" : "/student");
        } catch (error) {
            toast.dismiss();
            console.error("Login error:", error);
            toast.error("Failed to connect to the server.");
        }
    };

    // Google login
    const googleLogin = async () => {
        try {
            window.location.href = `${API_BASE_URL}/auth/google_login`;
        } catch (error) {
            toast.error("Google Sign-In failed.");
        }
    };

    // Logout
    const logout = () => {
        setAuthToken(null);
        setCurrentUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        toast.success("Logged out successfully!");

        setTimeout(() => {
            navigate("/login");
        }, 500);
    };

    useEffect(() => {
        fetchCurrentUser();
    }, [fetchCurrentUser]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <UserContext.Provider value={{ current_user, authToken, addUser, googleLogin, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}
