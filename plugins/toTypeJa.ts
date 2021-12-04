import toTypeJapanese from '@/assets/json/toTypeJa.json'
import { TypeJa } from '~/store/types/adapters/pokemonZukanAdapter'

export const toTypeJa = (types: string[]): TypeJa[] => {
  const typesJa: TypeJa[] = []
  types.forEach((type) => {
    typesJa.push(toTypeJapanese[type])
  })
  return typesJa
}

export default (_, inject) => {
  inject('toTypeJa', toTypeJa)
}
