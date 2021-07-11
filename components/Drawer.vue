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
            nuxt
            :to="list.link"
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
              name: '第一世代',
              link: '/generation/first',
            },
            {
              name: '第二世代',
              link: '/generation/second',
            },
            {
              name: '第三世代',
              link: '/generation/third',
            },
            {
              name: '第四世代',
              link: '/generation/fourth',
            },
            {
              name: '第五世代',
              link: '/generation/fifth',
            },
            {
              name: '第六世代',
              link: '/generation/sixth',
            },
            {
              name: '第七世代',
              link: '/generation/seventh',
            },
            {
              name: '第八世代',
              link: '/generation/eighth',
            },
          ],
        },
      ],
    }
  },
  mounted() {
    this.$nuxt.$on('updateDrawer', this.updateDrawer)
  },
  methods: {
    updateDrawer() {
      this.drawer = !this.drawer
    },
  },
}
</script>
