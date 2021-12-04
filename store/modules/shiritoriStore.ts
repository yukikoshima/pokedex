// eslint-disable-next-line import/named
import { GetterTree, MutationTree } from 'vuex'
import * as shiritoriType from '~/store/types/shiritoriType'
import { ShiritoriAdapter } from '~/store/types/adapters/shiritoriAdapter'

const state = () => {
  return new ShiritoriAdapter()
}

type shiritoriState = ReturnType<typeof state>

const getters: GetterTree<shiritoriState, shiritoriState> = {
  [shiritoriType.GETTER_TURN_TIMES](state: shiritoriState) {
    return state.turnTimes
  },
  [shiritoriType.GETTER_MY_TURN_TIMES](state: shiritoriState) {
    return state.myTurnTimes
  },
}

const mutations: MutationTree<shiritoriState> = {
  [shiritoriType.MUTATION_SET_TURN_TIMES](
    state: shiritoriState,
    turnTimes: number
  ) {
    state.turnTimes = turnTimes
  },
  [shiritoriType.MUTATION_SET_MY_TURN_TIMES](
    state: shiritoriState,
    myTurnTimes: number
  ) {
    state.myTurnTimes = myTurnTimes
  },
}

// const actions = {}

export default {
  state,
  getters,
  mutations,
}
