<template>
  <v-snackbar
    v-model="isSnackbar"
    :timeout="timeout"
    absolute
    centered
    right
    color="error"
  >
    {{ msg }}
    <template #action="{ attrs }">
      <v-btn color="white" text v-bind="attrs" @click="hideSnackbar">
        閉じる
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      msg: '',
      timeout: 3000,
      isSnackbar: false,
    }
  },
  mounted() {
    this.$nuxt.$on('showSnackbar', this.showSnackbar)
  },
  methods: {
    showSnackbar(msg) {
      this.msg = msg
      this.isSnackbar = true
    },
    hideSnackbar() {
      this.isSnackbar = false
    },
  },
})
</script>
