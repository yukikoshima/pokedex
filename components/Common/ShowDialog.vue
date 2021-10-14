<template>
  <v-dialog v-model="isDisplay" scrollable height="490px" max-width="490px">
    <v-card class="v-card-height">
      <v-img :src="pokemon.img"></v-img>
      <v-container>
        <v-card elevation="2">
          <div class="text-center pa-3 text-h5">
            <p>{{ `No.${pokemon.pokeId}` }}</p>
            <p class="text-h5">{{ pokemon.name }}</p>
          </div>
        </v-card>
      </v-container>
      <v-container v-if="pokemon.genera && pokemon.typesJa">
        <v-card elevation="2">
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
              ></v-img>
              <span class="text-body-2">{{ type.name }}</span>
            </div>
          </v-card-title>
        </v-card>
      </v-container>
      <v-container v-if="pokemon.flavorText">
        <v-card elevation="2">
          <v-card-title>
            {{ pokemon.flavorText }}
          </v-card-title>
        </v-card>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      isDisplay: false,
      pokemon: {},
    }
  },
  methods: {
    open(pokemon, isDisplay) {
      this.pokemon = pokemon
      this.isDisplay = isDisplay
    },
  },
})
</script>

<style scoped>
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
