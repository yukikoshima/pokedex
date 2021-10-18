<template>
  <v-app-bar app color="yellow" clipped-left flat height="70">
    <v-app-bar-nav-icon @click="switchDrawer"></v-app-bar-nav-icon>
    <nuxt-link to="/">
      <v-img
        :src="require('@/assets/img/logo.svg')"
        class="hidden-sm-and-down"
        max-width="200px"
      ></v-img>
    </nuxt-link>
    <Search />
    <v-spacer />
    <ErrorSnackbar />
    <Dialog />
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue'
import ErrorSnackbar from '@/components/Common/ErrorSnackbar.vue'

export default Vue.extend({
  components: {
    ErrorSnackbar,
  },
  data() {
    return {}
  },
  methods: {
    switchDrawer() {
      this.$nuxt.$emit('switchDrawer')
    },
  },
})
</script>
