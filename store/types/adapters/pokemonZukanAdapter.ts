/* eslint-disable no-use-before-define */
export class PokemonZukanAdapter {
  static lastNo: number = 898
  constructor(
    public allPokemonList: PokemonData[] = [],
    public pokemonByVersionList: PokemonData[] = []
  ) {}
}

type TypesJa = {
  [key: number]: {
    name: string
    link: string
  }
}

type PokemonData = {
  pokeId: number
  img: string
  typesJa: TypesJa[]
  name: string
  genera: string
  flavorText: string
}

export type PokemonProcessingDataResponseType = {
  pokeId: number
  img: string
  typesJa: TypesJa[]
  name: string
  genera: string
  flavorText: string
}
