import { T } from '@/store/types/adapters/pokemonZukanAdapter'

declare module 'vuex/types/index' {
  interface Store<S> {
    $toNameJa(types: T[]): string
  }
}
