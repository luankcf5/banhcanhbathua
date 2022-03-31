import firebase, { db } from "./config";

export const addDocument = (collection, data) => {
  const query = db.collection(collection);

  query.add({
    ...data,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
};

export const DelDocument = (collection, data) => {
  let collectionRef = db.collection(collection).where("uid", "==", data);
  collectionRef.get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      doc.ref.delete();
    });
  });
};
