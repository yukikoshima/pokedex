import * as getAllPokemonsType from '@/store/types/getAllPokemonsType'

const getAllPokemons = ({ store }) => {
  console.log('getAllPokemons : start')

  if (!sessionStorage.getItem('pokeNo')) {
    sessionStorage.setItem('pokeNo', '1')
  } else if (Number(sessionStorage.getItem('pokeNo')) > 898) {
    console.log('全ポケモンデータ取得済み')
    return
  }
  store.dispatch(getAllPokemonsType.ACTION_FETCH_POKEMONS)
}

export default getAllPokemons
