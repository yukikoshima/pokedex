import {
  T,
  Name,
  Genus,
  FlavorText,
} from '@/store/types/adapters/pokemonZukanAdapter'

const toNameJa = (array: T[]): string => {
  const obj = array.find((v) => {
    if (v.language.name === 'ja-Hrkt') {
      return v
    }
    return null
  })

  if (!obj) {
    return ''
  }

  let ob
  for (const key in obj) {
    if (key === 'name') {
      ob = obj as Name
      return ob.name
    } else if (key === 'genus') {
      ob = obj as Genus
      return ob.genus
    } else if (key === 'flavor_text') {
      ob = obj as FlavorText
      return ob.flavor_text
    }
  }
}

export default (_, inject) => {
  inject('toNameJa', toNameJa)
}
