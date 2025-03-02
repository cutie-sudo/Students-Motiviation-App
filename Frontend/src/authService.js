import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, provider } from "./firebaseConfig";

const BACKEND_URL = "http://127.0.0.1:5000"; // ✅ Backend URL

export const handleGoogleSignIn = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const idToken = await user.getIdToken();  // ✅ Get Firebase ID Token

    console.log("Google Sign-In Successful", user);
    console.log("ID Token:", idToken); // ✅ Debugging log to check token

    // ✅ Send Google Token to Flask backend
    const response = await fetch(`${BACKEND_URL}/auth/google_login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // ✅ Ensures CORS works with authentication
      body: JSON.stringify({ idToken }), // ✅ Send idToken correctly
    });

    const data = await response.json();
    if (data.success) {
      console.log("Login successful:", data);
      return data;
    } else {
      console.error("Login failed:", data.error);
    }
  } catch (error) {
    console.error("Error during Google Sign-In:", error);
  }
};
