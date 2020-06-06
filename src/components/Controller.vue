<template>
  <v-container>
    <v-row v-for="(row, rIdx) in buttons" :key="row.id" class="button-row">
      <v-col
        v-for="(col, cIdx) in row.cols"
        :key="cIdx"
        cols="3"
        class="button-col"
      >
        <div class="button" @click="btnPush(rIdx, cIdx)">
          <div class="button-inner">
            <!-- ここに画像などを入れる -->
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.button-inner {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translateY(-50%) translateX(-50%);
  transform: translateY(-50%) translateX(-50%);
  padding: 20px;
}
.button {
  vertical-align: middle;
  height: 100%;
  /* border: 1px solid blue; */
  border-radius: 18px;
  background-color: #157246;
  position: relative;
}
.button-col {
  height: 100%;
  /* ボタン間のマージン */
  padding: 2px 2px;
}
.button-row {
  height: calc(calc(100vh - 110px) / 6);
  /* 横のマージン */
  padding: 0px 10px;
}
</style>

<script>
// import { mapState } from 'vuex'
import FirebaseTools from "../modules/FirebaseTools";
import { mapState } from 'vuex';

export default {
  name: 'Controller',

  data: () => ({
    buttons: [
      {
        id: 1,
        cols: ['あ', 'い', 'う', 'え'],
      },
      {
        id: 2,
        cols: ['あ', 'い', 'う', 'え'],
      },
      {
        id: 3,
        cols: ['あ', 'い', 'う', 'え'],
      },
      {
        id: 4,
        cols: ['あ', 'い', 'う', 'え'],
      },
      {
        id: 5,
        cols: ['あ', 'い', 'う', 'え'],
      },
      {
        id: 6,
        cols: ['あ', 'い', 'う', 'え'],
      },
    ],
    seed: 1.0,
  }),
  
  computed: {
    ...mapState(['count', 'bpm']),
  },

  created: function() {
    this.seed = Math.random() * 100;
    this.$store.dispatch('getBpmData');
    console.log("bpm is: " + this.bpm);
  },

  methods: {
    // increment(index) {
    //   this.$store.dispatch('increment', index)
    // },

    getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    },

    btnPush(rIdx, cIdx) {
      console.log(this.bpm);
      console.log(`button pushed: (${rIdx}, ${cIdx})`);
      let basenum = rIdx * 4 + cIdx;
      let idx = Math.floor((basenum * this.seed) % 5);
      FirebaseTools.IncrementParam("action", "obj" + (idx + 1));
    },
  },
  // beforeMount: function() {
  //   this.$store.dispatch('init', 4)
  // },
};
</script>
