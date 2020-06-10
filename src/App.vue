<template>
  <v-app>
    <v-dialog v-model="dialog" scrollable max-width="300px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Open Dialog
        </v-btn>
      </template>
      <v-card>
        <v-card-title>{{ this.appName }}へようこそ</v-card-title>

        <v-card-text style="text-align: justify;">
          <p style="margin:0;">
            ボタンを押すと対応するエフェクトが配信映像に合成されます。<br />
            気持ちが高ぶったその瞬間に、ボタンを押しまくって Focus On!
            を一緒に盛り上げましょう！
          </p>
        </v-card-text>

        <v-list dense>
          <v-subheader>リンク</v-subheader>
          <v-list-item-group color="primary">
            <v-list-item
              v-for="(item, i) in items"
              :key="i"
              @click="openLink(item.link)"
            >
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>

        <v-divider></v-divider>
        <v-btn
          class="body-2"
          color="blue darken-1"
          text
          @click="dialog2 = true"
          style="text-align: left; justify-content:left"
          >ライセンス</v-btn
        >
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog2" max-width="500px">
      <v-card>
        <v-card-title>
          ライセンス
        </v-card-title>
        <v-card-text>
          <a href="https://twemoji.twitter.com/">Twemoji</a><br />
          Copyright 2020 Twitter, Inc and other contributors
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-app-bar app right dark>
      <!-- アプリケーションバー -->
      <v-toolbar-title class="title">{{ this.appName }}</v-toolbar-title>
      <v-avatar>
        <img src="./assets/focuson_logo.png" alt="Logo of Focus On!" />
      </v-avatar>

      <v-spacer></v-spacer>
      <div>
        <v-icon class="icon" @click="shere()">fas fa-share-alt </v-icon>
        <v-icon class="icon" @click.stop="dialog = !dialog"
          >fas fa-info-circle
        </v-icon>
      </div>
    </v-app-bar>

    <v-content
      class="background"
      :style="{ animationDuration: `${(60 / this.bpm) * 4}s` }"
    >
      <Controller />
    </v-content>
    <Infomation />
  </v-app>
</template>

<style scoped>
.background {
  background: linear-gradient(0deg, #1d1d1d 47.5%, #4d4d4d 50%, #1d1d1d 52.5%);
  background-size: 400% 400%;
  animation-name: Animation;
  animation-iteration-count: infinite;
}

@keyframes Animation {
  0% {
    background-position: 0% 0%;
  }

  100% {
    background-position: 0% 100%;
  }
}

.icon {
  padding: 10px;
}

.title {
  position: absolute;
  top: 50%; /*親要素を起点に上から50%*/
  left: 50%; /*親要素を起点に左から50%*/
  transform: translateY(-50%) translateX(-50%); /*要素の大きさの半分ずつを戻す*/
  -webkit-transform: translateY(-50%) translateX(-50%);
}
</style>

<script>
import { mapState } from 'vuex'
import Controller from './components/Controller'
import Infomation from './components/Information'

export default {
  name: 'App',

  components: {
    Controller,
    Infomation,
  },

  data: () => ({
    appName: 'RemoSync(β)',
    dialog: false,
    dialog2: false,
    // リンク一覧
    items: [
      {
        text: 'Focus On! 公式アカウント',
        icon: 'fab fa-twitter',
        link: 'https://twitter.com/focus_on_dj',
      },
      {
        text: 'Focus On! Twitchチャンネル',
        icon: 'fab fa-twitch',
        link: 'https://www.twitch.tv/focuson_dj',
      },
      {
        text: 'heavysick ZERO',
        icon: 'fas fa-home',
        link: 'http://www.heavysick.co.jp/zero/',
      },
    ],
  }),

  computed: {
    ...mapState(['bpm']),
  },
  methods: {
    openLink(url) {
      window.open(url, 'newtab')
    },
    shere() {
      if (navigator.share) {
        navigator.share({
          title: this.appName,
          text: 'RemoSync(β): Focus On! のための視聴者参加型VJシステム',
          url: location.href,
        })
      }
    },
  },
}
</script>
