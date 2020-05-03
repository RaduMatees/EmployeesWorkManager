import Vue from 'vue'
import Vuex, { ActionContext } from 'vuex'
import { authModule } from './auth'

Vue.use(Vuex)

export interface State {
  user: null
}
type RootContext = ActionContext<State, State>

export const store = new Vuex.Store({
  state: {
    user: null
  },
  mutations: {},
  actions: {},
  modules: {
    authModule
  }
})
