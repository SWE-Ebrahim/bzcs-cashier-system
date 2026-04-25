import { create } from 'zustand';
import { authService } from '../services/auth.service';

interface User {
  id: string;
  username?: string;
  email?: string;
  full_name: string;
  roles: string[];
  is_active: boolean;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: { username: string; password: string }) => Promise<void>;
  loginOwner: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (credentials) => {
    set({ isLoading: true });
    try {
      const response = await authService.login(credentials);
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  loginOwner: async (credentials) => {
    set({ isLoading: true });
    try {
      const response = await authService.loginOwner(credentials);
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    try {
      await authService.logout();
    } finally {
      set({ user: null, isAuthenticated: false });
    }
  },

  checkAuth: async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      set({ isAuthenticated: false });
      return;
    }

    try {
      const response = await authService.getCurrentUser();
      set({
        user: response.data.user,
        isAuthenticated: true,
      });
    } catch {
      localStorage.removeItem('accessToken');
      set({ isAuthenticated: false });
    }
  },
}));