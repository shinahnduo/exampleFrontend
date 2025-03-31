import { createStore } from 'vuex';
import axios from 'axios';

// API 인스턴스 생성
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const authModule = {
  namespaced: true,
  state: {
    token: localStorage.getItem('jwt_token') || null,
    isAuthenticated: !!localStorage.getItem('jwt_token'),
  },
  getters: {
    getToken: (state) => state.token,
    isLoggedIn: (state) => state.isAuthenticated,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      state.isAuthenticated = true;
      localStorage.setItem('jwt_token', token);
    },
    clearToken(state) {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('jwt_token');
    },
  },
  actions: {
    async login({ commit }, loginData) {
      const response = await api.post('/auth/login', loginData);
      commit('setToken', response.data.token);
      return response.data;
    },
    logout({ commit }) {
      commit('clearToken');
    },
  },
};

const store = createStore({
  modules: {
    auth: authModule,
  },
});

export default store;