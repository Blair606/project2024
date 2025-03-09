import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  id: string;
  email: string;
  role: 'student' | 'teacher' | 'parent' | 'admin';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
  checkUserRole: () => string | null;
  getUserId: () => string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for existing session and token
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (storedUser && token) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
      // Set default authorization header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    try {
      const response = await axios.post('http://localhost:3000/api/users/login', {
        email,
        password,
      });

      const { user: userData, token } = response.data;
      
      // Verify that userData has the required fields
      if (!userData._id) {
        throw new Error('User ID not provided in response');
      }

      // Store token and set default header
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Store complete user data including ID
      const userToStore: User = {
        id: userData._id,
        email: userData.email,
        role: userData.role,
      };
      
      setUser(userToStore);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userToStore));
      
      console.log('Logged in user ID:', userToStore.id); // For debugging
      return userToStore;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to sign in');
      }
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  };

  const checkUserRole = (): string | null => {
    return user?.role || null;
  };

  const getUserId = (): string | null => {
    return user?.id || null;
  };

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
    checkUserRole,
    getUserId
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};