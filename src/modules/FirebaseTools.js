"use strict";

import { firebase, db } from "../firebase";

const IncrementParam = (_id, doc_id) => {
  let counterRef = db.collection(_id).doc(doc_id);
  counterRef
    .update({
      push: 0,
      pull: true,
      count: firebase.firestore.FieldValue.increment(1)
    })
    .then(function() {
      console.log("Document written!");
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
};

// エフェクトを変更する関数
// 押すボタンによってFirebaseに格納される値が変化する
const ChangeEffect = () => {
  return 0;
};

// スライダー
const Slider = () => {
  return 0;
};

// bpm情報を待ち受けてonSnapshotで受け取って
// 値をstoreに格納する関数
const bpmReceiver = () => {
  return 0;
};

export default {
  IncrementParam,
  ChangeEffect,
  Slider,
  bpmReceiver
};
