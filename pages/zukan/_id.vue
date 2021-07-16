<template>
  <v-main>
    <v-container app fluid>
      <v-row dense>
        <!-- ポケモンカード -->
        <v-col
          v-for="pokemon in pokemonss"
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
import * as zukanVersionType from '@/store/types/zukanVersionType'

export default {
  components: {
    InfiniteLoading,
  },
  data() {
    return {
      showPokemon: {},
      dialog: false,
    }
  },
  computed: {
    pokemonss() {
      return this.$store.getters[zukanVersionType.GETTER_POKEMONS]
    },
    zukanVer() {
      const zukan = this.$store.getters[zukanVersionType.GETTER_ZUKAN_VERSION]
      const ver = this.$route.params.id
      return zukan[ver]
    },
    startNo() {
      return this.$store.getters[zukanVersionType.GETTER_START_NO]
    },
    endNo() {
      return this.$store.getters[zukanVersionType.GETTER_END_NO]
    },
  },
  created() {
    const zVer = this.zukanVer
    const startNo = zVer.startNo
    const endNo = zVer.endNo

    this.$store.dispatch(zukanVersionType.ACTION_SET_START_NO, startNo)
    this.$store.dispatch(zukanVersionType.ACTION_SET_END_NO, endNo)
  },
  methods: {
    async infiniteHandler($state) {
      console.log(this.startNo)
      console.log(this.endNo)
      if (!this.startNo || !this.endNo) return

      if (this.startNo <= this.endNo) {
        await this.$store.dispatch(zukanVersionType.ACTION_FETCH_POKEMONS, {
          startNo: this.startNo,
          endNo: this.endNo,
        })
        const nextNo = this.startNo + 1
        await this.$store.dispatch(zukanVersionType.ACTION_SET_START_NO, nextNo)
        $state.loaded()
      } else {
        $state.computed()
      }
    },
    watchPokemon(pokemon) {
      this.dialog = !this.dialog
      this.showPokemon = pokemon
    },
  },
}
</script>
