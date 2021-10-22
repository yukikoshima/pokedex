// eslint-disable-next-line import/named
import { GetterTree, ActionTree, MutationTree } from 'vuex'
import * as pokemonZukanType from '~/store/types/pokemonZukanType'
import {
  PokemonZukanAdapter,
  PokemonProcessingDataResponseType,
} from '~/store/types/adapters/pokemonZukanAdapter'

const state = () => {
  return new PokemonZukanAdapter()
}

type pokemonZukanList = ReturnType<typeof state>

const getters: GetterTree<pokemonZukanList, pokemonZukanList> = {
  /**
   * 全てのポケモン取得
   */
  [pokemonZukanType.GETTER_POKEMONS](state: pokemonZukanList) {
    return [...state.allPokemonList]
  },
  /**
   * バージョンごとのポケモン取得
   */
  [pokemonZukanType.GETTER_POKEMONS_BY_VERSION](state: pokemonZukanList) {
    return [...state.pokemonByVersionList]
  },
  /**
   * 図鑑番号で取得
   */
  [pokemonZukanType.GETTER_POKEMON_AT_ID]:
    (state: pokemonZukanList) => (id: number) => {
      return state.allPokemonList.find((pokemon) => pokemon.pokeId === id)
    },
  /**
   * ポケモン名で取得
   */
  [pokemonZukanType.GETTER_POKEMON_AT_POKEMON_NAME]:
    (state: pokemonZukanList) => (name: string) => {
      return state.allPokemonList.filter((pokemon) =>
        pokemon.name.includes(name)
      )
    },
}

const mutations: MutationTree<pokemonZukanList> = {
  /**
   * 全てのポケモンをセット
   */
  [pokemonZukanType.MUTATION_SET_POKEMONS](
    state: pokemonZukanList,
    pokemon: PokemonProcessingDataResponseType
  ) {
    state.allPokemonList.push(pokemon)
  },
  /**
   * バージョンごとのポケモンをセット
   */
  [pokemonZukanType.MUTATION_SET_POKEMONBYVERSIONLIST](
    state: pokemonZukanList,
    pokemon: PokemonProcessingDataResponseType
  ) {
    state.pokemonByVersionList.push(pokemon)
  },
  [pokemonZukanType.MUTATION_RESET_POKEMONBYVERSIONLIST](
    state: pokemonZukanList
  ) {
    // Object.assign(state.pokemonByVersionList, state.pokemonByVersionList = [])
    state.pokemonByVersionList = []
  },
}

const actions = {
  [pokemonZukanType.ACTION_RESET_POKEMONBYVERSIONLIST]({ commit }) {
    commit(pokemonZukanType.MUTATION_RESET_POKEMONBYVERSIONLIST)
  },

  async [pokemonZukanType.ACTION_GET_POKEMONS]({ commit }) {
    const lastNo = PokemonZukanAdapter.lastNo
    let pokeNo = Number(sessionStorage.getItem('pokeNo'))

    while (pokeNo <= lastNo) {
      await Promise.all([
        this.$axios.$get(`https://pokeapi.co/api/v2/pokemon/${pokeNo}`),
        this.$axios.$get(`https://pokeapi.co/api/v2/pokemon-species/${pokeNo}`),
      ])
        .then(([poke, pokeSp]) => {
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

          const pokemon: PokemonProcessingDataResponseType = {
            pokeId,
            img,
            typesJa,
            name,
            genera,
            flavorText,
          }
          commit(pokemonZukanType.MUTATION_SET_POKEMONS, pokemon)

          sessionStorage.setItem('pokeNo', String((pokeNo += 1)))
          pokeNo = Number(sessionStorage.getItem('pokeNo'))
        })
        .catch((err) => {
          console.log('ポケモン情報取得中にエラーが発生しました')
          console.error(err)
        })
    }
  },

  async [pokemonZukanType.ACTION_GET_POKEMONBYVERSIONLIST]({ state, commit }) {
    const pokemons = [...state.allPokemonList]
    const endNo = Number(sessionStorage.getItem('endNo'))
    let startNo = Number(sessionStorage.getItem('startNo'))

    while (startNo <= endNo) {
      if (!pokemons[startNo - 1]) return

      let pokemon = pokemons[startNo - 1]
      await commit(pokemonZukanType.MUTATION_SET_POKEMONBYVERSIONLIST, pokemon)

      sessionStorage.setItem('startNo', String((startNo += 1)))
      startNo = Number(sessionStorage.getItem('startNo'))
    }
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
