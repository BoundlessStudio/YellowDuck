import './style.css'
import 'highlight.js/styles/monokai.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Markdown from 'vue3-markdown-it';
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(Markdown)
app.mount('#app')
