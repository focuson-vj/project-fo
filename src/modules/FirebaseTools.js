"use strict";

import { firebase, db } from "../firebase";

const FirebaseTools = (_id, doc_id) => {
  let counterRef = db.collection(_id).doc(doc_id);
  counterRef.update({
      push: 0,
      pull: true,
      count: firebase.firestore.FieldValue.increment(1)
    })
    .then(function() {
      console.log("Document written!");
    }).catch(function(error) {
      console.error("Error adding document: ", error);
    });
};

export default FirebaseTools;
