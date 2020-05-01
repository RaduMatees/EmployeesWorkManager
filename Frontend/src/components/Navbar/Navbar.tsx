import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Navbar extends Vue {
  render() {
    return (
      <nav class="navbar bg-dark">
        <h1>
          <router-link to={{ name: 'landing' }}><i class="fas fa-code"></i> Work Manager</router-link>
        </h1>
        <ul>
          <li><router-link to={{ name: 'profiles' }}>Profiles</router-link></li>
          <li><router-link to={{ name: 'register' }}>Sign Up</router-link></li>
          <li><router-link to={{ name: 'login' }}>Login</router-link></li>
        </ul>
      </nav>
    )
  }
}
