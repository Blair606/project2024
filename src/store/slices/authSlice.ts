import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserRole = 'student' | 'admin' | 'instructor' | 'guardian';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isAdmin: boolean;
}

interface AuthState {
  user: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    isAdmin: boolean;
  } | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.token = null; // Assuming token is not set on login
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    toggleAdminAccess: (state) => {
      if (state.user) {
        state.user.isAdmin = !state.user.isAdmin;
      }
    }
  },
});

export const {
  setUser,
  logout,
  setError,
  setLoading,
  toggleAdminAccess,
} = authSlice.actions;

export default authSlice.reducer; 