import { Vue, Component, Watch } from 'vue-property-decorator'

@Component({
  computed: {
    githubAccessToken() {
      return this.$store.getters.githubAccessToken
    }
  }
})
export default class Dashboard extends Vue {
  private readonly githubAccessToken!: string

  @Watch('githubAccessToken')
  onGithubTokenAvailable(token: string) {
    if (token) this.$store.dispatch('getRepositories', token)
  }

  mounted() {
    if (this.$route.query.code) this.$store.dispatch('getAccessTokenFromGithub', this.$route.query.code)
  }

  render() {
    return (
      <div class='container dashboard'>
        Dashboard Page
        <a href={'http://localhost:5000/api/oauth/github'}>
          <div class='card remote'>
            <i class="fab fa-github"></i>Github
          </div>
        </a>
      </div>
    )
  }
}
