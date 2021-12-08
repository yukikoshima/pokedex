<template>
  <v-navigation-drawer v-model="isDrawer" app clipped bottom>
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
            <v-list-item
              v-else
              :to="routeList.link"
              :disabled="routeList.isDisabled"
            >
              <v-list-item-avatar>
                <v-img :src="routeList.avatar"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ routeList.name }}</v-list-item-title>
                <v-list-item-subtitle v-if="routeList.isDisabled"
                  >ポケモンダウンロード中</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
          </template>
          <v-list-item
            v-for="route in routeList.routes"
            :key="route.name"
            :to="route.link"
            :disabled="route.isDisabled"
            nuxt
            exact
          >
            <v-list-item-content>
              <v-list-item-title>{{ route.name }}</v-list-item-title>
              <v-list-item-title v-if="route.isDisabled"
                >ポケモンダウンロード中</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-container>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import * as pokemonZukanType from '@/store/types/pokemonZukanType'
import { PokemonInfo } from '@/store/types/adapters/pokemonZukanAdapter'

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
              isDisabled: false,
            },
            {
              name: '赤・緑・青・ピカチュー',
              link: '/zukan/rgbp',
              isDisabled: true,
            },
            {
              name: '金・銀',
              link: '/zukan/gs',
              isDisabled: true,
            },
            {
              name: 'ルビー・サファイア',
              link: '/zukan/rs',
              isDisabled: true,
            },
            {
              name: 'ダイヤモンド・パール',
              link: '/zukan/dp',
              isDisabled: true,
            },
            {
              name: 'ブラック・ホワイト',
              link: '/zukan/bw',
              isDisabled: true,
            },
            {
              name: 'X・Y',
              link: '/zukan/xy',
              isDisabled: true,
            },
            {
              name: 'サン・ムーン',
              link: '/zukan/sm',
              isDisabled: true,
            },
            {
              name: 'Lets Go! ピカブイ',
              link: '/zukan/pv',
              isDisabled: true,
            },
            {
              name: 'ソード・シールド',
              link: '/zukan/swsh',
              isDisabled: true,
            },
          ],
        },
        {
          name: 'しりとり',
          avatar: require('@/assets/img/icon_pikachu.png'),
          link: '/shiritori',
          isDisabled: true,
        },
      ],
    }
  },
  computed: {
    ...mapGetters({ pokemons: pokemonZukanType.GETTER_POKEMONS }),
  },
  watch: {
    pokemons(newValue: PokemonInfo[]) {
      if (newValue.length >= 151) {
        this.routeLists[0].routes[1].isDisabled = false
      }
      if (newValue.length >= 251) {
        this.routeLists[0].routes[2].isDisabled = false
      }
      if (newValue.length >= 386) {
        this.routeLists[0].routes[3].isDisabled = false
      }
      if (newValue.length >= 493) {
        this.routeLists[0].routes[4].isDisabled = false
      }
      if (newValue.length >= 649) {
        this.routeLists[0].routes[5].isDisabled = false
      }
      if (newValue.length >= 721) {
        this.routeLists[0].routes[6].isDisabled = false
      }
      if (newValue.length >= 807) {
        this.routeLists[0].routes[7].isDisabled = false
      }
      if (newValue.length >= 809) {
        this.routeLists[0].routes[8].isDisabled = false
      }
      if (newValue.length >= 898) {
        this.routeLists[0].routes[9].isDisabled = false
      }
      if (newValue.length >= 350) {
        this.routeLists[1].isDisabled = false
      }
    },
  },
  created() {
    // mobileの時は初期表示しない
    if (this.$vuetify.breakpoint.width < 600) {
      this.isDrawer = false
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
