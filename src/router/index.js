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
    meta: {login:true},
    component: () => import(/* webpackChunkName: "plans" */ '@/views/plan')
    
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,from,next)=>{
  if(to.matched.some(record=>record.meta.login)){
    if(!sessionStorage.getItem('token')){
      next('/')
    }else{
      next()
    }
  }else{
    next()
  }
})

export default router
