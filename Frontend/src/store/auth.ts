import { ActionContext } from "vuex"
import { State as RootState } from "."
import { TypeRegister } from '@/interfaces/type-register'
import { Errors, ErrorTypes } from '@/interfaces/errors'
import { createEmptyErrorsObject } from '@/utils/utilFunctions'
import ApiClient from "@/api/ApiClient"

interface AuthState {
  userRegisterData: TypeRegister,
  errors: Errors
}
type AuthContext = ActionContext<AuthState, RootState>

const ApiAxiosClient = new ApiClient()

export const authModule = {

  state: {
    userRegisterData: {
      name: '',
      email: '',
      role: 'admin',
      password: '',
      password2: ''
    } as TypeRegister,
    errors: {
      emailError: false
    } as Errors
  },
  getters: {
    userRegisterData(state: AuthState) {
      return state.userRegisterData
    },
    emailError(state: AuthState) {
      return state.errors.emailError
    }
  },

  mutations: {
    setUserRegisterData(state: AuthState, userRegisterData: TypeRegister) {
      state.userRegisterData = userRegisterData
    },

    setError(state: AuthState, error: ErrorTypes) {
      state.errors[error] = true
    },

    setErrorsEmpty(state: AuthState) {
      state.errors = createEmptyErrorsObject()
    }
  },

  actions: {
    updateUserRegisterData(context: AuthContext, userRegisterData: TypeRegister) {
      context.commit('setUserRegisterData', userRegisterData)
    },

    async submitUserRegistration(context: AuthContext, userRegisterData: TypeRegister) {
      const res = await ApiAxiosClient.registerUser(userRegisterData)
      if (!res.success) return context.commit('setError', 'emailError')
    },

    removeErrors(context: AuthContext) {
      context.commit('setErrorsEmpty')
    }
  },

}