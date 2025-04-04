import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/auth'
import './registerServiceWorker'
import vue3GoogleLogin from 'vue3-google-login'

// Google OAuth 설정

const app = createApp(App)
app.use(vue3GoogleLogin, {
    clientId: '1045727623358-v2o1k3kskfaeh8g3pajg2de5v0suvspv.apps.googleusercontent.com',
});

app.use(router)
app.use(store)

// Google OAuth 스크립트 로드
const script = document.createElement('script')
script.src = 'https://accounts.google.com/gsi/client'
script.async = true
script.defer = true
document.head.appendChild(script)

app.mount('#app')