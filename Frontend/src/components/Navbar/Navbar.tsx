import { Vue, Component } from 'vue-property-decorator'

@Component({
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated
    }
  }
})
export default class Navbar extends Vue {
  private readonly isAuthenticated!: boolean

  private logout() {
    this.$store.dispatch('logoutUser')
  }

  render() {
    const authLinks = (
      <ul>
        <li><router-link to={{ name: 'profiles' }}>Profiles</router-link></li>
        <li>
          <router-link nativeOnClick={this.logout} to={{ name: 'landing' }}>
            <i class="fas fa-sign-out-alt"></i>
            <span class='hide-sm'>Logout</span>
          </router-link>
        </li>
      </ul>
    )

    const guestLinks = (
      <ul>
        <li><router-link to={{ name: 'profiles' }}>Profiles</router-link></li>
        <li><router-link to={{ name: 'register' }}>Sign Up</router-link></li>
        <li><router-link to={{ name: 'login' }}>Login</router-link></li>
      </ul>
    )

    return (
      <nav class="navbar bg-dark">
        <h1>
          <router-link to={{ name: `${this.isAuthenticated ? 'dashboard' : 'landing'}` }}><i class="fas fa-code"></i> Work Manager</router-link>
        </h1>

        {this.isAuthenticated ? authLinks : guestLinks}
      </nav>
    )
  }
}
