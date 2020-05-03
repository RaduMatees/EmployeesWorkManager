import { Vue, Component, Watch } from 'vue-property-decorator'
import { TypeLogin, Role } from "@/interfaces/type-auth"

@Component({
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated
    },
    loginError() {
      return this.$store.getters.loginError
    },
    loginPortalError() {
      return this.$store.getters.loginPortalError
    }
  }
})
export default class Login extends Vue {
  // Store
  private readonly loginError!: boolean
  private readonly loginPortalError!: boolean
  private readonly isAuthenticated!: boolean
  // Local
  private formData: TypeLogin = {
    email: '',
    password: '',
    role: 'admin'
  }

  @Watch('isAuthenticated')
  onUserAuthenticated(val: boolean) {
    if (val) return this.$router.push({ name: 'dashboard' })
  }

  created() {
    if (this.isAuthenticated) return this.$router.push({ name: 'dashboard' })
  }

  beforeDestroy() {
    this.$store.dispatch('removeErrors')
  }

  private onChange(e: any) {
    const selectedField: 'email' | 'password' = e.target.name
    this.formData[selectedField] = e.target.value
  }

  private onChangeRole(e: any) {
    const role: Role = e.target.checked ? 'employee' : 'admin'
    this.formData.role = role
  }

  private onSubmit(e: any) {
    e.preventDefault()
    this.$store.dispatch('loginUser', this.formData)
  }

  render() {
    const { email, password, role } = this.formData

    return (
      <div class='container'>
        <section class="container">
          <h1 class="large text-primary">Sign In</h1>
          <p class="lead"><i class="fas fa-user"></i> Sign into Your Account</p>
          <form class="form" onSubmit={this.onSubmit}>
            <div class='group-switch'>
              <label class='label-admin'>Admin</label>
              <label class="switch">
                <input type="checkbox" name="role"
                  checked={role === 'admin' ? false : true}
                  onChange={this.onChangeRole} />
                <span class="slider round"></span>
              </label>
              <label class='label-employee'>Employee</label>
              {this.loginPortalError ? <p class='error-text-role'>Make sure you have the appropiate role</p> : null}
            </div>

            <div class="form-group">
              {this.loginError ? <p class='error-text'>Invalid Credentials</p> : null}
              <input
                class={this.loginError ? 'input-error' : null}
                type="email"
                placeholder="Email Address"
                name="email"
                required
                value={email}
                onChange={this.onChange}
              />
            </div>

            <div class="form-group">
              <input
                class={this.loginError ? 'input-error' : null}
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={this.onChange}
              />
            </div>

            <input type="submit" class="btn btn-primary" value="Login" />
          </form>
          <p class="my-1">
            Don't have an account? <router-link to={{ name: 'register' }}>Sign Up</router-link>
          </p>
        </section>
      </div>
    )
  }
}
