<template>
  <v-container>
    <ul>
      <li v-for="(value, key) in pokemons" :key="key">
        {{ value.name }} : {{ value.text }}
      </li>
    </ul>
    <!-- <v-card-actions>
      <v-btn color="success" @click="infiniteHandler">クリック</v-btn>
    </v-card-actions> -->
    <infinite-loading @infinite="infiniteHandler">
      <span slot="no-more">もうないよ〜</span>
    </infinite-loading>
  </v-container>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'

let speciesApi = 'https://pokeapi.co/api/v2/pokemon-species/'
let pokemonApi = 'https://pokeapi.co/api/v2/pokemon/'

export default {
  components: {
    InfiniteLoading,
  },
  data() {
    return {
      pokemons: [],
      next: '',
      urls: [],
    }
  },
  methods: {
    infiniteHandler($state) {
      const getSpecies = async () => {
        return await fetch(speciesApi).then((res) => res.json())
      }
      const getPokemon = async () => {
        return await fetch(pokemonApi).then((res) => res.json())
      }

      Promise.all([getSpecies(), getPokemon()]).then((res) => {
        Promise.all([papapa(res[0])]).then((res) => {
          console.log('成功')
        })
      })
      const that = this
      async function papapa(species) {
        speciesApi = species.next
        that.urls = species.results.map((ele) => ele.url)

        if (!speciesApi) {
          $state.complete()
        }

        for (const url of that.urls) {
          const usePokemon = await fetch(url)
            .then((result) => {
              return result.json()
            })
            .catch((err) => {
              console.log(err)
            })

          const name = usePokemon.names.find((ele) => {
            if (ele.language.name === 'ja-Hrkt') {
              return ele
            }
            return null
          })
          const genera = usePokemon.genera.find((ele) => {
            if (ele.language.name === 'ja-Hrkt') {
              return ele
            }
            return null
          })
          const text = usePokemon.flavor_text_entries.find((ele) => {
            if (ele.language.name === 'ja-Hrkt') {
              return ele
            }
            return null
          })

          const pokemon = {
            name: name ? name.name : null,
            genus: genera ? genera.genus : null,
            text: text ? text.flavor_text : null,
          }
          that.pokemons.push(pokemon)
        }
        that.urls = []
        $state.loaded()
      }
      // function wewewe(pokemon) {
      //   console.log('yuki')
      //   // console.log(pokemon)
      // }
    },
  },
}
</script>

<style scoped>
li {
  list-style: none;
}
</style>
