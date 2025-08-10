// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState } from 'react';

export type UserType = 'candidate' | 'recruiter';

interface AuthContextType {
  login: (email: string, password: string, type: UserType) => Promise<boolean>;
  register: (
    email: string,
    password: string,
    name: string,
    type: UserType,
    company?: string
  ) => Promise<boolean>;
  currentUser: any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (email: string, password: string, type: UserType) => {
    const stored = localStorage.getItem('user');
    if (!stored) throw new Error('No user found. Please register first.');

    const user = JSON.parse(stored);

    if (
      user.email === email &&
      user.password === password &&
      user.userType === type
    ) {
      setCurrentUser(user);
      return true;
    }

    throw new Error('Invalid credentials');
  };

  const register = async (
    email: string,
    password: string,
    name: string,
    type: UserType,
    company?: string
  ) => {
    const newUser = { email, password, name, userType: type, company: company || '' };
    localStorage.setItem('user', JSON.stringify(newUser));
    setCurrentUser(newUser);
    return true;
  };

  return (
    <AuthContext.Provider value={{ login, register, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
