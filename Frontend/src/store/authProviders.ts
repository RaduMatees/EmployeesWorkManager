import { ActionContext } from "vuex"
import { State as RootState } from "."
import ApiClient from "@/api/ApiClient"

interface AuthProvidersState {
  githubAccessToken: string
}
type AuthProvidersContext = ActionContext<AuthProvidersState, RootState>

export const authProvidersModule = {

  state: {
    githubAccessToken: ''
  },

  getters: {
    githubAccessToken(state: AuthProvidersState) {
      return state.githubAccessToken
    }
  },

  mutations: {
    setGithubAccessToken(state: AuthProvidersState, token: string) {
      state.githubAccessToken = token
    }
  },

  actions: {
    async getAccessTokenFromGithub(context: AuthProvidersContext, code: string) {
      const apiClient = ApiClient.getInstance()
      const accessToken = await apiClient.getAccessTokenFromGithub(code)
      context.commit('setGithubAccessToken', accessToken)
    },

    clearGithubAccessToken(context: AuthProvidersContext) {
      context.commit('setGithubAccessToken', '')
    },

    async getRepositories(context: AuthProvidersContext, token: string) {
      const apiClient = ApiClient.getInstance()
      const repositories = await apiClient.getRepositories(token)
      console.log('------------- repositories', repositories)
    },

    async getMembers(context: AuthProvidersContext, token: string) {
      const apiClient = ApiClient.getInstance()
      const members = await apiClient.getMembers(token)
      console.log('-------------- members', members)
    }
  },

}