// eslint-disable-next-line import/named
import { GetterTree, ActionTree, MutationTree } from 'vuex'
import * as getAllPokemonsType from '@/store/types/getAllPokemonsType'
import {
  GetAllPokemonsAdapter,
  PokemonProcessingResponseType,
} from '@/store/types/adapters/getAllPokemonsAdapter'

const state = () => {
  return new GetAllPokemonsAdapter()
}

type getAllPokemonsList = ReturnType<typeof state>

const getters: GetterTree<getAllPokemonsList, getAllPokemonsList> = {
  [getAllPokemonsType.GETTER_POKEMONS](state: getAllPokemonsList) {
    return [...state.getAllPokemonsList]
  },
  [getAllPokemonsType.GETTER_POKEMON_AT_ID]:
    (state: getAllPokemonsList) => (id: number) => {
      return state.getAllPokemonsList.find((pokemon) => pokemon.pokeId === id)
    },
  [getAllPokemonsType.GETTER_POKEMON_AT_POKEMON_NAME]:
    (state: getAllPokemonsList) => (name: string) => {
      return state.getAllPokemonsList.filter((pokemon) =>
        pokemon.name.includes(name)
      )
    },
}

const mutations: MutationTree<getAllPokemonsList> = {
  [getAllPokemonsType.MUTATION_SET_POKEMONS](
    state: getAllPokemonsList,
    pokemon: PokemonProcessingResponseType
  ) {
    state.getAllPokemonsList.push(pokemon)
  },
}

const actions = {
  async [getAllPokemonsType.ACTION_FETCH_POKEMONS]({ commit }) {
    const lastNo = GetAllPokemonsAdapter.lastNo
    let pokeNo = Number(sessionStorage.getItem('pokeNo'))

    while (pokeNo <= lastNo) {
      await Promise.all([
        this.$axios.$get(`https://pokeapi.co/api/v2/pokemon/${pokeNo}`),
        this.$axios.$get(`https://pokeapi.co/api/v2/pokemon-species/${pokeNo}`),
      ])
        .then(([rpoke, rpokeSp]) => {
          const poke = rpoke
          const pokeSp = rpokeSp
          // id、画像、タイプを取得
          const pokeId = poke.id
          const img = poke.sprites.other['official-artwork'].front_default
          const types = poke.types.map((ele) => {
            return ele.type.name
          })
          // タイプが英語で返ってくるので日本語に変換
          const typesJa = this.$toTypeJa(types)
          // id、名前、種類、説明を取得
          // const spId = pokeSp.id
          // 英語で返ってくるので日本語に変換
          const name = this.$toJaName(pokeSp.names)
          const genera = this.$toJaName(pokeSp.genera)
          const flavorText = this.$toJaName(pokeSp.flavor_text_entries)

          const pokemon: PokemonProcessingResponseType = {
            pokeId,
            img,
            typesJa,
            name,
            genera,
            flavorText,
          }
          commit(getAllPokemonsType.MUTATION_SET_POKEMONS, pokemon)

          sessionStorage.setItem('pokeNo', String((pokeNo += 1)))
          pokeNo = Number(sessionStorage.getItem('pokeNo'))
        })
        .catch((err) => {
          console.log('ポケモン情報取得中にエラーが発生しました')
          console.error(err)
        })
    }
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
