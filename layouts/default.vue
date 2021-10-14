<template>
  <v-app>
    <AppBar />
    <Drawer />
    <Nuxt />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import AppBar from '@/components/Common/AppBar.vue'
import Drawer from '@/components/Common/Drawer.vue'

export default Vue.extend({
  components: {
    AppBar,
    Drawer,
  },
})
</script>
