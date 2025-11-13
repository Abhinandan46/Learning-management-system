import React, { createContext, useContext, useState, useEffect } from 'react';

/* eslint-disable react-refresh/only-export-components */

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initial data structure (simulating .data.json)
  const initialData = {
    users: [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
        role: "student",
        registeredAt: "2025-11-13T10:00:00.000Z",
        lastLogin: null
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        password: "password456",
        role: "student",
        registeredAt: "2025-11-13T11:00:00.000Z",
        lastLogin: null
      },
      {
        id: 3,
        name: "Admin User",
        email: "admin@example.com",
        password: "admin123",
        role: "admin",
        registeredAt: "2025-11-13T09:00:00.000Z",
        lastLogin: null
      }
    ],
    sessions: []
  };
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(initialData);

  // Load data from localStorage (simulating reading from .data.json)
  useEffect(() => {
    try {
      const savedData = localStorage.getItem('userData');
      if (savedData) {
        setUserData(JSON.parse(savedData));
      }

      // Check if user is logged in
      const savedAuth = localStorage.getItem('isAuthenticated');
      const savedUser = localStorage.getItem('currentUser');

      console.log('Auth check:', { savedAuth, savedUser });

      if (savedAuth === 'true' && savedUser) {
        setIsAuthenticated(true);
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
      // Clear corrupted data
      localStorage.removeItem('userData');
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('currentUser');
    }
    setLoading(false);
  }, []);

  // Save data to localStorage (simulating writing to .data.json)
  const saveUserData = (data) => {
    setUserData(data);
    localStorage.setItem('userData', JSON.stringify(data));
  };

  const login = (email, password) => {
    const user = userData.users.find(u => u.email === email && u.password === password);

    if (user) {
      const updatedUser = { ...user, lastLogin: new Date().toISOString() };
      const updatedUsers = userData.users.map(u => u.id === user.id ? updatedUser : u);
      const updatedData = { ...userData, users: updatedUsers };

      saveUserData(updatedData);

      // Create session
      const session = {
        id: Date.now(),
        userId: user.id,
        loginTime: new Date().toISOString(),
        active: true
      };
      const updatedSessions = [...userData.sessions.filter(s => s.userId !== user.id), session];
      const finalData = { ...updatedData, sessions: updatedSessions };
      saveUserData(finalData);

      setIsAuthenticated(true);
      setUser(updatedUser);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));

      return { success: true, user: updatedUser };
    }

    return { success: false, error: 'Invalid email or password' };
  };

  const register = (userData) => {
    // Check if email already exists
    const existingUser = userData.users.find(u => u.email === userData.email);
    if (existingUser) {
      return { success: false, error: 'Email already registered' };
    }

    const newUser = {
      id: Date.now(),
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: 'student',
      registeredAt: new Date().toISOString(),
      lastLogin: null
    };

    const updatedUsers = [...userData.users, newUser];
    const updatedData = { ...userData, users: updatedUsers };

    saveUserData(updatedData);

    // Auto-login after registration
    setIsAuthenticated(true);
    setUser(newUser);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('currentUser', JSON.stringify(newUser));

    return { success: true, user: newUser };
  };

  const logout = () => {
    // Update session
    if (user) {
      const updatedSessions = userData.sessions.map(s =>
        s.userId === user.id ? { ...s, active: false, logoutTime: new Date().toISOString() } : s
      );
      const updatedData = { ...userData, sessions: updatedSessions };
      saveUserData(updatedData);
    }

    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('currentUser');
  };

  const getAllUsers = () => {
    return userData.users;
  };

  const getUserSessions = (userId) => {
    return userData.sessions.filter(s => s.userId === userId);
  };

  const value = {
    isAuthenticated,
    user,
    login,
    register,
    logout,
    loading,
    getAllUsers,
    getUserSessions,
    userData
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};