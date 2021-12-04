import * as pokemonZukanType from '@/store/types/pokemonZukanType'
import zukanVersion from '@/assets/json/zukanVersion.json'

export default function ({ store, params, from }) {
  console.log('middleware/zukanVersion.ts: start')

  if (params.id !== from.params.id) {
    console.log('middleware/zukanVersion.ts: url変更')
    store.dispatch(pokemonZukanType.ACTION_CLEAR_POKEMONS_BY_VERSION)
    const zukan = zukanVersion
    const ver = params.id
    sessionStorage.setItem('startNo', zukan[ver].startNo)
    sessionStorage.setItem('endNo', zukan[ver].endNo)
  }
  store.dispatch(pokemonZukanType.ACTION_GET_POKEMONS_BY_VERSION)
}
