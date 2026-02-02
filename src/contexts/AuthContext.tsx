import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole } from '@/types';
import { mockUser } from '@/data/mockData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (data: RegisterData) => Promise<void>;
  switchRole: (role: UserRole) => void; // For demo purposes
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  clubName?: string;
  department?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(mockUser); // Start logged in for demo

  const login = async (email: string, password: string) => {
    // Mock login - in real app, this would call an API
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUser(mockUser);
  };

  const logout = () => {
    setUser(null);
  };

  const register = async (data: RegisterData) => {
    // Mock registration
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUser({
      id: 'new-user',
      name: data.name,
      email: data.email,
      role: data.role,
      clubId: data.clubName ? 'new-club' : undefined,
      department: data.department,
    });
  };

  const switchRole = (role: UserRole) => {
    if (user) {
      setUser({ ...user, role });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        register,
        switchRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
