/* eslint-disable vue/no-parsing-error */
<template>
  <div class="text-center">
    <p v-if="$fetchState.pending">youtube読み込み中...</p>
    <p v-else-if="$fetchState.error">youtube読み込めませんでした</p>
    <div v-else class="mt-10">
      <p>youtubeで評価が高い動画</p>
      <v-row dense>
        <v-col
          v-for="url in urls"
          :key="url"
          cols="12"
          lg="6"
          md="6"
          sm="12"
          xs="12"
        >
          <div class="youtube">
            <iframe
              :key="url"
              width="560"
              height="315"
              :src="url"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      urls: [],
      baseUrl: 'https://www.youtube.com/embed/',
      apiUrl:
        'https://www.googleapis.com/youtube/v3/search?part=snippet&q=ポケモンアルセウス&order=rating&key=',
    }
  },
  async fetch() {
    const items = await fetch(`${this.apiUrl}${this.$config.apiKey}`)
      .then((res) => res.json())
      .then((res) => res.items)

    this.urls = items.map((item) => `${this.baseUrl}${item.id.videoId}`)
  },
})
</script>

<style scoped>
.youtube {
  width: 100%;
  aspect-ratio: 16 / 9;
}
.youtube iframe {
  width: 100%;
  height: 100%;
}
</style>
