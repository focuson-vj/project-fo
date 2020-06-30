# project-fo

このプロジェクトは、スマートフォンでリアルタイムに遠隔地にOSCを送るアプリケーションです。私達はこのソフトウェアを[RemoSync](https://project-fo.web.app)というVJシステムのために作りました。

## Description

FirebaseのFirestoreを使うことでサーバレスでフロントエンドからクライアントにOSCを送れます。ユーザの操作をFirestoreにアップロードするVue.js製のアプリケーション(このレポジトリ)とFirestoreの変更を検知してOSCを送信するアプリケーション([MountConverter](https://github.com/focuson-vj/MountConverter))をセットで利用します。


## Frontend

Vue.js + Vuex で構成しています。
* `src\App.vue`: アプリケーションページ
* `src\components\Controller.vue`:	4x6マトリクスのコントローラ
* `src\components\Information.vue`: プレイ中のDJ情報の表示部


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Deploy
```
npm install -g firebase-tools
npm run build
firebase login
firebase deploy
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Licence
MIT

## Author
Focus On! VJ Team
