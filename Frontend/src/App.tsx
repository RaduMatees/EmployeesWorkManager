import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import Navbar from '@/components/Navbar/Navbar'

import './App.sass'

@Component({
  computed: {
    authenticating() {
      return this.$store.getters.authenticating
    }
  }
})
export default class App extends Vue {
  // store
  private readonly authenticating!: boolean

  created() {
    this.$store.dispatch('checkIfAlreadyLoggedIn')
  }

  render() {
    const loading = <div class='loader'></div>
    const app = (
      <div id="app">
        <Navbar />
        <router-view />
      </div>
    )

    return this.authenticating ? loading : app
  }
}
