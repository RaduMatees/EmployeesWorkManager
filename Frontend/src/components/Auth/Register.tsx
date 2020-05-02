import { Vue, Component } from 'vue-property-decorator'
import { TypeRegister, Role } from '@/interfaces/type-register'

@Component({
  computed: {
    userRegisterData() {
      return this.$store.getters.userRegisterData
    },
    emailError() {
      return this.$store.getters.emailError
    }
  }
})
export default class Register extends Vue {
  // Store
  private readonly userRegisterData!: TypeRegister
  private readonly emailError!: boolean
  // Local
  private formData: TypeRegister = {
    name: '',
    email: '',
    role: 'admin',
    password: '',
    password2: ''
  }
  private passwordError: boolean = false

  beforeDestroy() {
    this.passwordError = false
    this.$store.dispatch('removeErrors')
  }

  onChange(e: any) {
    const selectedField: 'name' | 'email' | 'password' | 'password2' = e.target.name
    this.formData = { ...this.userRegisterData }
    this.formData[selectedField] = e.target.value
    this.$store.dispatch('updateUserRegisterData', this.formData)
  }

  onChangeRole(e: any) {
    const role: Role = e.target.checked ? 'employee' : 'admin'
    this.formData = { ...this.userRegisterData }
    this.formData.role = role
    this.$store.dispatch('updateUserRegisterData', this.formData)
  }

  onSubmit(e: any) {
    e.preventDefault()
    if (this.formData.password !== this.formData.password2) {
      this.passwordError = true
    } else {
      this.$store.dispatch('submitUserRegistration', this.formData)
    }
  }

  render() {
    const { name, email, role, password, password2 } = this.userRegisterData

    return (
      <div class='container'>
        <section class="container">
          <h1 class="large text-primary">Sign Up</h1>
          <p class="lead"><i class="fas fa-user"></i> Create Your Account</p>
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
            </div>

            <div class="form-group">
              <input type="text" placeholder="Name" name="name" value={name} required onChange={this.onChange} />
            </div>

            <div class="form-group">
              {this.emailError ? <p class='error-text'>Email is already registered</p> : null}
              <input class={this.emailError ? 'input-error' : null} type="email" placeholder="Email Address" name="email" value={email} onChange={this.onChange} />
              <small class="form-text"></small>
            </div>

            <div class="form-group">
              {this.passwordError ? <p class='error-text'>Passwords do not match</p> : null}
              <input
                class={this.passwordError ? 'input-error' : null}
                type="password"
                placeholder="Password"
                name="password"
                minLength="6"
                value={password}
                onChange={this.onChange}
              />
            </div>

            <div class="form-group">
              <input
                class={this.passwordError ? 'input-error' : null}
                type="password"
                placeholder="Confirm Password"
                name="password2"
                minLength="6"
                value={password2}
                onChange={this.onChange}
              />
            </div>

            <input type="submit" class="btn btn-primary" value="Register" />
          </form>
          <p class="my-1">
            Already have an account? <router-link to={{ name: 'login' }}>Sign In</router-link>
          </p>
        </section>
      </div>
    )
  }
}
