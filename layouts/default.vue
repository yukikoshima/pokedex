<template>
  <v-app>
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
    <v-app-bar color="yellow" app clipped-left flat>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title class="hidden-sm-and-down">ポケモンロゴ</v-app-bar-title>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="search"
            name="pokeSerch"
            label="ポケモン検索"
            placeholder="No.やポケモンの名前で検索！！"
            prepend-inner-icon="mdi-magnify"
            hide-details
            outlined
            clearable
            dense
            type="text"
            class="ml-16"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-app-bar>
    <Nuxt />
  </v-app>
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
}
</script>
