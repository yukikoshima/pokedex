import { sync } from 'vuex-router-sync'

export default ({ app: { store, router } }) => {
  // console.log(router)
  sync(store, router)
}
