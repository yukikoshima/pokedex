// eslint-disable-next-line import/named
import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { ErrorAdapter, ErrorStatus } from '@/store/types/adapters/errorAdapter'
import * as types from '@/store/types/errorType'

const state = () => {
  return new ErrorAdapter()
}

type errorState = ReturnType<typeof state>

const getters: GetterTree<errorState, errorState> = {
  [types.GETTER_ERRORS](state: errorState) {
    return { ...state.errorStatus }
  },
}

const mutations: MutationTree<errorState> = {
  [types.MUTATION_SET_ERROR](state: errorState, errorStatus: ErrorStatus) {
    state.errorStatus = errorStatus
  },
}

const actions: ActionTree<errorState, errorState> = {
  [types.ACTION_SET_ERROR](context, errorStatus: ErrorStatus) {
    context.commit(types.MUTATION_SET_ERROR, errorStatus)
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
