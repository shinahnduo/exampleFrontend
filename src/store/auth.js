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
    user: null,
    token: localStorage.getItem('jwt_token') || null,
    isAuthenticated: !!localStorage.getItem('jwt_token'),
  },
  getters: {
    getToken: (state) => state.token,
    isLoggedIn: (state) => state.isAuthenticated,
    currentUser: (state) => state.user,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
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
    async login({ commit }, credentials) {
      try {
        const response = await api.post('/auth/login', credentials);
        commit('setUser', response.data.user);
        commit('setToken', response.data.token);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    async googleLogin({ commit }, { email, name, client_id }) {
      try {
        const response = await api.post('/auth/google-login', {
          email,
          name,
          client_id
        });
        if (response.data.token) {
          commit('setUser', response.data.user);
          commit('setToken', response.data.token);
          window.location.href = '/main';
          return response.data;
        } else {
          throw new Error('Invalid response from server');
        }
      } catch (error) {
        console.error('Google login error:', error);
        throw new Error('Google 로그인에 실패했습니다.');
      }
    },
    logout({ commit }) {
      commit('clearToken');
      commit('setUser', null);
    }
  },
};

const store = createStore({
  modules: {
    auth: authModule,
  },
});

export default store;