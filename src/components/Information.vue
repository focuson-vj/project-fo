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
import { mapState } from 'vuex'

export default {
  name: 'Information',
  data: () => ({
    current: {
      dj: '',
      time: '',
    },
    scrollText: '',
    color: {
      text: {
        caption: '#7d7d85',
        body: '#ceced9',
        accent: '#e01d75',
      },
    },
    timeoutId: '',
  }),
  computed: {
    ...mapState(['actors']),
  },
  created: function() {
    this.$store.dispatch('getActorData')
  },
  methods: {
    formatActor() {
      const now = new Date()

      const dontFinishedActors = this.actors.filter((actor) => {
        return actor.time.toDate() > now
      })

      if (dontFinishedActors.length > 0) {
        const time = dontFinishedActors[0].time.toDate()

        this.current = {
          dj: dontFinishedActors[0].name,
          time: `-${time.getHours()}:${time.getMinutes()}`,
          index: this.actors.length - dontFinishedActors,
        }

        this.color.text.accent = dontFinishedActors[0].color

        // 前回setしたtimeoutを削除
        // (データベース上でなにか変更を行うとformatActorが走るので、複数のtimeoutがsetされてしまうのを防ぐため)
        clearTimeout(this.timeoutId)
        // 新しくtimeoutをset
        // 演者が変わるタイミングで発火
        this.timeoutId = setTimeout(
          this.formatActor,
          time.getTime() - now.getTime()
        )
      }

      //  スクロールするテキストの変更
      let scrollText = ''

      if (dontFinishedActors.length > 2) {
        const endOfAfterTheNext = new Date(dontFinishedActors[2].time * 1000)
        const startOfAfterTheNext = new Date(dontFinishedActors[1].time * 1000)
        scrollText = `\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 After The Next ▶ ${
          dontFinishedActors[2].name
        } ▶ ${this.getHHmm(startOfAfterTheNext)}-${this.getHHmm(
          endOfAfterTheNext
        )}`
      }
      if (dontFinishedActors.length > 1) {
        const endOfNext = new Date(dontFinishedActors[1].time * 1000)
        const startOfNext = new Date(dontFinishedActors[0].time * 1000)
        scrollText =
          `Next ▶ ${dontFinishedActors[1].name} ▶ ${this.getHHmm(
            startOfNext
          )}-${this.getHHmm(endOfNext)}` + scrollText
        this.scrollText = scrollText
      } else if (dontFinishedActors.length > 0) {
        this.scrollText = 'The DJ currently playing is the last'
      } else {
        this.scrollText = `Today's Focus On! has Ended.`
      }
    },
    getHHmm(date) {
      return (
        ('0' + date.getHours()).slice(-2) +
        ':' +
        ('0' + date.getMinutes()).slice(-2)
      )
    },
  },
  watch: {
    actors() {
      this.formatActor()
    },
  },
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
