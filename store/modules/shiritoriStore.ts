// eslint-disable-next-line import/named
import { GetterTree, ActionTree, MutationTree } from 'vuex'
import * as shiritoriType from '~/store/types/shiritoriType'
import { ShiritoriAdapter } from '~/store/types/adapters/shiritoriAdapter'

const state = () => {
  return new ShiritoriAdapter()
}

type shiritori = ReturnType<typeof state>

const getters: GetterTree<shiritori, shiritori> = {
  [shiritoriType.GETTER_TURN_TIMES](state: shiritori) {
    return state.turnTimes
  },
  [shiritoriType.GETTER_MY_TURN_TIMES](state: shiritori) {
    return state.myTurnTimes
  },
}

const mutations: MutationTree<shiritori> = {
  [shiritoriType.MUTATION_SET_TURN_TIMES](state: shiritori, turnTimes: number) {
    state.turnTimes = turnTimes
  },
  [shiritoriType.MUTATION_SET_MY_TURN_TIMES](state: shiritori, myTurnTimes: number) {
    state.myTurnTimes = myTurnTimes
  },
}

const actions = {}

export default {
  state,
  getters,
  mutations,
}
