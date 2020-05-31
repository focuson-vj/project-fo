<template>
  <v-footer dark padless app>
    <!-- DJの部分 -->
    <v-card
      class="d-flex justify-space-between align-center current subtitle-2"
      style="position: relative;"
      flat
      tile
      :style="{ color: color.text.body }"
    >
      <span class="current-left "> DJ </span>
      <span
        class="current-center headline"
        :style="{ color: color.text.accent }"
      >
        {{ current.dj }}
      </span>
      <span class="current-right"> {{ current.time }} </span>
    </v-card>
    <!-- スクロールの部分 -->
    <v-card class="d-flex align-center scroll marquee" flat tile>
      <span
        class="scroll-text marquee-inner text-no-wrap caption "
        :style="{ color: color.text.caption }"
      >
        {{ scrollText }}</span
      >
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: 'Information',
  data: () => ({
    current: {
      dj: 'Ryo Takei',
      time: '-17:10',
    },
    scrollText:
      'Next ▶ neru_kun ▶ 17:10-17:40  \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0  After The Next ▶ Totsu ▶ 17:40-18:10',
    color: {
      text: {
        caption: '#7d7d85',
        body: '#ceced9',
        accent: '#e01d75',
      },
    },
  }),
}
</script>

<style scoped>
.current {
  width: 100%;
  height: 32px;
}

.current-left {
  padding-left: 16px;
}

.current-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  -webkit-transform: translateY(-50%) translateX(-50%);
}

.current-right {
  padding-right: 16px;
}

.scroll {
  width: 100%;
  height: 24px;
}

.scroll-text {
  overflow-style: marquee;
  marquee-style: scroll;
  display: inline-block;
}

/* CF) CSSアニメーションでmarquee
       https://qiita.com/nissuk/items/7d5545a9f6177ff965dc */
/** マーキーさせたい部分 */
.marquee {
  overflow: hidden;
  /* スクロールバーが出ないように */
  position: relative;
  /* マーキーの内容部分の位置の基準になるように */
}

/* マーキーの内容部分の高さ確保 */
.marquee::after {
  content: '';
  white-space: nowrap;
  display: inline-block;
}

/* マーキーさせたい部分(内側) */
.marquee > .marquee-inner {
  position: absolute;
  top: 0;
  white-space: nowrap;
  animation-name: marquee;
  animation-timing-function: linear;
  animation-duration: 20s;
  animation-iteration-count: infinite;
}

/* マウスオーバーでマーキーストップ */
.marquee > .marquee-inner:hover {
  animation-play-state: paused;
  cursor: default;
}

/** マーキーアニメーション */
@keyframes marquee {
  0% {
    left: 100%;
    transform: translate(0);
  }

  100% {
    left: 0;
    transform: translate(-100%);
  }
}
</style>
