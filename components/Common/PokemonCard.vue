<template>
  <div>
    <v-row dense>
      <!-- ポケモンカード -->
      <v-col
        v-for="pokemon in pokemonsData"
        :key="pokemon.pokeId"
        cols="4"
        lg="2"
        md="2"
        sm="2"
        xs="1"
      >
        <v-card outlined tile hover @click="showDialog(pokemon)">
          <img
            :src="pokemon.img"
            :alt="pokemon.name"
            loading="lazy"
            class="v-image v-responsive"
          />
        </v-card>
        <p>{{ pokemon.name }}</p>
      </v-col>
    </v-row>
    <infinite-loading :distance="20" @infinite="infiniteHandler">
      <div slot="no-more"></div>
      <div slot="no-results"></div>
    </infinite-loading>
    <ShowDialog ref="showDialog" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import InfiniteLoading from 'vue-infinite-loading'
import ShowDialog from '~/components/Common/ShowDialog.vue'

export default Vue.extend({
  components: {
    InfiniteLoading,
    ShowDialog,
  },
  props: {
    pokemons: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      pokemonsData: [],
      pageIndex: 0,
      perPage: 18,
      items: [],
    }
  },
  methods: {
    showDialog(pokemon) {
      this.$refs.showDialog.show(pokemon, true)
    },
    infiniteHandler($state) {
      setTimeout(() => {
        console.log('infiniteHandler')
        this.pageIndex++
        this.pokemonsData = this.pokemons.slice(
          0,
          this.pageIndex * this.perPage
        )

        if (this.pokemonsData.length !== this.pokemons.length) {
          $state.loaded()
        } else {
          $state.complete()
        }
      }, 1000)
    },
  },
})
</script>
