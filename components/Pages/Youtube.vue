/* eslint-disable vue/no-unused-vars */ /* eslint-disable vue/no-parsing-error
*/
<template>
  <div class="text-center">
    <div class="mt-10">
      <p>youtubeで評価が高い動画</p>
      <v-row dense>
        <v-col
          v-for="(url, index) in thumbnailsUrls"
          :key="index"
          cols="12"
          lg="6"
          md="6"
          sm="12"
          xs="12"
        >
          <div class="youtube">
            <img
              :id="`youtube_${index}`"
              :src="url"
              :alt="url.name"
              loading="lazy"
              @click="onClickPlay(index)"
            />
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    youtubeData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      ytubeData: this.youtubeData,
      thumbnailsUrls: [],
      movieUrls: [],
    }
  },
  created() {
    this.thumbnailsUrls = this.ytubeData.map(
      (item) => item.snippet.thumbnails.medium.url
    )
    this.movieUrls = this.ytubeData.map((item) => item.id.videoId)
  },
  methods: {
    onClickPlay(index) {
      const ele = document.getElementById(`youtube_${index}`)
      ele.outerHTML =
        `<iframe src="https://www.youtube.com/embed/${this.movieUrls[index]}"` +
        'title="YouTube video player" frameborder="0" allow="accelerometer;' +
        'autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"' +
        'allowfullscreen></iframe>'
    },
  },
})
</script>

<style>
.youtube img {
  width: 100%;
  aspect-ratio: 16 / 9;
  cursor: pointer;
}

.youtube iframe {
  width: 100%;
  aspect-ratio: 16 / 9;
}
</style>
