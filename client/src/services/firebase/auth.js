import { auth } from "./firebase"; // Import initialized Firebase
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

// Google Sign-In
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log("User Signed In:", result.user);
    return result.user;
  } catch (error) {
    console.error("Google Sign-In Error:", error);
  }
};

// Logout
export const logout = async () => {
  try {
    await signOut(auth);
    console.log("User Signed Out");
  } catch (error) {
    console.error("Logout Error:", error);
  }
};

// Track Authentication State
export const trackAuthState = (callback) => {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};
