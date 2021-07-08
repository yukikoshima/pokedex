<template>
  <v-main>
    <v-container app fluid>
      <v-row dense>
        <!-- ポケモンカード -->
        <v-col
          v-for="(pokemon, key) in pokemons"
          :key="key"
          cols="4"
          lg="2"
          md="2"
          sm="2"
          xs="1"
        >
          <v-card outlined tile hover @click="watchPokemon(pokemon)">
            <v-img :src="pokemon.pokemon.img"></v-img>
          </v-card>
          <p>{{ pokemon.pokemon.name }}</p>
        </v-col>
      </v-row>

      <!-- ダイアログ -->
      <v-dialog v-model="dialog" scrollable height="490px" max-width="490px">
        <v-card class="v-card-height">
          <v-img :src="showPokemon.img"></v-img>
          <v-container>
            <v-card elevation="5">
              <div class="text-center pa-3">
                <p>{{ `No.${showPokemon.pokeId}` }}</p>
                {{ showPokemon.name }}
                <p></p>
              </div>
            </v-card>
          </v-container>
          <v-container v-if="showPokemon.genera && showPokemon.typesJa">
            <v-card elevation="5">
              <v-card-title>
                {{ `分類：${showPokemon.genera}` }}
              </v-card-title>
              <v-card-title>
                {{ `タイプ：${showPokemon.typesJa}` }}
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

      <!-- ローディング -->
      <div infinite-wrapper>
        <infinite-loading
          force-use-infinite-wrapper
          @infinite="infiniteHandler"
        >
          <!-- 結果が存在しない場合下記が表示される -->
          <span slot="no-results">-----検索結果はありません-----</span>
          <!-- ステータスがcompleteに更新されると下記が表示される -->
          <span slot="no-more">-----検索結果は以上です-----</span>
        </infinite-loading>
      </div>
    </v-container>
  </v-main>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import * as rootTypes from '@/store/types/rootType'

export default {
  components: {
    InfiniteLoading,
  },
  data() {
    return {
      pokeTotalNumber: 898,
      dialog: false,
      showPokemon: {},
    }
  },
  computed: {
    pokemons() {
      return this.$store.getters.getPokemons
    },
    pokeNo() {
      return this.$store.getters.getPokeNo
    },
  },
  methods: {
    async infiniteHandler($state) {
      const pokeNo = this.$store.getters.getPokeNo
      console.log(pokeNo)
      if (pokeNo <= this.pokeTotalNumber) {
        await this.$store.dispatch('fetchPokemons', pokeNo)
        await this.$store.dispatch('setPokemonNoAction')
        $state.loaded()
      } else {
        $state.complete()
      }
    },
    watchPokemon(pokemon) {
      this.dialog = !this.dialog
      this.showPokemon = pokemon.pokemon
    },
  },
}
</script>

<style scoped>
li {
  list-style: none;
}
.v-card-height {
  height: 865px;
  max-height: 925px;
}
</style>
