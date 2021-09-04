import { Context, Plugin } from '@nuxt/types'
import createPersistedState from 'vuex-persistedstate'

// export default ({ store }) => {
//   window.onNuxtReady(() => {
//     createPersistedState({
//       key: 'pokedex',
//       storage: window.sessionStorage,
//     })(store)
//   })
// }

/**
 * vuexのデータをローカルストレージに保存
 */
interface MyWindow extends Window {
  onNuxtReady(obj: object): void
}
declare var window: MyWindow

export const plugin: Plugin = ({ store }: Context) => {
  window.onNuxtReady(() => {
    createPersistedState({
      key: 'pokedex',
      storage: window.sessionStorage,
    })(store)
  })
}
