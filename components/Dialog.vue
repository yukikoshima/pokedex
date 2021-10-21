<template>
  <v-row justify="center">
    <v-dialog
      v-model="isDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>検索結果</v-toolbar-title>
        </v-toolbar>
        <v-container app fluid>
          <PokemonCard :pokemons="pokemons" />
          <ShowDialog ref="showDialog" />
        </v-container>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import PokemonCard from '~/components/Common/PokemonCard.vue'
import ShowDialog from '~/components/Common/ShowDialog.vue'

export default Vue.extend({
  components: {
    PokemonCard,
    ShowDialog,
  },
  data() {
    return {
      isDialog: false,
      pokemons: [],
    }
  },
  mounted() {
    this.$nuxt.$on('openDialog', this.openDialog)
  },
  methods: {
    openDialog(pokemons) {
      this.isDialog = true
      this.pokemons = pokemons
    },
    closeDialog() {
      this.isDialog = false
    },
  },
})
</script>
