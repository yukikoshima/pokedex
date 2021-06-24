<template>
  <v-container>
    <h1>Hello</h1>
    <!-- <ul>
      <li v-for="(value, key) in pokemons" :key="key">
        {{ value.id }} : {{ value.name }} : {{ value.genus }} :
        {{ `タイプ : ${value.types}` }} <br />
        {{ value.text }}
        <img v-if="value.image" :src="value.image" />
      </li>
    </ul> -->
    <!-- <v-card-actions>
      <v-btn color="success" @click="infiniteHandler">クリック</v-btn>
    </v-card-actions> -->
    <div infinite-wrapper>
      <!-- set force-use-infinite-wrapper -->
      <infinite-loading @infinite="infiniteHandler">
        <span slot="no-more">もうないよ〜</span>
      </infinite-loading>
    </div>
    <!-- <infinite-loading @infinite="infiniteHandler">
      <span slot="no-more">もうないよ〜</span>
    </infinite-loading> -->
  </v-container>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'

let pokemonApi = 'https://pokeapi.co/api/v2/pokemon/'
let speciesApi = 'https://pokeapi.co/api/v2/pokemon-species/'
export default {
  components: {
    InfiniteLoading,
  },
  data() {
    return {
      pokemons: [],
      next: '',
      speciesUrls: [],
      pokemonUrls: [],
    }
  },
  methods: {
    infiniteHandler($state) {
      const that = this
      const getPokemonData = () => {
        return fetch(pokemonApi).then((res) => res.json())
      }
      const getSpeciesData = () => {
        return fetch(speciesApi).then((res) => res.json())
      }

      const [pokemonData, speciesData] = Promise.all([
        getPokemonData(),
        getSpeciesData(),
      ])
        .then((res) => {
          console.log('第一段階完了')
          return res
        })
        .catch((err) => {
          console.log('エラー')
          console.log(err)
        })

      pokemonApi = pokemonData.next
      speciesApi = speciesData.next
      this.pokemonUrls = pokemonData.results.map((ele) => ele.url)
      this.speciesUrls = speciesData.results.map((ele) => ele.url)

      // const [getP, getS] = await Promise.all([
      //   getPokemon(pokemonApi, this.pokemonUrls),
      //   getSpecies(speciesApi, this.speciesUrls),
      // ])
      //   .then((res) => {
      //     console.log('第二段階完了')
      //     return res
      //   })
      //   .catch((err) => {
      //     console.log('エラー')
      //     console.log(err)
      //   })

      // for (const p of getP) {
      //   for (const s of getS) {
      //     if (p.id === s.id) {
      //       that.pokemons.push({ ...p, ...s })
      //       break
      //     }
      //   }
      // }

      async function getPokemon(api, urls) {
        if (!api) {
          $state.complete()
        }

        const pokemons = []
        for (const url of urls) {
          const usePokemons = await fetch(url)
            .then((result) => {
              return result.json()
            })
            .catch((err) => {
              console.log(err)
            })

          const id = usePokemons.id
          const image =
            usePokemons.sprites.other['official-artwork'].front_default
          const types = usePokemons.types.map((ele) => {
            return ele.type.name
          })
          // タイプが英語で返ってくるので日本語に変換
          const typesJa = that.$convertType.getTypeNameJa(types)

          const pokemon = {
            id: id || '',
            image: image || '',
            types: typesJa || '',
          }
          pokemons.push(pokemon)
        }
        $state.loaded()
        return pokemons
      }

      async function getSpecies(api, urls) {
        if (!api) {
          $state.complete()
        }

        const speciess = []
        for (const url of urls) {
          const useSpecies = await fetch(url)
            .then((result) => {
              return result.json()
            })
            .catch((err) => {
              console.log(err)
            })

          const id = useSpecies.id
          const name = useSpecies.names.find((ele) => {
            if (ele.language.name === 'ja-Hrkt') {
              return ele
            }
            return null
          })
          const genera = useSpecies.genera.find((ele) => {
            if (ele.language.name === 'ja-Hrkt') {
              return ele
            }
            return null
          })
          const text = useSpecies.flavor_text_entries.find((ele) => {
            if (ele.language.name === 'ja-Hrkt') {
              return ele
            }
            return null
          })

          const species = {
            id: id || '',
            name: name ? name.name : '',
            genus: genera ? genera.genus : '',
            text: text ? text.flavor_text : '',
          }
          speciess.push(species)
        }
        $state.loaded()
        return speciess
      }
    },
  },
}
</script>

<style scoped>
li {
  list-style: none;
}
</style>
