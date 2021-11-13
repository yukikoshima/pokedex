<template>
  <v-dialog v-model="isDialog" scrollable height="490px" max-width="490px">
    <v-card class="v-card-height">
      <img :src="pokemon.img" :alt="pokemon.name" />
      <v-container>
        <div class="text-center text-h5">
          <p>{{ `No.${pokemon.pokeId}` }}</p>
          <p class="text-h5">{{ pokemon.name }}</p>
        </div>
      </v-container>
      <v-container v-if="pokemon.genera && pokemon.typesJa">
        <v-card-title>
          {{ `分類：${pokemon.genera}` }}
        </v-card-title>
        <v-card-title>
          タイプ：
          <div
            v-for="(type, index) in pokemon.typesJa"
            :key="index"
            class="text-center mr-3"
          >
            <v-img
              :src="require(`@/assets/img/type/${type.link}`)"
              max-width="40px"
              class="ma-auto"
              :alt="pokemon.name"
            ></v-img>
            <span class="text-body-2">{{ type.name }}</span>
          </div>
        </v-card-title>
      </v-container>
      <v-container v-if="pokemon.flavorText">
        <v-card-title>
          {{ pokemon.flavorText }}
        </v-card-title>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      isDialog: false,
      pokemon: {},
    }
  },
  methods: {
    show(pokemon, isDialog) {
      this.pokemon = pokemon
      this.isDialog = isDialog
    },
  },
})
</script>
