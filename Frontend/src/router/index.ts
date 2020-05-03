import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Landing from '@/views/Landing/Landing'
import Login from '@/components/Auth/Login'
import Register from '@/components/Auth/Register'
import Profiles from '@/views/Profiles/Profiles'
import Dashboard from '@/views/Dashboard/Dashboard'
import { store } from "@/store"
import ApiClient from "@/api/ApiClient"

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
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    beforeEnter(to, from, next) {
      if (!from.name) {
        const apiClient = ApiClient.getInstance()
        const isAuthenticated = apiClient.setTokenFromStorage()
        if (isAuthenticated) next()
      } else {
        if (store.getters.isAuthenticated) next()
      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
