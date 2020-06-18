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
    <v-card
      ref="sc"
      class="scroll"
      style="font-size: 12px"
      :style="{ color: color.text.caption }"
    >
      <div class="scroll-innar" data-speed="0.8">
        <span>
          {{ scrollText }}
        </span>
      </div>
    </v-card>
  </v-footer>
</template>

<script>
import { mapState } from 'vuex'
import Marquee from '@egstad/marquee'

export default {
  name: 'Information',
  data: () => ({
    current: {
      dj: '',
      time: '',
    },
    scrollText: '',
    marqueeRepeat: 10,
    color: {
      text: {
        caption: '#7d7d85',
        body: '#ceced9',
        accent: '#e01d75',
      },
    },
    timeoutId: '',
    nbsp: '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0',
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
          time: `-${this.getHHmm(time)}`,
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
        scrollText =
          this.nbsp +
          `After The Next ▶ ${dontFinishedActors[2].name} ▶ ${this.getHHmm(
            startOfAfterTheNext
          )}-${this.getHHmm(endOfAfterTheNext)}`
      }
      if (dontFinishedActors.length > 1) {
        const endOfNext = new Date(dontFinishedActors[1].time * 1000)
        const startOfNext = new Date(dontFinishedActors[0].time * 1000)
        scrollText =
          `Next ▶ ${dontFinishedActors[1].name} ▶ ${this.getHHmm(
            startOfNext
          )}-${this.getHHmm(endOfNext)}` + scrollText
        this.scrollText = scrollText + this.nbsp
      } else if (dontFinishedActors.length > 0) {
        this.scrollText = 'The DJ currently playing is the last' + this.nbsp
      } else {
        this.scrollText = `Today's Focus On! has Ended.` + this.nbsp
      }
    },
    getHHmm(date) {
      return (
        ('0' + date.getHours()).slice(-2) +
        ':' +
        ('0' + date.getMinutes()).slice(-2)
      )
    },
    onVisible() {
      if (document.visibilityState == 'visible') {
        this.formatActor()
      }
    },
  },
  mounted: function() {
    new Marquee('.scroll-innar')
    document.addEventListener('visibilitychange', this.onVisible)
  },
  beforeDestroy: function() {
    document.removeEventListener('visibilitychange', this.onVisible)
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
  white-space: nowrap;
}

.current-right {
  padding-right: 16px;
}

.scroll {
  width: 100%;
  height: 24px;
}

.scroll-innar {
  white-space: nowrap;
}
</style>
