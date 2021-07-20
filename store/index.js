import Vuex from 'vuex'

import getAllPokemonsStore from './modules/getAllPokemonsStore'
import zukanVersionStore from './modules/zukanVersionStore'

const createStore = () => {
  return new Vuex.Store({
    modules: {
      getAllPokemonsStore,
      zukanVersionStore,
    },
  })
}

export default createStore
