import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@shared/schema';
import { apiRequest } from './queryClient';

interface AuthState {
  user: Omit<User, 'password'> | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      login: async (username, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await apiRequest('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
          });
          
          if (response.success) {
            set({
              user: response.user,
              token: response.token,
              isAuthenticated: true,
              isLoading: false,
            });
          } else {
            set({ error: response.message || 'Login failed', isLoading: false });
          }
        } catch (error: any) {
          set({ error: error.message || 'Login failed', isLoading: false });
        }
      },
      register: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await apiRequest('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: { 'Content-Type': 'application/json' },
          });
          
          if (response.success) {
            set({
              user: response.user,
              token: response.token,
              isAuthenticated: true,
              isLoading: false,
            });
          } else {
            set({ error: response.message || 'Registration failed', isLoading: false });
          }
        } catch (error: any) {
          set({ error: error.message || 'Registration failed', isLoading: false });
        }
      },
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },
      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);

interface CategoryState {
  categories: any[];
  isLoading: boolean;
  error: string | null;
  fetchCategories: () => Promise<void>;
}

export const useCategoryStore = create<CategoryState>()((set) => ({
  categories: [],
  isLoading: false,
  error: null,
  fetchCategories: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiRequest('/api/categories');
      
      if (response.success) {
        set({
          categories: response.categories,
          isLoading: false,
        });
      } else {
        set({ error: response.message || 'Failed to fetch categories', isLoading: false });
      }
    } catch (error: any) {
      set({ error: error.message || 'Failed to fetch categories', isLoading: false });
    }
  },
}));

interface ProjectState {
  projects: any[];
  isLoading: boolean;
  error: string | null;
  fetchProjects: (limit?: number, offset?: number) => Promise<void>;
  searchProjects: (
    query: string, 
    categoryId?: number, 
    minBudget?: number, 
    maxBudget?: number, 
    status?: string
  ) => Promise<void>;
}

export const useProjectStore = create<ProjectState>()((set) => ({
  projects: [],
  isLoading: false,
  error: null,
  fetchProjects: async (limit = 10, offset = 0) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiRequest(`/api/projects?limit=${limit}&offset=${offset}`);
      
      if (response.success) {
        set({
          projects: response.projects,
          isLoading: false,
        });
      } else {
        set({ error: response.message || 'Failed to fetch projects', isLoading: false });
      }
    } catch (error: any) {
      set({ error: error.message || 'Failed to fetch projects', isLoading: false });
    }
  },
  searchProjects: async (query, categoryId, minBudget, maxBudget, status) => {
    set({ isLoading: true, error: null });
    try {
      let url = `/api/projects/search?q=${encodeURIComponent(query)}`;
      
      if (categoryId) url += `&category=${categoryId}`;
      if (minBudget) url += `&minBudget=${minBudget}`;
      if (maxBudget) url += `&maxBudget=${maxBudget}`;
      if (status) url += `&status=${status}`;
      
      const response = await apiRequest(url);
      
      if (response.success) {
        set({
          projects: response.projects,
          isLoading: false,
        });
      } else {
        set({ error: response.message || 'Failed to search projects', isLoading: false });
      }
    } catch (error: any) {
      set({ error: error.message || 'Failed to search projects', isLoading: false });
    }
  },
}));

export const useNotificationStore = create<{
  unreadCount: number;
  fetchUnreadCount: () => Promise<void>;
}>((set) => ({
  unreadCount: 0,
  fetchUnreadCount: async () => {
    try {
      const token = useAuthStore.getState().token;
      if (!token) return;
      
      const response = await apiRequest('/api/messages/unread/count', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (response.success) {
        set({ unreadCount: response.count });
      }
    } catch (error) {
      console.error('Failed to fetch unread messages count:', error);
    }
  },
}));