<template>
  <v-app-bar app color="yellow" clipped-left flat height="70">
    <v-app-bar-nav-icon @click="updateDrawer"></v-app-bar-nav-icon>
    <v-app-bar-title class="hidden-sm-and-down">ポケモンロゴ</v-app-bar-title>
    <v-row>
      <v-col cols="4">
        <Search />
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    updateDrawer() {
      this.$nuxt.$emit('updateDrawer')
    },
  },
}
</script>
