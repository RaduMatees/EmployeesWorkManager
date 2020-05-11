import { ActionContext } from "vuex"
import { State as RootState } from "."
import ApiClient from "@/api/ApiClient"

interface AuthProvidersState {

}
type AuthProvidersContext = ActionContext<AuthProvidersState, RootState>

export const authProvidersModule = {

  state: {

  },

  getters: {

  },

  mutations: {

  },

  actions: {
    getAccessTokenFromGithub(context: AuthProvidersContext, code: string) {
      const apiClient = ApiClient.getInstance()
      apiClient.getAccessTokenFromGithub(code)
    }
  },

}