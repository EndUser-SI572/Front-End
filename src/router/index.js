import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
    {
      path: '/home_agricult/:id',
      name: 'home-agricult',
      component: () => import('../components/agricultors/homepage-agricultor')
    },
    {
      path: '/home_agricult/:id/profile_agricult',
      name: 'agricultor-profile',
      component: () => import('../components/agricultors/agricultor-profile')
    },
    {
      path: '/login_agricult',
      name: 'agricultor-login',
      component: () => import('../components/agricultors/login-agricultor')
    },
    {
      path: '/register_agricult',
      name: 'agricultor-register',
      component: () => import('../components/agricultors/register-agricultor')
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
