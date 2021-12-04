// eslint-disable-next-line import/named
import { GetterTree, ActionTree, MutationTree } from 'vuex'
import * as pokemonZukanType from '~/store/types/pokemonZukanType'
import * as errorType from '@/store/types/errorType'
import {
  PokemonZukanAdapter,
  PokemonInfo,
} from '~/store/types/adapters/pokemonZukanAdapter'
import { ErrorStatus } from '@/store/types/adapters/errorAdapter'

const state = () => {
  return new PokemonZukanAdapter()
}

type pokemonZukan = ReturnType<typeof state>

const getters: GetterTree<pokemonZukan, pokemonZukan> = {
  /**
   * 全てのポケモン取得
   */
  [pokemonZukanType.GETTER_POKEMONS](state: pokemonZukan) {
    return state.pokemons.map((pokemon) => ({ ...pokemon }))
  },
  /**
   * バージョンごとのポケモン取得
   */
  [pokemonZukanType.GETTER_POKEMONS_BY_VERSION](state: pokemonZukan) {
    return state.pokemonsByVersion.map((pokemon) => ({ ...pokemon }))
  },
  /**
   * 図鑑番号で取得
   */
  [pokemonZukanType.GETTER_POKEMON_BY_ID]:
    (state: pokemonZukan) => (id: number) => {
      return state.pokemons.find((pokemon) => pokemon.id === id)
    },
  /**
   * ポケモン名で取得
   */
  [pokemonZukanType.GETTER_POKEMONS_BY_INCLUDES]:
    (state: pokemonZukan) => (name: string) => {
      return state.pokemons.filter((pokemon) => pokemon.name.includes(name))
    },
  /**
   * 完全一致で検索
   */
  [pokemonZukanType.GETTER_POKEMON_BY_POKEMON_NAME]:
    (state: pokemonZukan) => (name: string) => {
      return state.pokemons.find((pokemon) => pokemon.name === name)
    },
  /**
   * 「ン」で終わらないポケモンを取得
   */
  [pokemonZukanType.GETTER_POKEMONS_END_N_NOT]: (state: pokemonZukan) => () => {
    return state.pokemons.filter((pokemon) => !pokemon.name.endsWith('ン'))
  },
}

const mutations: MutationTree<pokemonZukan> = {
  /**
   * 全てのポケモンをセット
   */
  [pokemonZukanType.MUTATION_SET_POKEMONS](
    state: pokemonZukan,
    pokemon: PokemonInfo
  ) {
    state.pokemons.push(pokemon)
  },
  /**
   * バージョンごとのポケモンをセット
   */
  [pokemonZukanType.MUTATION_SET_POKEMONS_BY_VERSION](
    state: pokemonZukan,
    pokemon: PokemonInfo
  ) {
    state.pokemonsByVersion.push(pokemon)
  },
  [pokemonZukanType.MUTATION_CLEAR_POKEMONS_BY_VERSION](state: pokemonZukan) {
    state.pokemonsByVersion = []
  },
}

const actions: ActionTree<pokemonZukan, pokemonZukan> = {
  [pokemonZukanType.ACTION_CLEAR_POKEMONS_BY_VERSION]({ commit }) {
    commit(pokemonZukanType.MUTATION_CLEAR_POKEMONS_BY_VERSION)
  },
  /**
   * 全てのポケモンを取得
   */
  async [pokemonZukanType.ACTION_GET_POKEMONS]({
    dispatch,
    commit,
    rootGetters,
  }) {
    const lastNo: number = PokemonZukanAdapter.lastNo
    let pokeNo: number = Number(sessionStorage.getItem('pokeNo'))

    while (pokeNo <= lastNo) {
      await Promise.all([
        this.$axios.$get(`https://pokeapi.co/api/v2/pokemon/${pokeNo}`),
        this.$axios.$get(`https://pokeapi.co/api/v2/pokemon-species/${pokeNo}`),
      ])
        .then(([poke, pokeSp]) => {
          // id、画像、タイプを取得
          const id = poke.id
          const img = poke.sprites.other['official-artwork'].front_default
          const types = poke.types.map((v) => {
            return v.type.name
          })
          // タイプが英語で返ってくるので日本語に変換
          const typesJa = this.$toTypeJa(types)
          // id、名前、種類、説明を取得
          // 英語で返ってくるので日本語に変換
          const name = this.$toNameJa(pokeSp.names)
          const genera = this.$toNameJa(pokeSp.genera)
          const flavorText = this.$toNameJa(pokeSp.flavor_text_entries)
          const pokemon: PokemonInfo = {
            id,
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
          console.error(
            'pokemonZukanType.ACTION_GET_POKEMONS: ポケモン図鑑取得中にエラーが発生しました'
          )
          console.error(`${err.name}: ${err.message}`)
          const error: ErrorStatus = {
            statusCode: err.name,
            message: err.message,
          }
          dispatch(errorType.ACTION_SET_ERROR, error)
          // ループから抜け出すため
          pokeNo = 900
          this.app.context.error(rootGetters[errorType.GETTER_ERRORS])
        })
    }
  },
  /**
   * ポケモンをバージョンごとに取得
   */
  async [pokemonZukanType.ACTION_GET_POKEMONS_BY_VERSION]({ commit }) {
    const pokemons = this.getters[pokemonZukanType.GETTER_POKEMONS]
    const endNo = Number(sessionStorage.getItem('endNo'))
    let startNo = Number(sessionStorage.getItem('startNo'))
    let pokemon = {}
    while (startNo <= endNo) {
      if (!pokemons[startNo - 1]) return

      pokemon = pokemons[startNo - 1]
      await commit(pokemonZukanType.MUTATION_SET_POKEMONS_BY_VERSION, pokemon)

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
