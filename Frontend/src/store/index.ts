import Vue from 'vue'
import Vuex from 'vuex'
import { authModule } from './auth'

Vue.use(Vuex)

export interface State {

}

export const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    authModule
  }
})
