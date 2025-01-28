import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createAuth0 } from '@auth0/auth0-vue'
import FloatingVue from 'floating-vue'

import router from './router'
import App from './App.vue'

import 'md-editor-v3/lib/style.css'
import 'vue3-toastify/dist/index.css'
import 'floating-vue/dist/style.css'
import './style.css'

const AUTH0_DOMAIN = import.meta.env.VITE_AUTH0_DOMAIN
const AUTH0_CLIENT_ID = import.meta.env.VITE_AUTH0_CLIENT_ID
const VITE_AUTH0_AUDIENCE = import.meta.env.VITE_AUTH0_AUDIENCE

const auth0 = createAuth0({
  domain: AUTH0_DOMAIN,
  clientId: AUTH0_CLIENT_ID,
  authorizationParams: {
    audience: VITE_AUTH0_AUDIENCE,
    redirect_uri: window.location.origin
  }
})

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(auth0)
app.use(FloatingVue)
app.mount('#app')