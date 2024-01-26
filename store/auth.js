import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoading: false,
    isAuthenticated: false,
    token: '',
  }),

  actions: {
    initializeAuthStore() {
      const token = localStorage.getItem('token');
      if (token) {
        this.setToken(token);
      } else {
        this.removeToken();
      }
    },

    setIsLoading(status) {
      this.isLoading = status;
    },

    setToken(token) {
      this.token = token;
      this.isAuthenticated = true;
      localStorage.setItem('token', token);
    },

    removeToken() {
      this.token = '';
      this.isAuthenticated = false;
      localStorage.removeItem('token');
    },
  },
});
