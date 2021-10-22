import * as pokemonZukanType from '~/store/types/pokemonZukanType'

const pokemonZukan = ({ store }) => {
  console.log('ポケモン図鑑データ取得 : start')

  if (!sessionStorage.getItem('pokeNo')) {
    sessionStorage.setItem('pokeNo', '1')
  } else if (Number(sessionStorage.getItem('pokeNo')) > 898) {
    console.log('全ポケモンデータ取得済み')
    return
  }
  store.dispatch(pokemonZukanType.ACTION_GET_POKEMONS)
}

export default pokemonZukan
