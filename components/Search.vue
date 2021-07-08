<template>
  <v-text-field
    v-model="search"
    name="pokeSerch"
    label="ポケモン検索"
    placeholder="No.やポケモンの名前で検索！！"
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

<script>
export default {
  data() {
    return {
      search: '',
    }
  },
  methods: {
    pokeSearch() {
      if (!this.search) return

      console.log('検索')
    },
  },
}
</script>
