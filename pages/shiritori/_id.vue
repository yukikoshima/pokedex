<template>
  <v-main>
    <v-container app fluid>
      <header id="header" class="text-center">
        <h1 class="poke_font">ポケモンしりとり</h1>
      </header>
      <main class="pt-10">
        <v-row justify="center">
          <v-col cols="12" md="6" lg="6">
            <v-text-field
              v-model="searchWord"
              label="だすポケモンをきめよう！！"
              hide-details
              clearable
              dense
              type="text"
              @keypress.enter="myTurn"
            >
              <template #append>
                <v-btn color="primary" outlined @click="myTurn"
                  >君に決めた！</v-btn
                >
              </template>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" md="3" lg="3">
            <div class="text-center">
              <v-btn color="green" outlined @click="reStart">はじめから</v-btn>
              <v-btn color="red" outlined @click="giveUp">こうさんする</v-btn>
            </div>
          </v-col>
        </v-row>
      </main>
      <footer>
        <v-row justify="center">
          <v-col cols="12" lg="6">
            <table width="100%">
              <tr v-for="(name, i) in savePokemons.slice().reverse()" :key="i">
                <td>{{ i % 2 == 0 ? 'CPU' : 'あなた' }}</td>
                <td>{{ name }}</td>
              </tr>
            </table>
          </v-col>
        </v-row>
      </footer>
    </v-container>
  </v-main>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import * as shiritoriType from '~/store/types/shiritoriType'
import * as pokemonZukanType from '~/store/types/pokemonZukanType'
import ErrorSnackbar from '~/components/Common/ErrorSnackbar.vue'

export default Vue.extend({
  components: { ErrorSnackbar },
  data() {
    return {
      id: 0, // cpu検索用
      searchWord: '',
      prevPokemon: '',
      savePokemons: [], // しりとりで出たポケモンを保存
      enemyLavel: '', // 敵のレベル
      myTurnTimes: 0, // 自分のターンの回数
      enemyTurnTimes: 0, // 敵のターンの回数
      enemyTurnMax: 0, // 敵の強さによってターンの上限を決める
      errMsg: '',
    }
  },
  computed: {
    ...mapGetters({
      getPokemonById: pokemonZukanType.GETTER_POKEMON_BY_ID,
      getPokemonByName: pokemonZukanType.GETTER_POKEMON_BY_POKEMON_NAME,
      getPokemonsByTest: pokemonZukanType.GETTER_POKEMONS_BY_TEST,
    }),
  },
  created() {
    this.enemyLavel = this.$route.params.id
    if (this.enemyLavel === 'veryEasy') {
      this.enemyTurnMax = 10
    } else if (this.enemyLavel === 'easy') {
      this.enemyTurnMax = 40
    } else if (this.enemyLavel === 'normal') {
      this.enemyTurnMax = 90
    } else if (this.enemyLavel === 'veryHard') {
      this.enemyTurnMax = 200
    }
  },
  mounted() {
    setTimeout(() => {
      // CPUの1ターン目のみ処理
      this.turnFirstEnemy()
    }, 0)
  },
  methods: {
    /**
     * ポケモン番号1〜898をランダムで取得
     */
    getId() {
      return Math.floor(Math.random() * 898) + 1
    },
    turnFirstEnemy() {
      while (true) {
        this.id = this.getId()
        let pokemon = this.getPokemonById(this.id)
        if (pokemon.name.endsWith('ン')) continue // 末尾が「ン」の場合は再取得

        this.savePokemons.push(pokemon.name)
        this.prevPokemon = pokemon.name

        break
      }
      this.enemyTurnTimes += 1
    },
    /**
     * cpu
     * ランダムでポケモンを取得する
     */
    enemyTurn() {
      // this.prevPokemon = this.$processingIfNeeded(this.prevPokemon) // 末尾が「長音」や「すてがな」なら加工する
      // let pokemons = this.getPokemonsByTest(this.prevPokemon)

      // if (pokemons.length) {
      //   let pokemon = pokemons[Math.floor(Math.random() * pokemons.length)]
      // }
      // this.$store.commit(
      //   shiritoriType.MUTATION_SET_TURN_TIMES,
      //   this.myTurnTimes + this.enemyTurnTimes
      // )
      // this.$store.commit(
      //   shiritoriType.MUTATION_SET_MY_TURN_TIMES,
      //   this.myTurnTimes
      // )
      // this.$router.push('/shiritori/win')

      this.prevPokemon = this.$processingIfNeeded(this.prevPokemon) // 末尾が「長音」や「すてがな」なら加工する
      let pokemon
      while (true) {
        this.id = this.getId()
        pokemon = this.getPokemonById(this.id)

        if (this.savePokemons.includes(pokemon.name)) continue // すでに出したポケモンの場合、再取得
        if (pokemon.name.endsWith('ン')) continue // 末尾が「ン」か
        if (!pokemon.name.startsWith(this.prevPokemon.slice(-1))) continue // しりとりが成立してない場合、再取得

        this.savePokemons.push(pokemon.name)
        this.prevPokemon = pokemon.name

        break
      }
      this.enemyTurnTimes += 1
    },
    myTurn() {
      // 空文字、null、空白文字の場合はエラー
      if (!this.searchWord || !this.searchWord.match(/\S/g)) {
        this.showError('ポケモンの名前をいれてみてね。')
        return
      }

      let pokemon = this.getPokemonByName(this.$hiraToKana(this.searchWord))
      // 入力したポケモンが存在しない場合
      if (!pokemon) {
        this.showError(`「${this.searchWord}」は存在しないポケモンだよ！`)
        return
      }
      // 末尾に「ン」がついてるか
      if (pokemon.name.endsWith('ン')) {
        this.$router.push('/shiritori/hantei')
        return
      }
      // 末尾が「長音」や「すてがな」、特殊なポケモンなら加工する 例: ニドラン♂
      this.prevPokemon = this.$processingIfNeeded(this.prevPokemon)
      // しりとりが成立してない場合、再取得
      if (!pokemon.name.startsWith(this.prevPokemon.slice(-1))) {
        this.showError('しりとりが成立してないよ！')
        return
      }
      // すでに言ったポケモン
      if (this.savePokemons.includes(pokemon.name)) {
        this.showError(`「${this.searchWord}」はすでにでてるよ！`)
        return
      }

      this.savePokemons.push(pokemon.name)
      this.prevPokemon = pokemon.name
      this.searchWord = ''
      this.myTurnTimes += 1

      if (this.enemyTurnTimes < this.enemyTurnMax) {
        this.enemyTurn()
      } else {
        this.$store.commit(
          shiritoriType.MUTATION_SET_TURN_TIMES,
          this.myTurnTimes + this.enemyTurnTimes
        )
        this.$store.commit(
          shiritoriType.MUTATION_SET_MY_TURN_TIMES,
          this.myTurnTimes
        )
        this.$router.push('/shiritori/win')
      }
    },
    reStart() {
      this.savePokemons = []
      this.myTurnTimes = 0
      this.enemyTurnTimes = 0
      this.turnFirstEnemy()
    },
    giveUp() {
      this.$store.commit(
        shiritoriType.MUTATION_SET_TURN_TIMES,
        this.myTurnTimes + this.enemyTurnTimes
      )
      this.$store.commit(
        shiritoriType.MUTATION_SET_MY_TURN_TIMES,
        this.myTurnTimes
      )
      this.$router.push('/shiritori/lose')
    },
    showError(errMsg: string) {
      this.errMsg = errMsg
      this.$nuxt.$emit('showSnackbar', this.errMsg)
      this.searchWord = ''
    },
  },
})
</script>

<style scoped>
@font-face {
  font-family: 'pokemon-font';
  src: url('@/assets/fonts/pokemon-font.woff2') format('woff2');
  src: url('@/assets/fonts/pokemon-font.ttf') format('truetype');
}
.poke_font {
  font-family: 'pokemon-font' !important;
}

table {
  border-collapse: collapse;
}
th,
td {
  padding: 5px;
  border: 1px solid #333;
}
</style>
