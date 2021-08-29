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
            <v-img :src="pokemon.img"></v-img>
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

      <!-- ローディング -->
      <div infinite-wrapper>
        <infinite-loading
          force-use-infinite-wrapper
          @infinite="infiniteHandler1"
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
import * as getAllPokemonsType from '@/store/types/getAllPokemonsType'

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
      return this.$store.getters[getAllPokemonsType.GETTER_POKEMONS]
    },
    pokeNo() {
      return this.$store.getters[getAllPokemonsType.GETTER_POKE_NO]
    },
  },
  methods: {
    async infiniteHandler1($state) {
      const pokeNo = this.pokeNo
      if (pokeNo <= this.pokeTotalNumber) {
        await this.$store.dispatch(
          getAllPokemonsType.ACTION_FETCH_POKEMONS,
          pokeNo
        )
        await this.$store.dispatch(getAllPokemonsType.ACTION_SET_POKE_NO)
        $state.loaded()
      } else {
        $state.complete()
      }
    },
    watchPokemon(pokemon) {
      this.dialog = !this.dialog
      this.showPokemon = pokemon
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
