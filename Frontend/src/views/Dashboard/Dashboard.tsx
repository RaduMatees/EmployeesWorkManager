import { Vue, Component, Watch } from 'vue-property-decorator'

@Component
export default class Dashboard extends Vue {
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
