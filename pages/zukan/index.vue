<template>
  <v-main>
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
            <img
              v-lazy="pokemon.img"
              alt="pokemon.name"
              class="v-image v-responsive"
            />
          </v-card>
          <p>{{ pokemon.name }}</p>
        </v-col>
      </v-row>

      <!-- ダイアログ -->
      <v-dialog v-model="dialog" scrollable height="490px" max-width="490px">
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
            <v-card elevation="2">
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
            <v-card elevation="2">
              <v-card-title>
                {{ showPokemon.flavorText }}
              </v-card-title>
            </v-card>
          </v-container>
        </v-card>
      </v-dialog>
    </v-container>
  </v-main>
</template>

<script lang="ts">
import Vue from 'vue'
import * as getAllPokemonsType from '@/store/types/getAllPokemonsType'

export default Vue.extend({
  data() {
    return {
      dialog: false,
      showPokemon: {},
    }
  },
  computed: {
    pokemons() {
      return this.$store.getters[getAllPokemonsType.GETTER_POKEMONS]
    },
    pokeNo() {
      return this.$store.getters[getAllPokemonsType.GETTER_POKE_NO]
    },
  },
  methods: {
    watchPokemon(pokemon) {
      this.dialog = !this.dialog
      this.showPokemon = pokemon
    },
  },
})
</script>

<style scoped>
li {
  list-style: none;
}
.v-card-height {
  height: 865px;
  max-height: 925px;
}
.v-image {
  z-index: 0;
  color: rgba(0, 0, 0, 87);
}
.v-responsive {
  position: relative;
  overflow: hidden;
  flex: 1 0 auto;
  max-width: 100%;
  display: flex;
}
</style>
