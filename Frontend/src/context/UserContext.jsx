import { createContext, useState, useEffect } from "react";
import { auth, registerWithEmail, signInWithGoogle } from "../firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";

// Create UserContext
export const UserContext = createContext();

export default function UserProvider({ children }) {
  // State for user authentication
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for authenticated user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const userData = {
          email: currentUser.email,
          role: "student", // Default role, can be extended with Firestore if needed
        };
        sessionStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
      } else {
        sessionStorage.removeItem("user");
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Login function with email and password
  const login = async (email, password, role) => {
    try {
      await registerWithEmail(email, password);
      const userData = { email, role };
      sessionStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      throw new Error("Invalid credentials");
    }
  };

  // Google Sign-In
  const googleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Google Sign-In Failed:", error);
    }
  };

  // Logout function
  const logout = async () => {
    await signOut(auth);
    sessionStorage.removeItem("user");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, googleLogin, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
}
