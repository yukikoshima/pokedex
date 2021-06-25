<template>
  <v-container>
    <h1>Hello</h1>
    <ul>
      <li v-for="(value, key) in pokemons" :key="key">
        <h1>{{ value.pokeId }}</h1>
        {{ value.name }} : {{ value.genus }} {{ `タイプ : ${value.typesJa}` }}
        <br />
        {{ value.text }}
        <img v-if="value.image" :src="value.image" />
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

let pokeApi = 'https://pokeapi.co/api/v2/pokemon/'
let pokeSpApi = 'https://pokeapi.co/api/v2/pokemon-species/'
export default {
  components: {
    InfiniteLoading,
  },
  data() {
    return {
      pokemonsNumber: 898,
      pokemons: [],
      next: '',
      speciesUrls: [],
      pokemonUrls: [],
    }
  },
  methods: {
    async infiniteHandler($state) {
      const that = this
      const fetchPokeData = async () => {
        return await fetch(pokeApi).then((res) => res.json())
      }
      const fetchPokeSpData = async () => {
        return await fetch(pokeSpApi).then((res) => res.json())
      }

      const [pokeData, pokeSpData] = await Promise.all([
        fetchPokeData(),
        fetchPokeSpData(),
      ])
        .then((res) => {
          return res
        })
        .catch((err) => {
          console.log('エラー')
          console.log(err)
        })

      if (!pokeData && !pokeSpData) return
      getPokeAndSp(pokeData, pokeSpData)

      async function getPokeAndSp(pokeData, pokeSpData) {
        pokeApi = pokeData.next
        pokeSpApi = pokeSpData.next

        if (!pokeApi && !pokeSpApi) {
          $state.complete()
        }
        const urls = [
          pokeData.results.map((ele) => ele.url),
          pokeSpData.results.map((ele) => ele.url),
        ]

        let pokeId = ''
        let image = ''
        let typesJa = []
        let spId = ''
        let name = {}
        let genera = {}
        let text = {}
        let pokeArray = []
        let spArray = []
        for (const url of urls[0]) {
          const res = await fetch(url)
          const poke = await res.json()

          pokeId = poke.id
          image = poke.sprites.other['official-artwork'].front_default
          const types = poke.types.map((ele) => {
            return ele.type.name
          })
          // タイプが英語で返ってくるので日本語に変換
          typesJa = that.$typeToJa(types)

          pokeArray.push({
            pokeId: pokeId || '',
            image,
            typesJa,
          })
        }
        for (const url of urls[1]) {
          const res = await fetch(url)
          const sp = await res.json()
          spId = sp.id
          name = sp.names.find((ele) => {
            if (ele.language.name === 'ja-Hrkt') {
              return ele
            }
            return null
          })
          genera = sp.genera.find((ele) => {
            if (ele.language.name === 'ja-Hrkt') {
              return ele
            }
            return null
          })
          text = sp.flavor_text_entries.find((ele) => {
            if (ele.language.name === 'ja-Hrkt') {
              return ele
            }
            return null
          })
          spArray.push({
            spId: spId || '',
            name: name ? name.name : '',
            genera: genera ? genera.genus : '',
            text: text ? text.flavor_text : '',
          })
        }
        for (const poke of pokeArray) {
          for (const sp of spArray) {
            if (poke.pokeId === sp.spId) {
              that.pokemons.push({ ...poke, ...sp })
              break
            }
          }
        }
        $state.loaded()
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
