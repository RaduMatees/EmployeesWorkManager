import { ActionContext } from "vuex"
import { State as RootState } from "."
import { TypeRegister, TypeLogin } from '@/interfaces/type-auth'
import { Errors, ErrorTypes } from '@/interfaces/errors'
import { createEmptyErrorsObject } from '@/utils/utilFunctions'
import ApiClient from "@/api/ApiClient"

interface AuthState {
  userRegisterData: TypeRegister,
  errors: Errors,
  isAuthenticated: boolean
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
    } as Errors
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
    }
  },

  actions: {
    updateUserRegisterData(context: AuthContext, userRegisterData: TypeRegister) {
      context.commit('setUserRegisterData', userRegisterData)
    },

    async submitUserRegistration(context: AuthContext, userRegisterData: TypeRegister) {
      const apiClient = ApiClient.getInstance()
      const success = await apiClient.registerUser(userRegisterData)
      if (!success) {
        context.commit('setIsAuthenticated', false)
        return context.commit('setErrorTrue', 'emailError')
      }

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

      context.commit('setIsAuthenticated', true)
    },

    checkIfAlreadyLoggedIn(context: AuthContext) {
      const apiClient = ApiClient.getInstance()
      const isAuthenticated = apiClient.setTokenFromStorage()
      context.commit('setIsAuthenticated', isAuthenticated)
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