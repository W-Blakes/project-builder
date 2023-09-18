import { useState, useEffect } from 'react';
import { projectFirestore } from '../firebase/config';

export default function useDocument(collection, id) {
  const [document, setDocument] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const ref = projectFirestore.collection(collection).doc(id);

    const unsubscribe = ref.onSnapshot(
      (snapshot) => {
        if (snapshot.data()) {
          setDocument({
            ...snapshot.data(),
            id: snapshot.id,
          });
          setError(null);
        } else {
          setError('No such document exists');
        }
      },
      (err) => {
        console.log(err.message);
        setError('failed to get document');
      }
    );
    // unsubcribe on unmount
    return () => {
      unsubscribe();
    };
  }, [collection, id]);
  return { document, error };
}
