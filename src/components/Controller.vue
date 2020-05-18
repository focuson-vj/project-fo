<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4" cols="12">
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to Focus On!
        </h1>

        <p class="subheading font-weight-regular">
          Interactive VJ System for Focus On!
        </p>
      </v-col>

      <v-col v-for="(button, index) in buttons" :key="index" cols="3">
        <v-btn
          class="mx-2"
          dark
          small
          :color="button.color"
          @click="increment(index)"
        >
          <v-icon dark>mdi-heart</v-icon>
          <span>{{ count[index] }}</span>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Controller',

  data: () => ({
    buttons: [
      { color: 'pink' },
      { color: 'green' },
      { color: 'orange' },
      { color: 'blue' },
    ],
  }),
  computed: {
    ...mapState(['count']),
  },
  methods: {
    increment(index) {
      this.$store.dispatch('increment', index)
    },
  },
  beforeMount: function() {
    this.$store.dispatch('init', 4)
  },
}
</script>
