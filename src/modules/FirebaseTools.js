"use strict";

import { firebase, db } from "../firebase";

const IncrementParam = (_id, doc_id) => {
  let counterRef = db.collection(_id).doc(doc_id);
  counterRef
    .update({
      doc_id: doc_id,
      count: firebase.firestore.FieldValue.increment(1)
    })
    .then(function() {

    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
};

// スライダー
const AddLogs = (_id, doc_id) => {
  let logRef = db.collection(_id);
  logRef.add({
    doc_id: doc_id,
    time: firebase.firestore.Timestamp.fromDate(new Date(Date.now()))
  }).then(() => {

  }).catch((error) => {
    console.log("Log Error: ", error);
  });
};

// エフェクトを変更する関数
// 押すボタンによってFirebaseに格納される値が変化する
const ChangeEffect = () => {
  return 0;
};

export default {
  IncrementParam,
  ChangeEffect,
  AddLogs
};
