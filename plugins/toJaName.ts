const toJaName = (array) => {
  const obj = array.find((ele) => {
    if (ele.language.name === 'ja-Hrkt') {
      return ele
    }
    return null
  })
  return obj
}

export default (context, inject) => {
  inject('toJaName', toJaName)
}
