import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router'
import store from '../store/auth'

// 페이지 컴포넌트들 import
import Home from '../pages/Home.vue'
import Main from '../pages/Main.vue'
import Login from '../pages/Login.vue'
import Signup from '../pages/Signup.vue'
import Landing from '../pages/Landing.vue'
import Detail from '../pages/Detail.vue'
import Editor from '../pages/Editor.vue'
import Reader from '../pages/Reader.vue'
import ReadDetail from '../pages/ReadDetail.vue'
import SubItemDetail from '../pages/SubItemDetail.vue'

// JWT 토큰 확인 함수
const isAuthenticated = () => {
  return store.getters['auth/isLoggedIn']  // Vuex getter 사용
}

export const routes = [
  {
    name: 'Landing',
    path: '/',
    component: () => import('@/pages/Landing.vue'),
  },
  {
    name: 'Main',
    path: '/main',
    component: () => import('@/pages/Home.vue'),
  },
  {
    name: 'Login',
    path: '/login',
    component: () => import('@/pages/Login.vue'),
  },
  {
    name: 'SignUp',
    path: '/signup',
    component: () => import('@/pages/Signup.vue'),
  },
  {
    path: '/detail/:id',
    component: () => import('@/pages/SubItemDetail.vue'),
  },
  {
    path: '/read/:id',
    component: () => import('@/pages/ReadDetail.vue'),
    meta: { requiresAuth: true }, // 인증이 필요한 페이지
  },
  {
    name: 'Reader',
    path: '/Reader',
    component: () => import('@/pages/Reader.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

// Vue Router 생성
const router = createRouter({
  history: typeof window !== 'undefined' ? createWebHistory() : createMemoryHistory(),
  routes,
})

// 네비게이션 가드 수정
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters['auth/isLoggedIn']) {
    // Vuex getter를 사용하여 인증 상태 확인
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router 