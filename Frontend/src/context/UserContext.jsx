import { createContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const UserContext = createContext();

export default function UserProvider({ children }) {
    const navigate = useNavigate();
    const API_BASE_URL = "http://localhost:5000";

    const [authToken, setAuthToken] = useState(() => {
        try {
            return localStorage.getItem("token") || null;
        } catch (error) {
            console.warn("Local storage not accessible.", error);
            return null;
        }
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

    // Fetch the current user from /profile (instead of /user)
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

    const addUser = async (firstName, lastName, email, password, role) => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ firstName, lastName, email, password, role }),
            });

            if (response.ok) {
                toast.success("User registered successfully!");
                navigate("/login");
            } else {
                const errorData = await response.json();
                toast.error(errorData.error || "Registration failed. Try again.");
            }
        } catch (error) {
            toast.error("Failed to connect to the server.");
        }
    };

    const login = async (email, password, role) => {
        try {
            const loginEndpoint = `${API_BASE_URL}/${role.toLowerCase()}/login`;
            const response = await fetch(loginEndpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Save token and user info to localStorage
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
            toast.error("Failed to connect to the server.");
        }
    };

    const googleLogin = async () => {
        try {
            window.location.href = `${API_BASE_URL}/auth/google_login`;
        } catch (error) {
            toast.error("Google Sign-In failed.");
        }
    };

    const logout = () => {
        setAuthToken(null);
        setCurrentUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
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
        <UserContext.Provider value={{ current_user, authToken, addUser, googleLogin, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}
