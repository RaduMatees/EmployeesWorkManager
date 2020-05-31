import Vue from 'vue'
import Vuex, { ActionContext } from 'vuex'
import { authModule } from './auth'
import { authProvidersModule } from './authProviders'

Vue.use(Vuex)

export interface State { }
type RootContext = ActionContext<State, State>

export const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    authModule,
    authProvidersModule
  }
})
