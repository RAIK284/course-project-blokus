import React, { useState, useEffect, useContext } from "react";
import { auth } from "../../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider(props) {
  const [authUser, setAuthUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Subscribe to Firebase authentication state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setAuthUser(user);
      } else {
        setIsLoggedIn(false);
        setAuthUser(null);
      }
    });

    // Cleanup function
    return () => unsubscribe();
  }, []);

  const value = {
    authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}
