import { Vue, Component, Watch } from 'vue-property-decorator'

@Component
export default class Dashboard extends Vue {
  // private aTag!: any

  // mounted() {
  //   this.aTag = this.$refs.aRef
  //   this.aTag.click()
  // }

  render() {
    return (
      <div class='container dashboard'>
        Dashboard Page
        <a ref='aRef' href={'http://localhost:5000/api/oauth/github'}>
          <div class='card remote'>
            <i class="fab fa-github"></i>Github
          </div>
        </a>
      </div>
    )
  }
}
