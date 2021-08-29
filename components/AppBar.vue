<template>
  <v-app-bar app color="yellow" clipped-left flat height="70">
    <v-app-bar-nav-icon @click="switchDrawer"></v-app-bar-nav-icon>
    <!-- <v-app-bar-title class="hidden-sm-and-down">ポケモンロゴ</v-app-bar-title> -->
    <v-img
      :src="require('@/assets/img/logo.svg')"
      class="hidden-sm-and-down"
      max-width="200px"
    ></v-img>
    <Search />
    <v-spacer />
    <ErrorSnackbar />
    <Dialog />
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      msg: '',
    }
  },
  methods: {
    switchDrawer() {
      this.$nuxt.$emit('switchDrawer')
    },
  },
}
</script>
