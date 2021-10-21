const toJaName = (array) => {
  const obj = array.find((ele) => {
    if (ele.language.name === 'ja-Hrkt') {
      return ele
    }
    return null
  })

  for (const key in obj) {
    if (key === 'name') {
      return obj.name
    } else if (key === 'genus') {
      return obj.genus
    } else if (key === 'flavor_text') {
      return obj.flavor_text
    }
  }
}

export default (context, inject) => {
  inject('toJaName', toJaName)
}
