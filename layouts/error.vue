<template>
  <!-- <v-app> -->
  <v-main>
    <v-container app fluid>
      <h1 v-if="error.statusCode === 404">
        {{ pageNotFound }}<br />
        {{ error }}
      </h1>
      <h1 v-else>
        {{ otherError }}<br />
        {{ error }}
      </h1>
      <NuxtLink to="/"> Home page </NuxtLink>
      <div v-if="!errorStatus">
        <v-btn elevation="2" class="mt-3" @click="refresh">Reload</v-btn>
      </div>
    </v-container>
  </v-main>
  <!-- </v-app> -->
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import * as errorType from '@/store/types/errorType'
import errorStore from '~/store/modules/errorStore'

export default Vue.extend({
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred',
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
  computed: {
    ...mapGetters({ errorStatus: errorType.GETTER_ERRORS }),
  },
  methods: {
    refresh() {
      if (!this.errorStatus) {
        location.reload()
      }
    },
  },
})
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
