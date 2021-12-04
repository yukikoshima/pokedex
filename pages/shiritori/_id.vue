<template>
  <v-main>
    <v-container app fluid>
      <header class="text-center">
        <h1>ポケモンしりとり</h1>
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
              <!-- <tr v-for="(name, i) in savePokemons.slice().reverse()" :key="i"> -->
              <tr v-for="(name, i) in reverseSavePokemons" :key="i">
                <td>{{ reverseSavePokemons.length - i }}</td>
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
      id: 0,
      searchWord: '',
      prevPokemon: '',
      savePokemons: [], // しりとりで出たポケモンを保存
      enemyLavel: '', // 敵のレベル
      myTurnTimes: 0, // 自分のターンの回数
      enemyTurnTimes: 0, // 敵のターンの回数
      enemyTurnMax: 0, // 敵の強さによってターンの上限を決める
      errMsg: '', // エラーメッセージ
    }
  },
  computed: {
    ...mapGetters({
      getPokemonsEndNNot: pokemonZukanType.GETTER_POKEMONS_END_N_NOT,
      getPokemonById: pokemonZukanType.GETTER_POKEMON_BY_ID,
      getPokemonByName: pokemonZukanType.GETTER_POKEMON_BY_POKEMON_NAME,
    }),
    reverseSavePokemons() {
      return this.savePokemons.slice().reverse()
    },
  },
  created() {
    this.enemyLavel = this.$route.params.id
    if (this.enemyLavel === 'veryEasy') {
      this.enemyTurnMax = 20
    } else if (this.enemyLavel === 'easy') {
      this.enemyTurnMax = 60
    } else if (this.enemyLavel === 'normal') {
      this.enemyTurnMax = 151
    } else if (this.enemyLavel === 'hard') {
      this.enemyTurnMax = 350
    } else if (this.enemyLavel === 'veryHard') {
      this.enemyTurnMax = 500
    }
  },
  mounted() {
    setTimeout(() => {
      this.turnFirstEnemy()
    }, 0)
  },
  methods: {
    getId(n: number) {
      return Math.floor(Math.random() * n)
    },
    /**
     * CPU: 初手
     */
    turnFirstEnemy() {
      this.id = this.getId(this.getPokemonsEndNNot().length)
      const pokemon = this.getPokemonsEndNNot()[this.id]
      this.savePokemons.push(pokemon.name)
      this.prevPokemon = pokemon.name
      this.enemyTurnTimes += 1
    },
    /**
     * cpu
     * ランダムでポケモンを取得する
     */
    enemyTurn() {
      this.prevPokemon = this.$processingIfNeeded(this.prevPokemon) // 末尾が「長音」や「すてがな」なら加工する
      const pokemons = this.getPokemonsEndNNot().filter(
        (pokemon) =>
          !this.savePokemons.includes(pokemon.name) &&
          pokemon.name.startsWith(this.prevPokemon.slice(-1))
      )
      // ポケモンが取得できた時の処理
      if (pokemons.length) {
        this.id = this.getId(pokemons.length)
        const pokemon = pokemons[this.id]
        this.savePokemons.push(pokemon.name)
        this.prevPokemon = pokemon.name
        this.enemyTurnTimes += 1

        return
      }
      this.registerTurnTimes()
      this.$router.push('/shiritori/win')
    },
    myTurn() {
      // 空文字、null、空白文字の場合はエラー
      if (!this.searchWord || !this.searchWord.match(/\S/g)) {
        this.showError('ポケモンの名前をいれてみてね。')
        return
      }

      const pokemon = this.getPokemonByName(this.$hiraToKana(this.searchWord))
      // 入力したポケモンが存在しない場合
      if (!pokemon) {
        this.showError(`「${this.searchWord}」は存在しないポケモンだよ！`)
        return
      }
      // 末尾が「長音」や「すてがな」、特殊なポケモンなら加工する 例: ニドラン♂
      this.prevPokemon = this.$processingIfNeeded(this.prevPokemon)
      // しりとりが成立してない場合、再取得
      if (!pokemon.name.startsWith(this.prevPokemon.slice(-1))) {
        this.showError('しりとりが成立してないよ！')
        return
      }
      // 末尾に「ン」がついてるか
      if (pokemon.name.endsWith('ン')) {
        this.$router.push('/shiritori/lose')
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

        return
      }
      this.registerTurnTimes()
      this.$router.push('/shiritori/win')
    },
    /**
     * ターンの回数を保存
     */
    registerTurnTimes() {
      this.$store.commit(
        shiritoriType.MUTATION_SET_TURN_TIMES,
        this.myTurnTimes + this.enemyTurnTimes
      )
      this.$store.commit(
        shiritoriType.MUTATION_SET_MY_TURN_TIMES,
        this.myTurnTimes
      )
    },
    reStart() {
      this.savePokemons = []
      this.myTurnTimes = 0
      this.enemyTurnTimes = 0
      this.turnFirstEnemy()
    },
    giveUp() {
      this.registerTurnTimes()
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
table {
  border-collapse: collapse;
}
th,
td {
  padding: 5px;
  border: 1px solid #333;
}
</style>
