import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  id: string;
  email: string;
  role: 'student' | 'teacher' | 'parent' | 'admin';
}

interface StoredAuthData {
  user: User;
  token: string;
  expiresAt: number;
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
    // Check for existing session and validate expiration
    const storedAuth = localStorage.getItem('authData');
    if (storedAuth) {
      const authData: StoredAuthData = JSON.parse(storedAuth);
      const now = Date.now();
      
      if (now < authData.expiresAt) {
        // Session is still valid
        setUser(authData.user);
        setIsAuthenticated(true);
        axios.defaults.headers.common['Authorization'] = `Bearer ${authData.token}`;
      } else {
        // Session has expired, clean up
        logout();
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    try {
      const response = await axios.post('http://localhost:3000/api/users/login', {
        email,
        password,
      });

      const { user: userData, token } = response.data;
      
      if (!userData._id) {
        throw new Error('User ID not provided in response');
      }

      // Create user object
      const userToStore: User = {
        id: userData._id,
        email: userData.email,
        role: userData.role,
      };

      // Calculate expiration (24 hours from now)
      const expiresAt = Date.now() + (24 * 60 * 60 * 1000);

      // Store auth data with expiration
      const authData: StoredAuthData = {
        user: userToStore,
        token,
        expiresAt,
      };
      
      // Store in localStorage
      localStorage.setItem('authData', JSON.stringify(authData));
      
      // Set axios default header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Update state
      setUser(userToStore);
      setIsAuthenticated(true);
      
      console.log('Logged in user ID:', userToStore.id);
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
    localStorage.removeItem('authData');
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