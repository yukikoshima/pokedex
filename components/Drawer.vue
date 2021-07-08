<template>
  <v-navigation-drawer v-model="drawer" app clipped>
    <v-container>
      <v-list nav>
        <v-list-group
          v-for="nav_list in nav_lists"
          :key="nav_list.name"
          :prepend-icon="nav_list.icon"
          no-action
          :append-icon="nav_list.lists ? undefined : ''"
        >
          <template #activator>
            <v-list-item-content>
              <v-list-item-title>{{ nav_list.name }}</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item v-for="list in nav_list.lists" :key="list">
            <v-list-item-content>
              <v-list-item-title>{{ list }}</v-list-item-title>
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
          name: 'Getting Started',
          icon: 'mdi-speedometer',
          lists: ['Quick Start', 'Pre-made layouts'],
        },
        {
          name: 'Customization',
          icon: 'mdi-cogs',
        },
        {
          name: 'Styles & animations',
          icon: 'mdi-palette',
          lists: ['Colors', 'Content', 'Display'],
        },
        {
          name: 'UI Components',
          icon: 'mdi-view-dashboard',
          lists: ['API explorer', 'Alerts'],
        },
        {
          name: 'Directives',
          icon: 'mdi-function',
        },
        {
          name: 'Preminum themes',
          icon: 'mdi-vuetify',
        },
      ],
    }
  },
  mounted() {
    this.$nuxt.$on('updateDrawer', this.updateDrawer)
  },
  methods: {
    updateDrawer(drawer) {
      this.drawer = drawer
    },
  },
}
</script>
