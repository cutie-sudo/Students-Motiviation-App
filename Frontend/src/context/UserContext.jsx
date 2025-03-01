// src/context/UserContext.jsx
import { createContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const UserContext = createContext();

export default function UserProvider({ children }) {
    const navigate = useNavigate();
    
    // Load authToken from sessionStorage with error handling
    const [authToken, setAuthToken] = useState(() => {
        try {
            const storedToken = sessionStorage.getItem("token");
            return storedToken ? JSON.parse(storedToken) : null;
        } catch (error) {
            console.warn("Session storage not accessible or invalid JSON.", error);
            return null;
        }
    });

    // Load current user from sessionStorage with error handling
    const [current_user, setCurrentUser] = useState(() => {
        try {
            const storedUser = sessionStorage.getItem("user");
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (error) {
            console.warn("Session storage not accessible or invalid JSON.", error);
            return null;
        }
    });

    const [loading, setLoading] = useState(true);

    // Fetch the current user from the backend using the stored authToken
    const fetchCurrentUser = useCallback(() => {
        if (!authToken) {
            console.log("No authToken found, skipping user fetch.");
            return;
        }

        fetch("http://127.0.0.1:5000/user", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`,
            },
            credentials: "include",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch user data.");
                }
                return response.json();
            })
            .then((data) => {
                if (data.data) {
                    setCurrentUser(data.data);
                    sessionStorage.setItem("user", JSON.stringify(data.data));
                }
            })
            .catch((error) => {
                console.error("Error fetching user:", error);
                logout(); // Logout on failed fetch
            });
    }, [authToken]);

    // Add a new user during registration
    const addUser = async (firstName, lastName, email, password, role) => {
        try {
            const response = await fetch("http://127.0.0.1:5000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ firstName, lastName, email, password, role }),
            });

            if (response.ok) {
                toast.success("User registered successfully!");
                navigate("/login");
            } else {
                const errorData = await response.json();
                console.error("Registration failed:", errorData);
                toast.error(errorData.error || "Registration failed. Please try again.");
            }
        } catch (error) {
            console.error("Error registering user:", error);
            toast.error("Failed to connect to the server. Please check if the backend is running.");
        }
    };

    // Handle user login for both Admin and Student roles
    const login = async (email, password, role) => {
        try {
            const loginEndpoint = role.toLowerCase() === 'admin'
                ? "http://127.0.0.1:5000/admin/login"
                : "http://127.0.0.1:5000/student/login";
    
            const response = await fetch(loginEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ email, password }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                setAuthToken(data.access_token);
                setCurrentUser(data);
                sessionStorage.setItem("token", data.access_token);
                sessionStorage.setItem("user", JSON.stringify(data));
    
                toast.success("Login successful!");
    
                // Redirect based on role
                if (data.role === "admin") {
                    navigate("/admin");
                } else if (data.role === "student") {
                    navigate("/student");
                }
            } else {
                console.error("Login failed:", data);
                toast.error(data.error || "Invalid login credentials.");
            }
        } catch (error) {
            console.error("Error logging in:", error);
            toast.error("Failed to connect to the server. Please try again.");
        }
    };
    

    // Initiate Google Login
    const googleLogin = async () => {
        try {
            window.location.href = "http://127.0.0.1:5000/google_login";
        } catch (error) {
            console.error("Google Sign-Up Failed:", error);
            toast.error("Google Sign-Up is not yet fully implemented.");
        }
    };

    // Handle user logout
    const logout = () => {
        setAuthToken(null);
        setCurrentUser(null);
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        toast.success("Logged out successfully!");
        navigate("/login");
    };

    useEffect(() => {
        fetchCurrentUser();
        setLoading(false);
    }, [fetchCurrentUser]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <UserContext.Provider
            value={{ current_user, authToken, addUser, googleLogin, login, logout }}
        >
            {children}
        </UserContext.Provider>
    );
}
