<template>
  <v-main>
    <v-container app fluid>
      <main>
        <img
          src="data:image/gif;base64,R0lGODlhAQABAGAAACH5BAEKAP8ALAAAAAABAAEAAAgEAP8FBAA7"
          width="300"
          height="300"
          alt=""
          class="lazyload"
          data-src="@/assets/img/icon_pikachu.png"
        />
        <div class="top text-center headline">
          <p
            class="
              shine
              poke_font
              text-lg-h2 text-md-h2 text-sm-h4 text-h6
              pb-sm-6
            "
          >
            ようこそポケモンあそびばへ
          </p>
          <p class="poke_font text-lg-h4 text-md-h4 text-sm-h6 text-caption">
            ポケモンをみたり、ポケモンしりとりができるよ！
          </p>
        </div>
        <Youtube />
      </main>
    </v-container>
  </v-main>
</template>

<script lang="ts">
import Vue from 'vue'
import Youtube from './Youtube.vue'

export default Vue.extend({
  components: { Youtube },
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

.headline {
  animation: SlideIn 1.6s;
}

@keyframes SlideIn {
  0% {
    opacity: 0;
    transform: translateX(100%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.shine {
  background-image: linear-gradient(70deg, black 45%, #fff 50%, black 55%);
  background-size: 450% 100%;
  background-clip: text;
  color: transparent;
  animation: shine 3s infinite;
}

@keyframes shine {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
