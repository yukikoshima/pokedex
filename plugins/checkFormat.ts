// import { Plugin } from '@nuxt/types'

const checkFormat = (str: string, formatName: string): boolean => {
  switch (formatName) {
    case 'alphabet':
      // 半角英字（大文字・小文字）
      return str.match(/^[a-zA-Z]+$/) ? true : false
    case 'upper-alphabet':
      // 半角英字（大文字のみ）
      return str.match(/^[A-Z]+$/) ? true : false
    case 'lower-alphabet':
      // 半角英字（小文字のみ）
      return str.match(/^[a-z]+$/) ? true : false
    case 'alphabet-number':
      // 半角英数字（大文字・小文字）
      return str.match(/^[0-9a-zA-Z]+$/) ? true : false
    case 'number':
      // 半角数字
      return str.match(/^[0-9]+$/) ? true : false
    case 'integer':
      // 整数値
      return str.match(/^[+|-]?[0-9]+$/) ? true : false
    case 'float-only':
      // 小数点
      return str.match(/^[-|+]?[0-9]+\.[0-9]+$/) ? true : false
    case 'float':
      // 整数値か小数値
      return str.match(/^[-|+]?[0-9]+\.[0-9]+$|^[+|-]?[0-9]+$/) ? true : false
    default:
      return false
  }
}

export default (_, inject) => {
  inject('checkFormat', checkFormat)
}

// export const plugin: Plugin = (context, inject) => {
//   inject('checkFormat', checkFormat)
// }
