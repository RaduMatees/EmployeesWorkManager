import { Vue, Component, Watch } from 'vue-property-decorator'
import { TypeLoggedUser } from '@/interfaces/type-auth'

@Component({
  computed: {
    loggedUser() {
      return this.$store.getters.loggedUser
    },
    githubAccessToken() {
      return this.$store.getters.githubAccessToken
    }
  }
})
export default class Dashboard extends Vue {
  private readonly githubAccessToken!: string
  private readonly loggedUser!: TypeLoggedUser

  @Watch('githubAccessToken')
  onGithubTokenAvailable(token: string) {
    if (token) {
      if (this.loggedUser.role === 'admin') {
        this.$store.dispatch('getMembers', token)
      } else {
        this.$store.dispatch('getRepositories', token)
      }
    }
  }

  mounted() {
    if (this.$route.query.code) this.$store.dispatch('getAccessTokenFromGithub', this.$route.query.code)
  }

  render() {
    return (
      <div class='container dashboard'>
        Dashboard Page
        <a href={`http://localhost:5000/api/oauth/github/${this.loggedUser.role}`}>
          <div class='card remote'>
            <i class="fab fa-github"></i>Github
          </div>
        </a>
      </div>
    )
  }
}
