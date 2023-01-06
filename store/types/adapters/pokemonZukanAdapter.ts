/* eslint-disable no-use-before-define */
export class PokemonZukanAdapter {
  static lastNo: number = 898
  constructor(
    public pokemons: PokemonInfo[] = [],
    public pokemonsByVersion: PokemonInfo[] = []
  ) {}
}

export type Type = {
  [key: number]: {
    name: string
    link: string
  }
}

export type PokemonInfo = {
  id: number
  img: string
  typesJa: Type[]
  name: string
  genera: string
  flavorText: string
}

export type Name = {
  language: {
    name: string
    url: string
  }
  name: string
}

export type Genus = {
  language: {
    name: string
    url: string
  }
  genus: string
}

export type FlavorText = {
  language: {
    name: string
    url: string
  }
  version: {
    name: string
    url: string
  }
  flavor_text: string
}

export type T = Name | Genus | FlavorText
