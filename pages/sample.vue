<template>
  <section class="container">
    <div>
      <h1 class="title">infinite-loading</h1>
      <!-- リストを表示する部分 -->
      <ul class="list">
        <!-- 下記のようにv-forでループして変数 -->
        <li v-for="(item, index) in news" :key="index" class="item">
          {{ item + index }}
        </li>
      </ul>
      <!-- 自動読み込みのブロック一定の部分までスクロールされると@infinite=で指定したmethodが実行される -->
      <infinite-loading
        ref="infiniteLoading"
        spinner="spiral"
        distance="100"
        @infinite="infiniteLoad"
      >
        <!-- ステータスがcompleteに更新されると下記が表示される -->
        <span slot="no-more">-----検索結果は以上です-----</span>
        <!-- 結果が存在しない場合下記が表示される -->
        <span slot="no-results">-----検索結果はありません-----</span>
      </infinite-loading>
    </div>
  </section>
</template>
<script>
export default {
  methods: {
    // axios
    //   .get(api, {
    //     params: {
    //       page: this.page,
    //     },
    //   })
    //   .then(({ data }) => {
    //     if (data.hits.length) {
    //       this.page += 1
    //       this.list.push(...data.hits)
    //       console.log(this.list)
    //       $state.loaded()
    //     } else {
    //       console.log('読み込み完了')
    //       $state.complete()
    //     }
    //   })
  },
}
</script>
