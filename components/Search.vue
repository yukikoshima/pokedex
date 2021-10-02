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
import * as getAllPokemonsType from '@/store/types/getAllPokemonsType'

export default Vue.extend({
  data() {
    return {
      searchWord: '',
      pokemons: [],
      errMsg: 'ずかん番号やなまえをいれてみてね。',
    }
  },
  methods: {
    pokeSearch() {
      // 空文字、nullチェック
      if (!this.searchWord) {
        this.$nuxt.$emit('switchSnackbar', this.errMsg)
        return
      }

      let pokemon
      // 数字の場合
      if (this.$checkFormat(this.searchWord, 'number')) {
        pokemon = this.$store.getters[getAllPokemonsType.GETTER_POKEMON_AT_ID](
          Number(this.searchWord)
        )

        if (pokemon) {
          this.pokemons.push(pokemon)
          this.$nuxt.$emit('switchDialog', this.pokemons)
        } else {
          this.errMsg = '見つからなかったよ。ほかの条件で探してみよう。'
          this.$nuxt.$emit('switchSnackbar', this.errMsg)
        }
      } else {
        // 文字列の場合
        pokemon = this.$store.getters[
          getAllPokemonsType.GETTER_POKEMON_AT_POKEMON_NAME
        ](this.$hiraToKana(this.searchWord))

        if (pokemon.length) {
          // ディープコピー
          // this.pokemons = JSON.parse(JSON.stringify(pokemon))
          this.pokemons = [...pokemon]
          this.$nuxt.$emit('switchDialog', this.pokemons)
        } else {
          this.errMsg = '見つからなかったよ。ほかの条件で探してみよう。'
          this.$nuxt.$emit('switchSnackbar', this.errMsg)
        }
      }
    },
  },
})
</script>
