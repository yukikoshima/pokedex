let pokemonApi = 'https://pokeapi.co/api/v2/pokemon/'
let speciesApi = 'https://pokeapi.co/api/v2/pokemon-species/'

async function test() {
  const getPokemonData = () => {
    return fetch(pokemonApi).then((res) => res.json())
  }
  const getSpeciesData = () => {
    return fetch(speciesApi).then((res) => res.json())
  }

  const [pokemonData, speciesData] = await Promise.all([
    getPokemonData(),
    getSpeciesData(),
  ])
    .then((res) => {
      return res
    })
    .catch((err) => {
      console.log('エラー')
      console.log(err)
    })
  return [pokemonData, speciesData]
}

export default (context, inject) => {
  inject('test', test)
}
