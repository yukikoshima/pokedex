import convertTypeNameJa from '@/assets/json/convert-type-name-ja.json'

const convertType = (types) => {
  const typesJa = []
  types.forEach((type, index) => {
    typesJa[index] = convertTypeNameJa[type]
  })
  return typesJa
}

export default (context, inject) => {
  inject('convertType', { getTypeNameJa: convertType })
}
