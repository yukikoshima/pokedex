const hiraToKana = (str: string): string => {
  return str.replace(/[\u3042-\u3093]/g, (m) =>
    String.fromCharCode(m.charCodeAt(0) + 96)
  )
}

export default (_, inject) => {
  inject('hiraToKana', hiraToKana)
}
