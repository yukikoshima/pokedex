import toTypeJapanese from '@/assets/json/toTypeJa.json'

const toTypeJa = (types) => {
  const typesJa = []
  types.forEach((type, i) => {
    typesJa[i] = toTypeJapanese[type]
  })
  return typesJa
}

export default (context, inject) => {
  inject('toTypeJa', toTypeJa)
}
