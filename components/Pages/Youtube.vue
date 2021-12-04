/* eslint-disable vue/no-unused-vars */ /* eslint-disable vue/no-parsing-error
*/
<template>
  <div class="text-center">
    <div class="mt-10">
      <p class="text-md-h5">youtubeで評価が高い動画</p>
      <v-row dense>
        <v-col
          v-for="(url, i) in thumbnailsUrls"
          :key="i"
          cols="12"
          lg="6"
          md="6"
          sm="12"
          xs="12"
        >
          <div class="youtube">
            <img
              :id="`youtube_${i}`"
              :src="url"
              :alt="url.name"
              loading="lazy"
              @click="youtubePlay(i)"
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
    youtube: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      ytube: this.youtube,
      thumbnailsUrls: [],
      movieUrls: [],
    }
  },
  created() {
    this.thumbnailsUrls = this.ytube.map((v) => v.snippet.thumbnails.medium.url)
    this.movieUrls = this.ytube.map((v) => v.id.videoId)
  },
  methods: {
    youtubePlay(i) {
      let el = document.getElementById(`youtube_${i}`)
      el.outerHTML =
        `<iframe src="https://www.youtube.com/embed/${this.movieUrls[i]}"` +
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
