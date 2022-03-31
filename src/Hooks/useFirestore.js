import { useEffect, useState } from "react";
import { db } from "../firebase/config";

const useFirestore = (collection) => {
  const [data, getData] = useState([]);

  useEffect(() => {
    let collectionRef = db.collection(collection).orderBy("createdAt");
    const unsubscribe = collectionRef.onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      getData(data);
    });
    return unsubscribe;
  }, [collection]);
  return data;
};

export default useFirestore;
