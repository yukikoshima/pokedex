<template>
  <v-row v-if="pokemons" justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="resetPokemons">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>検索結果</v-toolbar-title>
        </v-toolbar>
        <v-container app fluid>
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
              <v-card outlined tile hover @click="watchPokemon(pokemon)">
                <v-img :src="pokemon.img"></v-img>
              </v-card>
              <p>{{ pokemon.name }}</p>
            </v-col>
          </v-row>

          <!-- ダイアログ -->
          <v-dialog
            v-model="watchDialog"
            scrollable
            height="490px"
            max-width="490px"
          >
            <v-card class="v-card-height">
              <v-img :src="showPokemon.img"></v-img>
              <v-container>
                <v-card elevation="2">
                  <div class="text-center pa-3 text-h5">
                    <p>{{ `No.${showPokemon.pokeId}` }}</p>
                    <p class="text-h5">{{ showPokemon.name }}</p>
                  </div>
                </v-card>
              </v-container>
              <v-container v-if="showPokemon.genera && showPokemon.typesJa">
                <v-card elevation="5">
                  <v-card-title>
                    {{ `分類：${showPokemon.genera}` }}
                  </v-card-title>
                  <v-card-title>
                    タイプ：
                    <div
                      v-for="(type, index) in showPokemon.typesJa"
                      :key="index"
                      class="text-center mr-3"
                    >
                      <v-img
                        :src="require(`@/assets/img/type/${type.link}`)"
                        max-width="40px"
                        class="ma-auto"
                      ></v-img>
                      <span class="text-body-2">{{ type.name }}</span>
                    </div>
                  </v-card-title>
                </v-card>
              </v-container>
              <v-container v-if="showPokemon.flavorText">
                <v-card elevation="5">
                  <v-card-title>
                    {{ showPokemon.flavorText }}
                  </v-card-title>
                </v-card>
              </v-container>
            </v-card>
          </v-dialog>
        </v-container>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      dialog: false,
      watchDialog: false,
      pokemons: [],
      showPokemon: {},
    }
  },
  mounted() {
    /**
     * switchDialogの呼び出し
     */
    this.$nuxt.$on('switchDialog', this.switchDialog)
  },
  methods: {
    switchDialog(pokemons) {
      this.dialog = !this.dialog
      this.pokemons = pokemons
    },
    resetPokemons() {
      this.dialog = !this.dialog
      this.pokemons = []
    },
    watchPokemon(pokemon) {
      this.watchDialog = !this.watchDialog
      this.showPokemon = pokemon
    },
  },
})
</script>
