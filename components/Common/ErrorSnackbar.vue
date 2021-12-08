<template>
  <!-- min-width: iPhone5,se用に設定 -->
  <v-snackbar
    v-model="isSnackbar"
    :timeout="timeout"
    absolute
    :right="!isMobile"
    :centered="isMobile"
    min-width="304"
    color="error"
  >
    {{ msg }}
    <template #action="{ attrs }">
      <v-btn color="white" text v-bind="attrs" @click="hideSnackbar">
        ✖️
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
      timeout: 1500,
      isSnackbar: false,
    }
  },
  computed: {
    isMobile() {
      if (this.$vuetify.breakpoint.width <= 414) {
        return true
      }

      return false
    },
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
