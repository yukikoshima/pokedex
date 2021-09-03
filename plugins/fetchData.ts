const fetchData = async (url: string) => {
  const res = await fetch(url)
  const fetchData = await res.json()

  return fetchData
}

export default (context, inject) => {
  inject('fetchData', fetchData)
}
