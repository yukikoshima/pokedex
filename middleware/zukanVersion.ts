import * as zukanVersionType from '@/store/types/zukanVersionType'

export default function ({ store, params, from }) {
  console.log('zukanVersion : start')
  if (params.id !== from.params.id) {
    console.log('url変更')
    store.dispatch(zukanVersionType.ACTION_RESET_STATE)
    const zukan = store.getters[zukanVersionType.GETTER_ZUKAN_VERSION]
    const ver = params.id
    sessionStorage.setItem('startNo', zukan[ver].startNo)
    sessionStorage.setItem('endNo', zukan[ver].endNo)
  }
  store.dispatch(zukanVersionType.ACTION_FETCH_POKEMONS)
}
