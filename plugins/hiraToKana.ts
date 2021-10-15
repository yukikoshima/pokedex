const hiraToKana = (str) => {
  return str.replace(/[\u3042-\u3093]/g, (m) =>
    String.fromCharCode(m.charCodeAt(0) + 96)
  )
}

export default (context, inject) => {
  inject('hiraToKana', hiraToKana)
}
