<template>
  <v-container ref="controllerWrap">
    <v-row v-for="(row, rIdx) in buttons" :key="row.id" :style="vRowStyleObj" class="button-row">
      <v-col
        v-for="(col, cIdx) in row.cols"
        :key="cIdx"
        cols="3"
        :style="vColStyleObj"
        class="button-col"
      >
        <div class="button" @click="btnPush(rIdx, cIdx)">
          <v-responsive aspect-ratio="1" class="button-inner">
            <v-icon
              style="width: 100%; height: 100%;"
              :size="iconSize"
              color="rgba(255,255,255,0.6)"
              >{{ col }}</v-icon
            >
          </v-responsive>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import FirebaseTools from '../modules/FirebaseTools'
import '../assets/buttonIcons/style.css'
import { mapState } from 'vuex'

export default {
  name: 'Controller',

  data: function() {
    return {
      iconSize: 100,
      buttons: [],
      vRowStyleObj: `height: auto`,
      vColStyleObj: `filter: hue-rotate(0deg)`,
      theta: 0,
      seed: 1.0,
    }
  },
  computed: {
    ...mapState(['bpm']),
  },

  created: function() {
    this.$store.dispatch('getBpmData')
    for (let row = 0; row < 6; row++) {
      let cols = []
      for (let col = 0; col < 4; col++) {
        cols.push(`icon-${(row * 4 + col + 1).toString().padStart(3, '0')}`)
      }
      this.buttons.push({ id: row + 1, cols })
    }
  },

  methods: {
    computeIconSize: function() {
      try {
        const result = Math.min(
          this.$refs.controllerWrap.clientWidth / 4,
          this.$refs.controllerWrap.clientHeight / 6
        )
        if (result > 50) this.iconSize = result - 36
        else this.$nextTick(this.computeIconSize)
      } catch {
        this.iconSize = 50
      }
    },
    btnPush(rIdx, cIdx) {
      let basenum = rIdx * 4 + cIdx
      FirebaseTools.IncrementParam('action', 'obj' + (basenum + 1))
      FirebaseTools.AddLogs('logs', 'obj' + (basenum + 1))
    },
    handleResize() {
      this.vRowStyleObj = `height:${(window.innerHeight - 130) / 6}px`
    },
    rotateHue() {
      this.theta--
      if (this.theta < 0) {
        this.theta = 360
      }
      this.vColStyleObj = `filter: hue-rotate(${this.theta}deg)`
      setTimeout(this.rotateHue, 500)
    },
  },
  mounted: function() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
    this.rotateHue()
    addEventListener('resize', this.computeIconSize)
    this.computeIconSize()
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
  width: 100%;
  height: 100%;
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
