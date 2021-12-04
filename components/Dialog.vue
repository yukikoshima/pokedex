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
          <v-row dense>
            <!-- ポケモンカード -->
            <v-col
              v-for="pokemon in pokemons"
              :key="pokemon.id"
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
        </v-container>
      </v-card>
    </v-dialog>
    <ShowDialog ref="showDialog" />
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import ShowDialog from '~/components/Common/ShowDialog.vue'

export default Vue.extend({
  components: {
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
      this.pokemons = pokemons
      this.isDialog = true
    },
    closeDialog() {
      this.isDialog = false
    },
    showDialog(pokemon) {
      this.$refs.showDialog.show(pokemon)
    },
  },
})
</script>
