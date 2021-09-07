import { GetterTree, ActionTree, MutationTree } from 'vuex'
import * as getAllPokemonsType from '@/store/types/getAllPokemonsType'

// const state = () => {
//   return new Pokemons()
// }
const state = () => ({
  pokemons: [],
  // pokemon: {
  //   pokeId: null,
  //   img: '',
  //   typesJa: [],
  //   name: '',
  //   genera: '',
  //   flavorText: '',
  // },
  pokeNo: 1,
})

const getters = {
  [getAllPokemonsType.GETTER_POKEMONS](state) {
    return state.pokemons
  },
  [getAllPokemonsType.GETTER_POKE_NO](state) {
    return state.pokeNo
  },
  /**
   *
   * @returns Object
   */
  [getAllPokemonsType.GETTER_POKEMON_AT_ID]: (state) => (id) => {
    const copyPokemons = JSON.parse(JSON.stringify(state.pokemons))
    return copyPokemons.find((pokemon) => pokemon.pokeId === id)
  },
  /**
   *
   * @returns Array
   */
  [getAllPokemonsType.GETTER_POKEMON_AT_POKEMON_NAME]: (state) => (name) => {
    const copyPokemons = JSON.parse(JSON.stringify(state.pokemons))
    return copyPokemons.filter((pokemon) => pokemon.name.includes(name))
  },
}

const mutations = {
  [getAllPokemonsType.MUTATION_SET_POKEMONS](state, pokemon) {
    state.pokemons.push(pokemon)
  },
  // [getAllPokemonsType.MUTATION_SET_POKEMON](state, pokemon) {
  //   state.pokemon = pokemon
  // },
  [getAllPokemonsType.MUTATION_SET_POKE_NO](state) {
    state.pokeNo += 1
  },
}

const actions = {
  // [getAllPokemonsType.ACTION_SET_POKEMONS](context) {
  //   context.commit(getAllPokemonsType.MUTATION_SET_POKEMONS)
  // },
  // [getAllPokemonsType.ACTION_SET_POKEMON](context, pokemon) {
  //   context.commit(getAllPokemonsType.MUTATION_SET_POKEMON, pokemon)
  // },
  [getAllPokemonsType.ACTION_SET_POKE_NO](context) {
    context.commit(getAllPokemonsType.MUTATION_SET_POKE_NO)
  },
  async [getAllPokemonsType.ACTION_FETCH_POKEMONS](context, pokeNo) {
    const that = this

    await Promise.all([
      that.$fetchData(`https://pokeapi.co/api/v2/pokemon/${pokeNo}`),
      that.$fetchData(`https://pokeapi.co/api/v2/pokemon-species/${pokeNo}`),
    ])
      .then((res) => {
        const poke = res[0]
        const pokeSp = res[1]
        // id、画像、タイプを取得
        const pokeId = poke.id
        const img = poke.sprites.other['official-artwork'].front_default
        const types = poke.types.map((ele) => {
          return ele.type.name
        })
        // タイプが英語で返ってくるので日本語に変換
        const typesJa = that.$toTypeJa(types)
        // id、名前、種類、説明を取得
        const spId = pokeSp.id
        // 英語で返ってくるので日本語に変換
        const name = that.$toJaName(pokeSp.names)
        const genera = that.$toJaName(pokeSp.genera)
        const flavorText = that.$toJaName(pokeSp.flavor_text_entries)

        if (pokeId === spId) {
          context.commit(getAllPokemonsType.MUTATION_SET_POKEMONS, {
            // pokemon: {
            pokeId,
            img: img || '',
            typesJa: typesJa || '',
            name: name ? name.name : '',
            genera: genera ? genera.genus : '',
            flavorText: flavorText ? flavorText.flavor_text : '',
            // },
          })
        }
      })
      .catch((err) => {
        console.log('ポケモン情報取得中にエラーが発生しました')
        console.log(err)
      })
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
