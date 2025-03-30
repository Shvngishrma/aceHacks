import React, { useState, useEffect } from "react";
import { signInWithGoogle, logout, trackAuthState } from "../services/firebase/auth ";

const LoginButton = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    trackAuthState(setUser);
  }, []);

  return (
    <div>
      {user ? (
        <>
          <p>Welcome, {user.displayName}!</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      )}
    </div>
  );
};

export default LoginButton;
