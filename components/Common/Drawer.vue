<template>
  <v-navigation-drawer v-model="isDrawer" app clipped>
    <v-container>
      <v-list nav width="250px">
        <v-list-group
          v-for="navList in navLists"
          :key="navList.name"
          no-action
          :append-icon="navList.lists ? undefined : ''"
          value="true"
        >
          <template #activator>
            <v-list-item v-if="navList.lists" class="mb-0">
              <v-list-item-avatar>
                <v-img :src="navList.avatar"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ navList.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item v-else :to="navList.link">
              <v-list-item-avatar>
                <v-img :src="navList.avatar"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ navList.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <v-list-item
            v-for="list in navList.lists"
            :key="list.name"
            :to="list.link"
            nuxt
            exact
          >
            <v-list-item-content>
              <v-list-item-title>{{ list.name }}</v-list-item-title>
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
      navLists: [
        {
          name: 'ポケモン図鑑',
          avatar: require('@/assets/img/icon_pokemonzukan.png'),
          lists: [
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
          avatar: require('@/assets/img/icon_pokemonzukan.png'),
          link: '/zukan/test',
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
