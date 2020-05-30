<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-toolbar-title>Focus On!</v-toolbar-title>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content>
      <Controller />
    </v-content>
    <Infomation />
  </v-app>
</template>

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
    //
  }),
}
</script>
