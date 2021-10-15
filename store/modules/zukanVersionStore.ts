import * as zukanVersionType from '@/store/types/zukanVersionType'

const getDefaultState = () => {
  return {
    pokemons: [],
    version: {
      rgbp: {
        startNo: 1,
        endNo: 151,
      },
      gs: {
        startNo: 152,
        endNo: 251,
      },
      rs: {
        startNo: 252,
        endNo: 386,
      },
      dp: {
        startNo: 387,
        endNo: 493,
      },
      bw: {
        startNo: 494,
        endNo: 649,
      },
      xy: {
        startNo: 650,
        endNo: 721,
      },
      sm: {
        startNo: 722,
        endNo: 807,
      },
      pv: {
        startNo: 808,
        endNo: 809,
      },
      swsh: {
        startNo: 810,
        endNo: 898,
      },
    },
  }
}

const state = () => getDefaultState()

const getters = {
  [zukanVersionType.GETTER_POKEMONS](state) {
    return state.pokemons
  },
  [zukanVersionType.GETTER_ZUKAN_VERSION](state) {
    return state.version
  },
}

const mutations = {
  [zukanVersionType.MUTATION_RESET_STATE](state) {
    Object.assign(state, getDefaultState())
  },
  [zukanVersionType.MUTATION_SET_POKEMONS](state, pokemon) {
    state.pokemons.push(pokemon)
  },
}

const actions = {
  [zukanVersionType.ACTION_RESET_STATE](context) {
    context.commit(zukanVersionType.MUTATION_RESET_STATE)
  },
  [zukanVersionType.ACTION_FETCH_POKEMONS]({ rootState, commit }) {
    const pokemons = rootState.getAllPokemonsStore.pokemons
    const endNo = Number(sessionStorage.getItem('endNo'))
    let startNo = Number(sessionStorage.getItem('startNo'))

    while (startNo <= endNo) {
      if (!pokemons[startNo - 1]) return

      let pokemon = pokemons[startNo - 1]
      commit(zukanVersionType.MUTATION_SET_POKEMONS, pokemon)

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
