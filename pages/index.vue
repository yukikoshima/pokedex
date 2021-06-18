<template>
  <v-container>
    <ul>
      <li v-for="(value, key) in pokemons" :key="key">
        {{ value.name }}
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

let api1 = 'https://pokeapi.co/api/v2/pokemon-species/'
// let api2 = 'https://pokeapi.co/api/v2/pokemon/'

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
      const getSpecies = () => {
        return new Promise((resolve) => {
          fetch(api1).then((res) => {
            return resolve(res.json())
          })
        })
      }
      // const getPokemon = () => {
      //   return new Promise((resolve) => {
      //     fetch(api2).then((res) => {
      //       return resolve(res.json())
      //     })
      //   })
      // }

      getSpecies()
        .then(async (species) => {
          api1 = species.next
          this.urls = species.results.map((ele) => ele.url)

          for (const url of this.urls) {
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
              name: name.name,
              genus: genera.genus,
              text: text.flavor_text,
            }
            this.pokemons.push(pokemon)
          }
          this.urls = []
          $state.loaded()
        })
        .catch((err) => {
          console.log('読み込み完了')
          $state.complete()
          console.error(err)
        })
    },
  },
}
</script>

<style scoped>
li {
  list-style: none;
}
</style>
