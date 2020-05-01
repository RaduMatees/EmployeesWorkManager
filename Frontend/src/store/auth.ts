import { ActionContext } from "vuex"
import { State as RootState } from "."
import { TypeRegister } from '@/interfaces/type-register'

interface AuthState {
  userRegisterData: TypeRegister
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
    } as TypeRegister
  },
  getters: {
    userRegisterData(state: AuthState) {
      return state.userRegisterData
    }
  },
  mutations: {
    setUserRegisterData(state: AuthState, userRegisterData: TypeRegister) {
      state.userRegisterData = userRegisterData
    }
  },
  actions: {
    updateUserRegisterData(context: AuthContext, userRegisterData: TypeRegister) {
      context.commit('setUserRegisterData', userRegisterData)
    }
  }
}