export class GetAllPokemonsAdapter {
  static lastNo: number = 898
  // eslint-disable-next-line no-use-before-define
  constructor(public getAllPokemonsList: GetAllPokemons[] = []) {}
}

type TypesJa = {
  [key: number]: {
    name: string
    link: string
  }
}

type GetAllPokemons = {
  pokeId: number
  img: string
  typesJa: TypesJa[]
  name: string
  genera: string
  flavorText: string
}

export type PokemonProcessingResponseType = {
  pokeId: number
  img: string
  typesJa: TypesJa[]
  name: string
  genera: string
  flavorText: string
}
