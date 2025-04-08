import React, { createContext, useContext, useEffect, useState } from 'react';

// Create a context for authentication
const AuthContext = createContext();

// Provider component to wrap your app
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState('mor_2314')
  const [password, setPassword] = useState('83r5^_')
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
        setIsAuthenticated(true);
    }
}, []);

  // Login function to authenticate the user
  const login = (authToken) => {
    setIsAuthenticated(true);
    setToken(authToken);
    localStorage.setItem('token', authToken);
    sessionStorage.setItem('username', username);
    // Optional: Store token in localStorage for persistence
  };

  // Logout function
  const logout = () => {
    setIsAuthenticated(false);
    setToken(null);
    localStorage.removeItem('token'); // Optional: Remove token from localStorage
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout , setUsername, username, password, setPassword}}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
