<template>
  <v-text-field
    v-model="searchWord"
    label="ポケモン検索"
    placeholder="なまえやずかん番号でさがす"
    hide-details
    outlined
    clearable
    dense
    type="text"
    class="ml-16"
    append-outer-icon="mdi-magnify"
    @click:append-outer="searchPoke"
    @keypress.enter="searchPoke"
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
    searchPoke() {
      // 空文字、null、空白文字チェック
      if (!this.searchWord || !this.searchWord.match(/\S/g)) {
        this.errMsg = 'ずかん番号やなまえをいれてみてね。'
        this.$nuxt.$emit('showSnackbar', this.errMsg)

        return
      }
      // 数字の場合
      if (this.$checkFormat(this.searchWord, 'number')) {
        let pokemon = this.$store.getters[
          pokemonZukanType.GETTER_POKEMON_BY_ID
        ](Number(this.searchWord))

        if (pokemon) {
          this.$nuxt.$emit('openDialog', [pokemon])

          return
        }
      } else {
        // 文字列の場合
        const pokemons = this.$store.getters[
          pokemonZukanType.GETTER_POKEMONS_BY_INCLUDES
        ](this.$hiraToKana(this.searchWord))

        if (pokemons.length) {
          this.$nuxt.$emit('openDialog', pokemons)

          return
        }
      }

      this.errMsg = '見つからなかったよ。ほかの条件で探してみよう。'
      this.$nuxt.$emit('showSnackbar', this.errMsg)
    },
  },
})
</script>
