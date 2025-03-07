import { createContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const UserContext = createContext();

export default function UserProvider({ children }) {
    const navigate = useNavigate();
    const API_BASE_URL ="https://backend-student-motivation-app-1.onrender.com";

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

        fetch("https://backend-student-motivation-app-1.onrender.com/profile", {
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
        toast.loading("Registering...");
    
        try {
            const response = await fetch("https://motiviationapp-backend.onrender.com/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", // Ensures cookies/session tokens are sent
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    password,
                    role: role || "student", // Providing default value like the backend
                }),
            });
            
            const data = await response.json();
    
            if (data.success) {
                toast.dismiss();
                toast.success(data.message || "User registered successfully!");
                navigate("/login");
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
    const login = async (email, password, role, navigate) => {
        try {
            if (!role) {
                toast.error("Role is required for login.");
                return;
            }
      
            const response = await fetch("https://backend-student-motivation-app-1.onrender.com/login", {
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
        <UserContext.Provider value={{ current_user, authToken, addUser, googleLogin, login, logout}}>
            {children}
        </UserContext.Provider>
    );
}
