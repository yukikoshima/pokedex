// import * as zukanVersionType from '@/store/types/zukanVersionType'

// const state = () => ({
//   pokemonss: [],
//   startNo: null,
//   endNo: null,
//   version: {
//     rgbp: {
//       startNo: 1,
//       endNo: 151,
//     },
//     gs: {
//       startNo: 152,
//       endNo: 251,
//     },
//     rs: {
//       startNo: 252,
//       endNo: 386,
//     },
//     dp: {
//       startNo: 387,
//       endNo: 493,
//     },
//     bw: {
//       startNo: 494,
//       endNo: 649,
//     },
//     xy: {
//       startNo: 650,
//       endNo: 721,
//     },
//     sm: {
//       startNo: 722,
//       endNo: 807,
//     },
//     pv: {
//       startNo: 808,
//       endNo: 809,
//     },
//     swsh: {
//       startNo: 810,
//       endNo: 898,
//     },
//   },
// })

// const getters = {
//   [zukanVersionType.GETTER_POKEMONS](state) {
//     return state.pokemonss
//   },
//   [zukanVersionType.GETTER_START_NO](state) {
//     return state.startNo
//   },
//   [zukanVersionType.GETTER_END_NO](state) {
//     return state.endNo
//   },
//   [zukanVersionType.GETTER_ZUKAN_VERSION](state) {
//     return state.version
//   },
// }

// const mutations = {
//   [zukanVersionType.MUTATION_SET_POKEMONS](state, pokemon) {
//     state.pokemonss.push(pokemon)
//   },
//   [zukanVersionType.MUTATION_SET_START_NO](state, startNo) {
//     state.startNo = startNo
//   },
//   [zukanVersionType.MUTATION_SET_END_NO](state, endNo) {
//     state.endNo = endNo
//   },
// }

// const actions = {
//   [zukanVersionType.ACTION_SET_START_NO](context, startNo) {
//     context.commit(zukanVersionType.MUTATION_SET_START_NO, startNo)
//   },
//   [zukanVersionType.ACTION_SET_END_NO](context, endNo) {
//     context.commit(zukanVersionType.MUTATION_SET_END_NO, endNo)
//   },
//   async [zukanVersionType.ACTION_FETCH_POKEMONS](context, payload) {
//     const that = this
//     const startNo = payload.startNo
//     const endNo = payload.endNo

//     const [poke, pokeSp] = await Promise.all([
//       that.$fetchData(`https://pokeapi.co/api/v2/pokemon/${startNo}`),
//       that.$fetchData(`https://pokeapi.co/api/v2/pokemon-species/${endNo}`),
//     ])
//       .then((res) => {
//         return res
//       })
//       .catch((err) => {
//         console.log('ポケモン情報取得中にエラーが発生しました')
//         console.log(err)
//       })
//     // id、画像、タイプを取得
//     const pokeId = poke.id
//     const img = poke.sprites.other['official-artwork'].front_default
//     const types = poke.types.map((ele) => {
//       return ele.type.name
//     })
//     // タイプが英語で返ってくるので日本語に変換
//     const typesJa = that.$toTypeJa(types)
//     // id、名前、種類、説明を取得
//     const spId = pokeSp.id
//     // 英語で返ってくるので日本語に変換
//     const name = that.$toJaName(pokeSp.names)
//     const genera = that.$toJaName(pokeSp.genera)
//     const flavorText = that.$toJaName(pokeSp.flavor_text_entries)
//     if (pokeId === spId) {
//       context.commit(zukanVersionType.MUTATION_SET_POKEMONS, {
//         // pokemon: {
//         pokeId,
//         img: img || '',
//         typesJa: typesJa || '',
//         name: name ? name.name : '',
//         genera: genera ? genera.genus : '',
//         flavorText: flavorText ? flavorText.flavor_text : '',
//         // },
//       })
//     }
//   },
// }

// export default {
//   state,
//   getters,
//   mutations,
//   actions,
// }
