import { Type } from '@/store/types/adapters/pokemonZukanAdapter'

declare module 'vuex/types/index' {
  interface Store<S> {
    $toTypeJa(types: string[]): Type[]
  }
}
