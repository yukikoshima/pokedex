type TypesJa = {
  [key: string]: {
    name: string
    link: string
  }
}

type Name = {
  language: {
    name: string
    url: string
  }
  name: string
}

type Genera = {
  genus: string
  language: {
    name: string
    url: string
  }
}

type FlavorText = {
  flavor_test: string
  language: {
    name: string
    url: string
  }
  version: {
    name: string
    url: string
  }
}

export type GetAllPokemons = {
  pokeId: number
  img: string
  typesJa: TypesJa[]
  name: Name
  genera: Genera
  flavorText: FlavorText
}
