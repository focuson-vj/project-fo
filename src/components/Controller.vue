<template>
  <v-container>
    <v-row
      v-for="(row, rIdx) in buttons"
      :key="row.id"
      :style="styleObj"
      class="button-row"
    >
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

<script>
import FirebaseTools from '../modules/FirebaseTools'
import { mapState } from 'vuex'

export default {
  name: 'Controller',

  data: function() {
    return {
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
      styleObj: `height: auto`,
      seed: 1.0,
    }
  },
  computed: {
    ...mapState(['bpm']),
  },

  created: function() {
    this.$store.dispatch('getBpmData')
    console.log('bpm is: ' + this.bpm)
  },

  methods: {
    btnPush(rIdx, cIdx) {
      console.log(this.bpm)
      console.log(`button pushed: (${rIdx}, ${cIdx})`)
      let basenum = rIdx * 4 + cIdx
      FirebaseTools.IncrementParam('action', 'obj' + (basenum + 1))
      FirebaseTools.AddLogs('logs', 'obj' + (basenum + 1));
    },
    handleResize() {
      this.styleObj = `height:${(window.innerHeight - 130) / 6}px`
    },
  },
  mounted: function() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  beforeDestroy: function() {
    window.removeEventListener('resize', this.handleResize)
  },
}
</script>

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
  border-radius: 12px;
  background-color: #962626e7;
  position: relative;
}
.button:active {
  filter: brightness(150%) saturate(130%);
}
.button-col {
  height: 100%;
  /* ボタン間のマージン */
  padding: 6px 6px;
}
.button-row {
  /* 横のマージン */
  padding: 0px 10px;
}
img.gray {
  /* -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  -ms-filter: grayscale(100%);
  -o-filter: grayscale(100%);
  filter: grayscale(100%); */
  mix-blend-mode: difference;
}
</style>
