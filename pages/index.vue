<template>
  <Welcome :youtube="youtube" />
</template>

<script lang="ts">
import Vue from 'vue'
import Welcome from '@/components/Pages/Welcome.vue'
import * as errorType from '@/store/types/errorType'
import { ErrorStatus } from '@/store/types/adapters/errorAdapter'

const apiUrl =
  'https://www.googleapis.com/youtube/v3/search?part=snippet&q=ポケモンアルセウス&order=rating&key='

export default Vue.extend({
  components: {
    Welcome,
  },
  async asyncData({ $axios, store, error, $config: { apiKey } }) {
    const youtube = await $axios
      .$get(`${apiUrl}${apiKey}`)
      .then((res) => res.items)
      .catch((e) => {
        console.error(`${e.name}: ${e.message}`)
        const err: ErrorStatus = {
          statusCode: e.name,
          message: e.message,
        }
        store.dispatch(errorType.ACTION_SET_ERROR, err)
        error(store.getters[errorType.GETTER_ERRORS])
      })

    return { youtube }
  },
})
</script>
