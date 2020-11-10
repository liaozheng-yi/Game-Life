import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
    path: '/',
    name: 'Login',
    component: () =>import(/* webpackChunkName: "login" */ '@/views/login')
  },
  {
    path: '/plans',
    name: 'Plans',
    component: () => import(/* webpackChunkName: "plans" */ '@/views/plan')
    
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
