# project-fo

このプロジェクトは、スマートフォンでリアルタイムに遠隔地に OSC を送るアプリケーションです。私達はこのソフトウェアを[RemoSync](https://project-fo.web.app)という VJ システムのために作りました。

## Description

Firebase の Firestore を使ってサーバレスでフロントエンドからクライアントに OSC を送るアプリケーションです。ユーザの操作を Firestore にアップロードする Vue.js 製のコントローラアプリケーション(このレポジトリ)と Firestore の変更を検知して VJ ソフトなどに OSC を送信するアプリケーション([MountConverter](https://github.com/focuson-vj/MountConverter))をセットで利用します。

## Frontend

Vue.js + Vuex で構成しています。

- `src\App.vue`: アプリケーションページ
- `src\components\Controller.vue`: 4x6 マトリクスのコントローラ
- `src\components\Information.vue`: プレイ中の DJ 情報の表示部

## Project setup

```
npm install
```

## Licence

MIT

## Author

Focus On! VJ Team
