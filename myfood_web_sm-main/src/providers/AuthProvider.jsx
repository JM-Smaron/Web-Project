/**
 * React Authentication Context
 * Provides Firebase authentication and Google sign-in functionality.
 * Rewritten for originality with added comments.
 */

import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { app } from "../../firebase/firebase.config"; // Firebase config import
import axios from "axios"; // For HTTP requests
import { toast } from "react-toastify"; // Toast notifications

// Create context for auth operations
export const AuthContext = createContext(null);

// Google authentication provider instance
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  // Firebase auth instance
  const auth = getAuth(app);

  // State to store current user info
  const [currentUser, setCurrentUser] = useState(null);
  // State to manage loading spinner during async operations
  const [isLoading, setIsLoading] = useState(true);
  // State to toggle dark mode theme
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  /**
   * Toggle dark mode state
   */
  const toggleDarkMode = () => {
    setDarkModeEnabled((prev) => !prev);
  };

  /**
   * Register a new user using email and password
   */
  const registerUser = async (email, password) => {
    setIsLoading(true);
    try {
      return await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      toast.error("Failed to create account");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Sign in with email and password
   */
  const loginUser = async (email, password) => {
    setIsLoading(true);
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      toast.error("Failed to sign in");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Sign in using Google popup
   */
  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      return await signInWithPopup(auth, googleProvider);
    } catch (err) {
      toast.error("Google sign-in failed");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Sign out the current user
   */
  const logoutUser = async () => {
    setIsLoading(true);
    try {
      return await signOut(auth);
    } catch (err) {
      toast.error("Error during logout");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Listen to Firebase auth state changes
   */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);

      // If user exists, request JWT token from backend
      if (user?.email) {
        const payload = { email: user.email };
        axios
          .post("https://assignment-11-flame.vercel.app/jwt", payload, {
            withCredentials: true,
          })
          .then(() => setIsLoading(false))
          .catch(() => setIsLoading(false));
      } else {
        // Logout on backend if no user is present
        axios
          .post(
            "https://assignment-11-flame.vercel.app/logout",
            {},
            { withCredentials: true }
          )
          .then(() => setIsLoading(false))
          .catch(() => setIsLoading(false));
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  // Object containing all auth-related functions and states
  const authContextValue = {
    registerUser,
    loginUser,
    loginWithGoogle,
    logoutUser,
    currentUser,
    isLoading,
    setCurrentUser,
    toggleDarkMode,
    darkModeEnabled,
    setDarkModeEnabled,
  };

  // Provide auth context to children components
  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
