import { ActionContext } from "vuex"
import { State as RootState } from "."
import { TypeRegister, TypeLogin, TypeLoggedUser } from '@/interfaces/type-auth'
import { Errors, ErrorTypes } from '@/interfaces/errors'
import { createEmptyErrorsObject } from '@/utils/utilFunctions'
import ApiClient from "@/api/ApiClient"
import router from '../router'

interface AuthState {
  userRegisterData: TypeRegister,
  errors: Errors,
  isAuthenticated: boolean,
  loggedUser: TypeLoggedUser,
  authenticating: boolean
}
type AuthContext = ActionContext<AuthState, RootState>

export const authModule = {

  state: {
    userRegisterData: {
      name: '',
      email: '',
      role: 'admin',
      password: '',
      password2: ''
    } as TypeRegister,
    isAuthenticated: false,
    errors: {
      emailError: false,
      loginError: false,
      loginPortalError: false
    } as Errors,
    loggedUser: {
      name: '',
      email: '',
      role: ''
    } as TypeLoggedUser,
    authenticating: false
  },

  getters: {
    userRegisterData(state: AuthState) {
      return state.userRegisterData
    },
    emailError(state: AuthState) {
      return state.errors.emailError
    },
    isAuthenticated(state: AuthState) {
      return state.isAuthenticated
    },
    loginError(state: AuthState) {
      return state.errors.loginError
    },
    loginPortalError(state: AuthState) {
      return state.errors.loginPortalError
    },
    loggedUser(state: AuthState) {
      return state.loggedUser
    },
    authenticating(state: AuthState) {
      return state.authenticating
    }
  },

  mutations: {
    setUserRegisterData(state: AuthState, userRegisterData: TypeRegister) {
      state.userRegisterData = userRegisterData
    },

    setErrorTrue(state: AuthState, error: ErrorTypes) {
      state.errors[error] = true
    },

    setErrorsEmpty(state: AuthState) {
      state.errors = createEmptyErrorsObject()
    },

    setIsAuthenticated(state: AuthState, value: boolean) {
      state.isAuthenticated = value
    },

    setLoggedUser(state: AuthState, loggedUser: TypeLoggedUser) {
      state.loggedUser = loggedUser
    },

    setIsAuthenticating(state: AuthState, authenticating: boolean) {
      state.authenticating = authenticating
    }
  },

  actions: {
    updateUserRegisterData(context: AuthContext, userRegisterData: TypeRegister) {
      context.commit('setUserRegisterData', userRegisterData)
    },

    async submitUserRegistration(context: AuthContext, userRegisterData: TypeRegister) {
      const apiClient = ApiClient.getInstance()
      const data = await apiClient.registerUser(userRegisterData)
      if (!data.success) {
        context.commit('setIsAuthenticated', false)
        return context.commit('setErrorTrue', 'emailError')
      }

      context.commit('setLoggedUser', data.user)
      context.commit('setIsAuthenticated', true)
    },

    async loginUser(context: AuthContext, userLoginData: TypeLogin) {
      const apiClient = ApiClient.getInstance()
      const data = await apiClient.loginUser(userLoginData)
      if (!data.success) {
        context.commit('setIsAuthenticated', false)

        if (data.status === 401) return context.commit('setErrorTrue', 'loginPortalError')
        return context.commit('setErrorTrue', 'loginError')
      }

      context.commit('setLoggedUser', data.user)
      context.commit('setIsAuthenticated', true)
    },

    async checkIfAlreadyLoggedIn(context: AuthContext) {
      context.commit('setIsAuthenticating', true)
      const apiClient = ApiClient.getInstance()
      apiClient.setTokenFromStorage()
      try {
        const loggedUser = await apiClient.loadUser()
        context.commit('setLoggedUser', loggedUser.data)
        context.commit('setIsAuthenticated', true)
        context.commit('setIsAuthenticating', false)
        router.push({ name: 'dashboard' })
      } catch (err) {
        console.error('Token is not valid', err)
        apiClient.clearToken()
      }
    },

    logoutUser(context: AuthContext) {
      const apiClient = ApiClient.getInstance()
      apiClient.clearToken()
      context.commit('setIsAuthenticated', false)
    },

    removeErrors(context: AuthContext) {
      context.commit('setErrorsEmpty')
    }
  },

}