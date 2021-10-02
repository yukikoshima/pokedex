import * as getAllPokemonsType from '@/store/types/getAllPokemonsType'

const getAllPokemons = ({ store }) => {
  console.log('getAllPokemons : start')

  if (!sessionStorage.getItem('pokeNo')) {
    sessionStorage.setItem('pokeNo', '1')
  }
  store.dispatch(getAllPokemonsType.ACTION_FETCH_POKEMONS)
}

export default getAllPokemons
