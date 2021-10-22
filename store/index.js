import Vuex from 'vuex'

import pokemonZukanStore from './modules/pokemonZukanStore'

const createStore = () => {
  return new Vuex.Store({
    modules: {
      pokemonZukanStore,
    },
  })
}

export default createStore
