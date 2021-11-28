<template>
  <v-navigation-drawer v-model="isDrawer" app clipped>
    <v-container>
      <v-list nav width="250px">
        <v-list-group
          v-for="routeList in routeLists"
          :key="routeList.name"
          no-action
          :append-icon="routeList.routes ? undefined : ''"
        >
          <template #activator>
            <v-list-item v-if="routeList.routes" class="mb-0">
              <v-list-item-avatar>
                <v-img :src="routeList.avatar"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ routeList.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item v-else :to="routeList.link">
              <v-list-item-avatar>
                <v-img :src="routeList.avatar"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ routeList.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <v-list-item
            v-for="route in routeList.routes"
            :key="route.name"
            :to="route.link"
            nuxt
            exact
          >
            <v-list-item-content>
              <v-list-item-title>{{ route.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-container>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      isDrawer: true,
      routeLists: [
        {
          name: 'ポケモン図鑑',
          avatar: require('@/assets/img/icon_pokemonzukan.png'),
          routes: [
            {
              name: '全世代',
              link: '/zukan',
            },
            {
              name: '赤・緑・青・ピカチュー',
              link: '/zukan/rgbp',
            },
            {
              name: '金・銀',
              link: '/zukan/gs',
            },
            {
              name: 'ルビー・サファイア',
              link: '/zukan/rs',
            },
            {
              name: 'ダイヤモンド・パール',
              link: '/zukan/dp',
            },
            {
              name: 'ブラック・ホワイト',
              link: '/zukan/bw',
            },
            {
              name: 'X・Y',
              link: '/zukan/xy',
            },
            {
              name: 'サン・ムーン',
              link: '/zukan/sm',
            },
            {
              name: 'Lets Go! ピカブイ',
              link: '/zukan/pv',
            },
            {
              name: 'ソード・シールド',
              link: '/zukan/swsh',
            },
          ],
        },
        {
          name: 'しりとり',
          avatar: require('@/assets/img/icon_pikachu.png'),
          link: '/shiritori',
        },
      ],
    }
  },
  mounted() {
    this.$nuxt.$on('switchDrawer', this.switchDrawer)
  },
  methods: {
    switchDrawer() {
      this.isDrawer = !this.isDrawer
    },
  },
})
</script>

<style>
.v-list-item__icon {
  margin-left: 0 !important;
}
</style>
