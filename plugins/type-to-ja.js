import typeToJapanese from '@/assets/json/type-to-js.json'

const typeToJa = (types) => {
  const typesJa = []
  types.forEach((type, i) => {
    typesJa[i] = typeToJapanese[type]
  })
  return typesJa
}

export default (context, inject) => {
  inject('typeToJa', typeToJa)
}
