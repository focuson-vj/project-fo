"use strict";

import { db } from "../firebase";

const FirebaseTools = (id, doc_id) => {
  db.collection(id)
    .doc(doc_id)
    .set({
      push: 1,
      pull: true,
      count: 0
    })
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
    }).catch(function(error) {
      console.error("Error adding document: ", error);
    });
};

export default FirebaseTools;
