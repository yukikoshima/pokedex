/* eslint-disable no-use-before-define */
export class PokemonZukanAdapter {
  static lastNo: number = 898
  constructor(
    public pokemons: PokemonInfo[] = [],
    public pokemonsByVersion: PokemonInfo[] = []
  ) {}
}

type TypeJa = {
  [key: number]: {
    name: string
    link: string
  }
}

export type PokemonInfo = {
  id: number
  img: string
  typesJa: TypeJa[]
  name: string
  genera: string
  flavorText: string
}
