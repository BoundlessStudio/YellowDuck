import { createWebHistory, createRouter } from 'vue-router'

import HomeView from '@/views/HomeView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/extract', component: () => import('@/views/ExtractView.vue')},
  { path: '/enumerate', component: () => import('@/views/EnumerateView.vue')},
  { path: '/explore', component: () => import('@/views/ExploreView.vue')},
  { path: '/execute', component: () => import('@/views/ExecuteView.vue')},
  { path: '/evaluate', component: () => import('@/views/EvaluateView.vue')},
  { path: '/enhance', component: () => import('@/views/EnhanceView.vue')},
  { path: '/about', component: () => import('@/views/AboutView.vue')},
  { path: '/subscriptions', component: () => import('@/views/SubscriptionsView.vue') },
  { path: '/docs', component: () => import('@/views/DocumentationView.vue') },
  { path: '/faqs', component: () => import('@/views/QuestionsView.vue') },
  { path: '/privacy', component: () => import('@/views/PrivacyView.vue') },
  { path: '/terms', component: () => import('@/views/TermsView.vue') },
  { path: '/callback', component: () => import('@/views/CallbackView.vue') },
]

const router = createRouter({
  scrollBehavior(/* to, from, savedPosition */) {
    return { top: 0 } // always scroll to top
  },
  history: createWebHistory(),
  routes,
})

export default router