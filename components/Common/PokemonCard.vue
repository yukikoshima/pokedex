<template>
  <div>
    <v-row dense>
      <!-- ポケモンカード -->
      <v-col
        v-for="pokemon in pokemons"
        :key="pokemon.pokeId"
        cols="4"
        lg="2"
        md="2"
        sm="2"
        xs="1"
      >
        <v-card outlined tile hover @click="showDialog(pokemon)">
          <img
            v-lazy="pokemon.img"
            alt="pokemon.name"
            class="v-image v-responsive"
          />
        </v-card>
        <p>{{ pokemon.name }}</p>
      </v-col>
    </v-row>
    <ShowDialog ref="showDialog" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ShowDialog from '~/components/Common/ShowDialog.vue'

export default Vue.extend({
  components: {
    ShowDialog,
  },
  props: {
    pokemons: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    showDialog(pokemon) {
      this.$refs.showDialog.show(pokemon, true)
    },
  },
})
</script>
