<template>
  <div>
    <!-- <h1>Hello</h1>
    <ul>
      <li v-for="(value, key) in pokemons" :key="key">
        <h1>{{ value.pokeId }}</h1>
        {{ value.name }} : {{ value.genus }} {{ `タイプ : ${value.typesJa}` }}
        <br />
        {{ value.flavorText }}
        <img v-if="value.img" :src="value.img" />
      </li>
    </ul>
    <infinite-loading @infinite="infiniteHandler">
      <span slot="no-more">もうないよ〜</span>
    </infinite-loading> -->
  </div>
</template>

<script>
// import InfiniteLoading from 'vue-infinite-loading'

export default {
  components: {
    // InfiniteLoading,
  },
  data() {
    return {
      pokeTotalNumber: 20,
      pokemons: [],
      pokeNo: 1,
    }
  },
  methods: {
    async infiniteHandler($state) {
      console.log(this.$vuetify)
      const that = this
      if (that.pokeNo <= that.pokeTotalNumber) {
        const [poke, pokeSp] = await Promise.all([
          that.$fetchData(`https://pokeapi.co/api/v2/pokemon/${that.pokeNo}`),
          that.$fetchData(
            `https://pokeapi.co/api/v2/pokemon-species/${that.pokeNo}`
          ),
        ])
          .then((res) => {
            return res
          })
          .catch((err) => {
            console.log('エラー')
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
          that.pokemons.push({
            pokeId,
            img: img || '',
            typesJa: typesJa || '',
            name: name ? name.name : '',
            genera: genera ? genera.genus : '',
            flavorText: flavorText ? flavorText.flavor_text : '',
          })
        }
        that.pokeNo++
        $state.loaded()
      } else {
        $state.complete()
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
