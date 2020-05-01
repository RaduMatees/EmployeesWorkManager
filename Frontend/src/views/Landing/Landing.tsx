import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Landing extends Vue {
  render() {
    return (
      <section class="landing">
        <div class="dark-overlay">
          <div class="landing-inner">
            <h1 class="x-large">Work Manager</h1>
            <p class="lead">
              Visualize your remote pushed work all in one place
          </p>
            <div class="buttons">
              <router-link to={{ name: 'register' }} class="btn btn-primary">Sign Up</router-link>
              <router-link to={{ name: 'login' }} class="btn btn-light">Login</router-link>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
