import pokemonType from '@/assets/json/pokemonType.json'
import { Type } from '~/store/types/adapters/pokemonZukanAdapter'

export const toTypeJa = (types: string[]): Type[] => {
  const typesJa: Type[] = []
  types.forEach((type) => {
    typesJa.push(pokemonType[type])
  })
  return typesJa
}

export default (_, inject) => {
  inject('toTypeJa', toTypeJa)
}
