<template>
  <v-main>
    <v-container grid-list-md>
      {{ text }}
    </v-container>
  </v-main>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  async asyncData() {
    const test = await fetch('/api/test')
    const text = await test.text()
    return {
      text,
    }
  },
})
</script>
