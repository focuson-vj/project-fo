<template>
  <v-app>
    <v-navigation-drawer
      app
      v-model="drawer"
      cliped-right
      overlay
      bottom
      dark
      dense
    >
      <v-list-item>
        <v-list-item-title class="title">
          Links
        </v-list-item-title>
        <v-btn icon>
          <v-icon @click.stop="drawer = !drawer">mdi-chevron-down</v-icon>
        </v-btn>
      </v-list-item>
      <v-divider />
      <v-list nav>
        <!-- <v-list-item v-for="menu in menus" :key="menu.title" :to="menu.url">
          <v-list-item-icon>
            <v-icon>{{ menu.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ menu.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
         -->
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app right dark>
      <!-- アプリケーションバー -->
      <v-avatar>
        <img src="./assets/focuson_logo.jpg" alt="Logo of Focus On!" />
      </v-avatar>
      <v-toolbar-title style=" margin: 0 auto;"
        >Interactive VJ System</v-toolbar-title
      >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    </v-app-bar>

    <v-content>
      <Controller />
    </v-content>
    <Infomation />
  </v-app>
</template>

<style scoped>
main {
  background: linear-gradient(0deg, #1d1d1d 45%, #9c9c9c 50%, #1d1d1d 55%);
  background-size: 400% 400%;

  animation: Animation 1.2s ease infinite;
}

@keyframes Animation {
  0% {
    background-position: 0% 0%;
  }

  /* 50% {
    background-position: 0% 100%;
  } */

  100% {
    background-position: 0% 100%;
  }
}
</style>

<script>
import Controller from './components/Controller'
import Infomation from './components/Information'

export default {
  name: 'App',

  components: {
    Controller,
    Infomation,
  },

  data: () => ({
    drawer: false,
    // リンク一覧
    menus: [
      {
        title: 'Twitter',
        icon: ' mdi-twitter',
        url: 'https://twitter.com/Focus_on_dj',
      },
      { title: 'Home', icon: 'mdi-home', url: '/home' },
      { title: 'Favorites', icon: 'mdi-heart', url: '/favorites' },
      { title: 'About', icon: 'mdi-information-variant', url: '/about' },
    ],
  }),
}
</script>
