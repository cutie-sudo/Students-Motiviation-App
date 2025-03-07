import { createContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const UserContext = createContext();

export default function UserProvider({ children }) {
    const navigate = useNavigate();
    const API_BASE_URL = process.env.REACT_APP_API_URL || "https://backend-student-motivation-app-1.onrender.com";

    const [authToken, setAuthToken] = useState(localStorage.getItem("token") || null);


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
    const fetchCurrentUser = useCallback(() => {
        if (!authToken) {
            console.log("No authToken found, skipping user fetch.");
            return;
        }

        fetch(`${API_BASE_URL}/profile`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
            },
            credentials: "include",
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.success && data.data) {
                setCurrentUser(data.data);
                localStorage.setItem("user", JSON.stringify(data.data));
            }
        })
        .catch((error) => {
            console.error("Error fetching user:", error);
        });
    }, [API_BASE_URL, authToken]);

    // Register user
    const addUser = async (firstName, lastName, email, password, role, navigate) => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ firstName, lastName, email, password, role }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("User registered successfully!");
                navigate("/login");
            } else {
                toast.error(data.error || "Registration failed. Try again.");
            }
        } catch (error) {
            console.error("Error registering user:", error);
            toast.error("Failed to connect to the server.");
        }
    };

    
    // User login
    const login = async (email, password, role, navigate) => {
        try {
            if (!role) {
                toast.error("Role is required for login.");
                return;
            }

            const loginEndpoint = `${API_BASE_URL}/${role.toLowerCase()}/login`;
            const response = await fetch(loginEndpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setAuthToken(data.access_token);
                setCurrentUser(data);
                localStorage.setItem("token", data.access_token);
                localStorage.setItem("user", JSON.stringify(data));

                toast.success("Login successful!");
                navigate(data.role === "admin" ? "/admin" : "/student");
            } else {
                toast.error(data.error || "Invalid login credentials.");
            }
        } catch (error) {
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
        }, 500); // Ensures state updates before navigation
    };

    useEffect(() => {
        fetchCurrentUser();
        setLoading(false);
    }, [fetchCurrentUser]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <UserContext.Provider value={{ current_user, authToken, addUser, googleLogin, login, logout, signupUser}}>
            {children}
        </UserContext.Provider>
    );
}
