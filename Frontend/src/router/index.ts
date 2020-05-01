import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Landing from '@/views/Landing/Landing'
import Login from '@/components/Auth/Login'
import Register from '@/components/Auth/Register'
import Profiles from '@/views/Profiles/Profiles'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'landing',
    component: Landing
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/profiles',
    name: 'profiles',
    component: Profiles
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
