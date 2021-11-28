<template>
  <v-main>
    <v-container app fluid>
      <header id="header" class="text-center">
        <h1 class="poke_font">ポケモンしりとり</h1>
      </header>
      <main class="mt-5">
        <section class="d-flex justify-center">
          <v-card class="pa-4">
            <h3 class="poke_font text-center">てきのつよさ</h3>
            <span
              v-for="route in routeList"
              :key="route.name"
              class="pa-2 d-md-inline-block d-block text-center"
            >
              <v-btn
                :key="route.name"
                :to="route.link"
                :color="route.color"
                outlined
                width="100px"
                >{{ route.name }}</v-btn
              >
            </span>
          </v-card>
        </section>
        <section class="d-flex justify-center mt-5">
          <v-card class="pa-4">
            <h3 class="poke_font text-center">ルール</h3>
            <ul class="text-left pt-2">
              <li v-for="(rule, i) in rulesTxt" :key="i" v-html="rule"></li>
            </ul>
          </v-card>
        </section>
        <section class="d-flex justify-center mt-5">
          <v-card class="pa-4">
            <h3 class="poke_font text-center">はんてい</h3>
            <div class="pt-2">
              <ul class="text-left">
                <li v-for="(judg, i) in judgsTxt" :key="i">
                  {{ judg }}
                </li>
              </ul>
            </div>
          </v-card>
        </section>
      </main>
      <main></main>
    </v-container>
  </v-main>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      rulesTxt: [
        'ポケモンの名前はひらがな・カタカナで入力してね',
        '一度入力したポケモンはもう使えないよ',
        '濁音(だくおん)・半濁音(はんだくおん)は、そのままつなげる<br />【例: ミカルゲ → ゲノセクト】',
        '小文字は、大文字でつなげる<br />【例: ウインディ → イーブイ】',
        '長音は、長音の1文字前の文字でつなげる<br />【例: フリーザー → ザマゼンタ】',
        'ニドラン♂（オス）は「ス」でつなげる<br />【例: ニドラン♂ → ストリンダー】',
        'ニドラン♀（メス）は「ス」でつなげる<br />【例: ニドラン♀ → ストライク】',
      ],
      judgsTxt: [
        'プレイヤー・CPUが「ン」で終わるポケモンを答えたとき',
        'しりとりがせいりつするポケモンが残っていないとき',
        '「こうさんする」ボタンを押したとき',
      ],
      routeList: [
        {
          name: '超簡単',
          link: '/shiritori/veryEasy',
          color: 'success',
        },
        {
          name: '簡単',
          link: '/shiritori/easy',
          color: 'info',
        },
        {
          name: '普通',
          link: '/shiritori/normal',
          color: 'warning',
        },
        {
          name: '難しい',
          link: '/shiritori/veryHard',
          color: 'error',
        },
        {
          name: '超難しい',
          link: '/shiritori/hard',
          color: 'purple',
        },
      ],
    }
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
li {
  padding-bottom: 5px;
}
</style>
