import api from './api';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface OwnerLoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email?: string;
  password: string;
  full_name: string;
  phone?: string;
  role_name?: string;
}

export const authService = {
  login: async (credentials: LoginCredentials) => {
    const { data } = await api.post('/auth/login', credentials);
    if (data.data.tokens?.accessToken) {
      localStorage.setItem('accessToken', data.data.tokens.accessToken);
    }
    return data;
  },

  loginOwner: async (credentials: OwnerLoginCredentials) => {
    const { data } = await api.post('/auth/login/owner', credentials);
    if (data.data.tokens?.accessToken) {
      localStorage.setItem('accessToken', data.data.tokens.accessToken);
    }
    return data;
  },

  register: async (credentials: RegisterCredentials) => {
    const { data } = await api.post('/auth/register', credentials);
    if (data.data.tokens?.accessToken) {
      localStorage.setItem('accessToken', data.data.tokens.accessToken);
    }
    return data;
  },

  logout: async () => {
    await api.post('/auth/logout');
    localStorage.removeItem('accessToken');
  },

  getCurrentUser: async () => {
    const { data } = await api.get('/auth/me');
    return data;
  },
};