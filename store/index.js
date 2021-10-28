import Vuex from 'vuex'

import pokemonZukanStore from './modules/pokemonZukanStore'
import errorStore from './modules/errorStore'

const createStore = () => {
  return new Vuex.Store({
    modules: {
      pokemonZukanStore,
      errorStore
    },
  })
}

export default createStore
