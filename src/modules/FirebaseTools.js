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
const AddLogs = (_id, doc_id) => {
  let logRef = db.collection(_id);
  logRef.add({
    doc_id: doc_id,
    time: firebase.firestore.Timestamp.fromDate(new Date(Date.now()))
  }).then((docRef) => {
    console.log("Document: ", docRef);
  }).catch((error) => {
    console.log("Log Error: ", error);
  });
};

export default {
  IncrementParam,
  ChangeEffect,
  AddLogs,
};
