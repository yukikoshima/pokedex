import Vuex from 'vuex'

import pokemonZukanStore from './modules/pokemonZukanStore'
import shiritoriStore from './modules/shiritoriStore'
import errorStore from './modules/errorStore'

const createStore = () => {
  return new Vuex.Store({
    modules: {
      pokemonZukanStore,
      shiritoriStore,
      errorStore
    },
  })
}

export default createStore
