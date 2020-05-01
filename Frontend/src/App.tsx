import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import Navbar from '@/components/Navbar/Navbar'

import './App.sass'

@Component
export default class App extends Vue {
  render() {
    return (
      <div id="app">
        <Navbar />
        <router-view />
      </div>
    )
  }
}
