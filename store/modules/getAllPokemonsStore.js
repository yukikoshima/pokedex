import * as getAllPokemons from '@/store/js/getAllPokemons'

export const state = () => ({
  pokemons: [],
  pokemon: {
    pokeId: null,
    img: '',
    typesJa: [],
    name: '',
    genera: '',
    flavorText: '',
  },
  pokeNo: 1,
})

export const getters = {
  getPokemons(state) {
    return state.pokemons
  },
  getPokeNo(state) {
    return state.pokeNo
  },
}

export const mutations = {
  setPokemons(state) {
    state.pokemons.push(state.pokemon)
  },
  setPokemon(state, pokemon) {
    state.pokemon = pokemon
  },
  setPokemonNo(state) {
    state.pokeNo += 1
  },
}

export const actions = {
  setPokemonsAction(context) {
    context.commit('setPokemons')
  },
  setPokemonAction(context, pokemon) {
    context.commit('setPokemon', pokemon)
  },
  setPokemonNoAction(context) {
    context.commit('setPokemonNo')
  },
  async fetchPokemons(context, pokeNo) {
    const that = this
    const [poke, pokeSp] = await Promise.all([
      that.$fetchData(`https://pokeapi.co/api/v2/pokemon/${pokeNo}`),
      that.$fetchData(`https://pokeapi.co/api/v2/pokemon-species/${pokeNo}`),
    ])
      .then((res) => {
        return res
      })
      .catch((err) => {
        console.log('ポケモン情報取得中にエラーが発生しました')
        console.log(err)
      })

    // ポケモンid、画像、ポケモンのタイプを取得
    const pokeId = poke.id
    const img = poke.sprites.other['official-artwork'].front_default
    const types = poke.types.map((ele) => {
      return ele.type.name
    })
    // タイプが英語で返ってくるので日本語に変換
    const typesJa = that.$typeToJa(types)

    // ポケモンid、名前、何ポケモンか、ポケモンの説明を取得
    const spId = pokeSp.id
    // タイプが英語で返ってくるので日本語に変換
    const name = this.$toJaName(pokeSp.names)
    const genera = this.$toJaName(pokeSp.genera)
    const flavorText = this.$toJaName(pokeSp.flavor_text_entries)

    if (pokeId === spId) {
      context.dispatch('setPokemonAction', {
        pokemon: {
          pokeId,
          img: img || '',
          typesJa: typesJa || '',
          name: name ? name.name : '',
          genera: genera ? genera.genus : '',
          flavorText: flavorText ? flavorText.flavor_text : '',
        },
      })
      context.dispatch('setPokemonsAction')
    }
  },
}
