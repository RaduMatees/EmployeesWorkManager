import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Dashboard extends Vue {
  render() {
    return (
      <div class='container'>
        Dashboard Page
      </div>
    )
  }
}
