<template>
  <v-main>
    <v-container grid-list-md>
      <div v-for="user in users" :key="user.name">
        {{ user.name }}
      </div>
    </v-container>
  </v-main>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  async asyncData() {
    const users = await fetch('/api/users').then((res) => {
      return res.json()
    })
    return {
      users,
    }
  },
})
</script>
