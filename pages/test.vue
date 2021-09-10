<template>
  <v-main>
    <v-container>
      <h1>hello</h1>
      <button @click="foo">fooクリック</button>
      <div v-for="po in pokemons" :key="po.id">
        {{ po.id }}
        <div v-for="(p, k, i) in po" :key="p.id">{{ po }}:{{ k }}:{{ i }}</div>
      </div>
    </v-container>
  </v-main>
</template>

<script lang="ts">
import Vue from 'vue'
import 'vue-apollo'
import pokeAPIquery from '~/apollo/queries/pokeAPIquery.gql'

export default Vue.extend({
  asyncData(context) {
    let client = context.app.apolloProvider.defaultClient
    console.log(client)
  },
  data() {
    return {
      pokeAPIquery,
    }
  },
  methods: {
    foo() {
      // receive the associated Apollo client
      const a = this.$apollo.provider.defaultClient
      const b = this.$apollo.provider.clients
      const client = this.$apollo.getClient()
      console.log(a)
      console.log(b)
      console.log(client)
      // most likely you would call mutations like following:
      // this.$apollo.mutate({ mutation, variables })

      // but you could also call queries like this:
      // this.$apollo.query({ query, variables }).then(({ data }) => {
      // do what you want with data
      // })

      const qe = this.$apollo.queries
      console.log(qe)
    },
  },
  // pokemon一覧を取得
  apollo: {
    pokemons: {
      prefetch: 'loading',
      query: pokeAPIquery,
      // variables: {
      // amount: numGetPokemons,
      // name: 'bulbasaur',
      // },
      // pollInterval: 900000000, // ms
    },
    species: {
      prefetch: 'loading',
      query: pokeAPIquery,
      // variables: {
      // amount: numGetPokemons,
      // name: 'bulbasaur',
      // },
      // pollInterval: 900000000, // ms
    },
  },
})
</script>
