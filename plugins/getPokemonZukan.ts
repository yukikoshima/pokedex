import * as pokemonZukanType from '~/store/types/pokemonZukanType'

const getPokemonZukan = ({ store }) => {
  console.log('plugins/getPokemonZukan.ts: start')

  if (!sessionStorage.getItem('pokeNo')) {
    sessionStorage.setItem('pokeNo', '1')
  } else if (Number(sessionStorage.getItem('pokeNo')) > 898) {
    console.log('plugins/getPokemonZukan.ts: 全ポケモンデータ取得済み')
    return
  }
  store.dispatch(pokemonZukanType.ACTION_GET_POKEMONS)
}

// export default (context, inject) => {
//   inject('getPokemonZukan', getPokemonZukan)
// }
export default getPokemonZukan
