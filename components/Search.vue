<template>
  <v-text-field
    v-model="searchWord"
    name="pokeSerch"
    label="ポケモン検索"
    placeholder="なまえやずかん番号でさがす"
    hide-details
    outlined
    clearable
    dense
    type="text"
    class="ml-16"
    append-outer-icon="mdi-magnify"
    @click:append-outer="pokeSearch"
    @keypress.enter="pokeSearch"
  >
  </v-text-field>
</template>

<script lang="ts">
import Vue from 'vue'
import * as pokemonZukanType from '~/store/types/pokemonZukanType'

export default Vue.extend({
  data() {
    return {
      searchWord: '',
      pokemons: [],
      errMsg: '',
    }
  },
  methods: {
    pokeSearch() {
      // 前回の検索が残らないように初期化
      this.pokemons = []

      // 空文字、null、空白文字チェック
      if (!this.searchWord || !this.searchWord.match(/\S/g)) {
        this.errMsg = 'ずかん番号やなまえをいれてみてね。'
        this.$nuxt.$emit('showSnackbar', this.errMsg)
        return
      }

      // 数字の時は必ずオブジェクト、文字列の場合はオブジェクトまたは配列
      let pokemon
      // 数字の場合
      if (this.$checkFormat(this.searchWord, 'number')) {
        pokemon = this.$store.getters[pokemonZukanType.GETTER_POKEMON_AT_ID](
          Number(this.searchWord)
        )
        if (pokemon) {
          this.pokemons.push(pokemon)
          this.$nuxt.$emit('openDialog', this.pokemons)

          return
        }
      } else {
        // 文字列の場合
        pokemon = this.$store.getters[
          pokemonZukanType.GETTER_POKEMON_AT_POKEMON_NAME
        ](this.$hiraToKana(this.searchWord))

        if (pokemon.length) {
          // ディープコピー
          // this.pokemons = JSON.parse(JSON.stringify(pokemon))
          this.pokemons = [...pokemon]
          this.$nuxt.$emit('openDialog', this.pokemons)

          return
        }
      }

      this.errMsg = '見つからなかったよ。ほかの条件で探してみよう。'
      this.$nuxt.$emit('showSnackbar', this.errMsg)
    },
  },
})
</script>
