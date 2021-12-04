<template>
  <v-main>
    <v-container app fluid>
      <header class="text-center">
        <h1>ポケモンしりとり</h1>
        <div class="sub-title mt-10">
          <h1>
            敵が降参したみたいだ！<br />
            君の勝ちだよ！！<br />
            次はもっと強い敵と戦ってみよう！！
          </h1>
        </div>
      </header>
      <main class="mt-10">
        <v-row justify="center">
          <v-col cols="12" lg="6">
            <table width="100%">
              <tr>
                <td>君が答えた回数</td>
                <td>{{ myTurnTimes }}</td>
              </tr>
              <tr>
                <td>しりとりした回数</td>
                <td>{{ turnTimes }}</td>
              </tr>
            </table>
          </v-col>
        </v-row>
      </main>
      <footer class="text-center">
        <nuxt-link to="/shiritori">しりとり</nuxt-link>
      </footer>
    </v-container>
  </v-main>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import * as shiritoriType from '~/store/types/shiritoriType'

export default Vue.extend({
  computed: {
    ...mapGetters({
      turnTimes: shiritoriType.GETTER_TURN_TIMES,
      myTurnTimes: shiritoriType.GETTER_MY_TURN_TIMES,
    }),
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
