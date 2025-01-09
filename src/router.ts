import { createWebHistory, createRouter } from 'vue-router'

import HomeView from '@/views/HomeView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/about', component: () => import('@/views/AboutView.vue')},
  { path: '/subscriptions', component: () => import('@/views/SubscriptionsView.vue') },
  { path: '/docs', component: () => import('@/views/DocumentationView.vue') },
  { path: '/faqs', component: () => import('@/views/QuestionsView.vue') },
  { path: '/privacy', component: () => import('@/views/PrivacyView.vue') },
  { path: '/terms', component: () => import('@/views/TermsView.vue') },
  { path: '/callback', component: () => import('@/views/CallbackView.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router