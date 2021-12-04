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
import * as pokemonZukanType from '~/store/types/pokemonZukanType'

export default Vue.extend({
  components: {
    PokemonCard,
  },
  computed: {
    ...mapGetters({ pokemons: pokemonZukanType.GETTER_POKEMONS }),
  },
})
</script>
