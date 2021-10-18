<template>
  <!-- <div class="text-center ma-2"> -->
  <v-snackbar
    v-model="snackbar"
    :timeout="timeout"
    absolute
    centered
    right
    color="error"
  >
    {{ msg }}
    <template #action="{ attrs }">
      <v-btn color="white" text v-bind="attrs" @click="showSnackbar">
        Close
      </v-btn>
    </template>
  </v-snackbar>
  <!-- </div> -->
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      msg: '',
      timeout: 3000,
      snackbar: false,
    }
  },
  mounted() {
    this.$nuxt.$on('showSnackbar', this.showSnackbar)
  },
  methods: {
    showSnackbar(msg) {
      this.snackbar = !this.snackbar
      this.msg = msg
    },
  },
})
</script>
