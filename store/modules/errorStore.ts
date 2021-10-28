// eslint-disable-next-line import/named
import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { ErrorAdapter, ErrorStatus } from '@/store/types/adapters/errorAdapter'
import * as types from '@/store/types/errorType'

const state = () => {
  return new ErrorAdapter()
}

type StateType = ReturnType<typeof state>

const getters: GetterTree<StateType, StateType> = {
  [types.GETTER_ERRORS](state: StateType) {
    return { ...state.errorStatus }
  },
}

const mutations: MutationTree<StateType> = {
  [types.MUTATION_SET_ERROR](state: StateType, payload: ErrorStatus) {
    state.errorStatus = payload
  },
}

const actions: ActionTree<StateType, StateType> = {
  [types.ACTION_SET_ERROR](context, payload: ErrorStatus) {
    context.commit(types.MUTATION_SET_ERROR, payload)
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
