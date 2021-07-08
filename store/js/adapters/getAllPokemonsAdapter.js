export class Pokemon {
  pokeId = null // ポケモンのID
  img = '' // ポケモンの画像
  typesJa = [] // ポケモンのタイプ
  name = '' // ポケモンの名前
  genera = '' // ポケモンの種類
}
export class GetAllPokemons {
  test = 1
  constructor() {
    this.pokemons = []
    this.pokemon = new Pokemon()
    this.pokeNo = 1
  }
}
