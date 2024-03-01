import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const AuthContext = createContext();

// Export a hook that provides access to the context
export const useAuth = () => useContext(AuthContext);

// Provider component that wraps your app and makes an auth object available to any child component that calls useAuth().
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Initialize user from sessionStorage on app start
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Login updates the user state and stores the user's data in sessionStorage
  const login = (userData) => {
    setUser(userData);
    sessionStorage.setItem('user', JSON.stringify(userData));
  };

  // Logout clears the user state and removes the user's data from sessionStorage
  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('user');
  };

  // The value passed to the provider includes the user state, login, and logout functions
  const value = {
    user,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
