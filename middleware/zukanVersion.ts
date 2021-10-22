import * as pokemonZukanType from '@/store/types/pokemonZukanType'
import zukanVersion from '@/assets/json/zukanVersion.json'

export default function ({ store, params, from }) {
  console.log('選択されたバージョンのポケモン達を取得 : start')
  if (params.id !== from.params.id) {
    console.log('url変更')
    store.dispatch(pokemonZukanType.ACTION_RESET_POKEMONBYVERSIONLIST)
    const zukan = zukanVersion
    const ver = params.id
    sessionStorage.setItem('startNo', zukan[ver].startNo)
    sessionStorage.setItem('endNo', zukan[ver].endNo)
  }
  store.dispatch(pokemonZukanType.ACTION_GET_POKEMONBYVERSIONLIST)
}
