import { Context, Plugin } from '@nuxt/types'
import createPersistedState from 'vuex-persistedstate'
// import * as Cookies from 'js-cookie';

export default ({ store }) => {
  window.onNuxtReady(() => {
    createPersistedState({
      key: 'pokedex',
      storage: window.sessionStorage,
      // storage: {
      //   getItem: (key) => Cookies.get(key),
      //   // Please see https://github.com/js-cookie/js-cookie#json, on how to handle JSON.
      //   setItem: (key, value) =>
      //     Cookies.set(key, value, { expires: 3, secure: true }),
      //   removeItem: (key) => Cookies.remove(key),
      // },
    })(store)
  })
}

/**
 * vuexのデータをローカルストレージに保存
 */
// interface MyWindow extends Window {
//   onNuxtReady(obj: object): void
// }
// declare let window: MyWindow

// export const plugin: Plugin = ({ store }: Context) => {
//   window.onNuxtReady(() => {
//     createPersistedState({
//       key: 'pokedex',
//       storage: window.sessionStorage,
//     })(store)
//   })
// }