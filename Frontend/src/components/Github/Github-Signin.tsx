import { Vue, Component } from 'vue-property-decorator'

@Component
export default class GithubSignIn extends Vue {

  mounted() {
    this.$store.dispatch('getAccessTokenFromGithub', this.$route.query.code)
  }

  render() {
    return (
      <div class='container'>
        Github Data
      </div>
    )
  }
}
