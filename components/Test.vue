<template>
  <v-container>
    {{ comTed }}
  </v-container>
</template>

<script>
export default {
  props: {
    comTed: {
      type: Array,
      required: true,
    },
  },
  methods: {
    childEvent() {
      console.log('ちんちんバズーカ')
    },
  },
}
</script>
