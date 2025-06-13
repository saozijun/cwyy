import { createRouter, createWebHistory } from 'vue-router'
import home from '../views/home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
    },
    {
      path: '/success',
      name: 'success',
      component: () => import('../views/Success.vue')
    },
    {
      path: '/details',
      name: 'details',
      component: () => import('../views/Details.vue')
    },
    {
      path: '/notifications',
      name: 'notifications',
      component: () => import('../views/Notifications.vue')
    }
  ],
})

export default router
