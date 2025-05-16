import React, { createContext, useContext, useState, useEffect } from 'react';
import { loadFromStorage, saveToStorage } from '../utils/localStorageUtils';

const AuthContext = createContext();

const USER_KEY = 'user';

const dummyUsers = [
  { email: 'admin@entnt.com', password: 'admin123', role: 'Admin' },
  { email: 'inspector@entnt.com', password: 'inspect123', role: 'Inspector' },
  { email: 'engineer@entnt.com', password: 'engine123', role: 'Engineer' }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from storage on mount
  useEffect(() => {
    const storedUser = loadFromStorage(USER_KEY, null);
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = (email, password) => {
    const foundUser = dummyUsers.find(u => u.email === email && u.password === password);
    if (foundUser) {
      setUser(foundUser);
      saveToStorage(USER_KEY, foundUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(USER_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
