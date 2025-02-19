import { createContext, useState, useEffect } from "react";

// Create UserContext
export const UserContext = createContext();

export default function UserProvider({ children }) {
  // State for user authentication
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from sessionStorage on startup
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = (email, password, role) => {
    // Simulated authentication (Replace with API call when backend is ready)
    if (email === "admin@example.com" && password === "password") {
      const userData = { email, role: "admin" };
      sessionStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    } else if (email === "student@example.com" && password === "password") {
      const userData = { email, role: "student" };
      sessionStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    } else {
      throw new Error("Invalid credentials");
    }
  };

  // Logout function
  const logout = () => {
    sessionStorage.removeItem("user");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
}
