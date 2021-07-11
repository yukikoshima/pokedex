import Vuex from 'vuex'

import getAllPokemonsStore from './modules/getAllPokemonsStore'

const createStore = () => {
  return new Vuex.Store({
    modules: {
      getAllPokemonsStore,
    },
  })
}

export default createStore
