<template>
  <v-navigation-drawer v-model="drawer" app clipped>
    <v-container>
      <v-list nav width="250px">
        <v-list-group
          v-for="nav_list in nav_lists"
          :key="nav_list.name"
          no-action
        >
          <template #activator>
            <v-list-item-avatar>
              <v-img :src="nav_list.avatar"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ nav_list.name }}</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="list in nav_list.lists"
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

<script>
export default {
  data() {
    return {
      drawer: true,
      nav_lists: [
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
      ],
    }
  },
  mounted() {
    this.$nuxt.$on('switchDrawer', this.switchDrawer)
  },
  methods: {
    switchDrawer() {
      this.drawer = !this.drawer
    },
  },
}
</script>
