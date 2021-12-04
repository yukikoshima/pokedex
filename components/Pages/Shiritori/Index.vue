<template>
  <v-main>
    <v-container app fluid>
      <header class="text-center">
        <h1>ポケモンしりとり</h1>
      </header>
      <main class="mt-5">
        <section>
          <h3 class="text-center">てきのつよさ</h3>
          <div
            class="d-flex justify-center align-center flex-sm-row flex-column"
          >
            <v-btn
              v-for="route in routeList"
              :key="route.name"
              :to="route.link"
              :color="route.color"
              outlined
              class="ma-2"
              >{{ route.name }}</v-btn
            >
          </div>
        </section>
        <section class="mt-5">
          <h3 class="text-center">るーる</h3>
          <div class="d-flex justify-center align-center">
            <ul class="pt-2">
              <li v-for="(rule, i) in rulesTxt" :key="i" v-html="rule"></li>
            </ul>
          </div>
        </section>
        <section class="mt-5">
          <h3 class="text-center">はんてい</h3>
          <div class="d-flex justify-center align-center">
            <ul class="pt-2">
              <li v-for="(judg, i) in judgsTxt" :key="i">
                {{ judg }}
              </li>
            </ul>
          </div>
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
        'プレイヤーが「ン」で終わるポケモンを答えたとき',
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
          link: '/shiritori/hard',
          color: 'error',
        },
        {
          name: '超難しい',
          link: '/shiritori/veryHard',
          color: 'purple',
        },
      ],
    }
  },
})
</script>

<style scoped>
li {
  padding-bottom: 5px;
}
</style>
