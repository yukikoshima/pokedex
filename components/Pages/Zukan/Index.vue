<template>
  <v-main>
    <v-container app fluid>
      <PokemonCard :pokemons="pokemons" />
    </v-container>
  </v-main>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import PokemonCard from '~/components/Common/PokemonCard.vue'
import * as getAllPokemonsType from '@/store/types/getAllPokemonsType'

export default Vue.extend({
  components: {
    PokemonCard,
  },
  computed: {
    // pokemons() {
    //   return this.$store.getters[getAllPokemonsType.GETTER_POKEMONS]
    // },
    ...mapGetters({ pokemons: getAllPokemonsType.GETTER_POKEMONS }),
  },
})
</script>
