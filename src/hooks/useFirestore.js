import { useReducer, useEffect, useState } from 'react';
import { projectFirestore, timestamp } from '../firebase/config';

let initialState = {
  success: null,
  isPending: false,
  document: null,
  error: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case 'IS_PENDING':
      return {
        isPending: true,
        document: null,
        success: false,
        error: null,
      };
    case 'ADDED_DOCUMENT':
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case 'DELETED_DOCUMENT':
      return {
        isPending: false,
        document: null,
        success: true,
        error: null,
      };
    case 'UPDATED_DOCUMENT':
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case 'ERROR':
      return {
        isPending: false,
        document: null,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  //collection ref
  const ref = projectFirestore.collection(collection);

  //only dispacth if not cancelled
  const dispacthIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  //add document
  const addDocument = async (doc) => {
    dispatch({ type: 'IS_PENDING' });

    try {
      const createdAt = timestamp.fromDate(new Date());
      const addedDocument = await ref.add({ ...doc, createdAt });

      dispacthIfNotCancelled({
        type: 'ADDED_DOCUMENT',
        payload: addedDocument,
      });
    } catch (error) {
      console.log(error.message);
      dispacthIfNotCancelled({ type: 'ERROR', payload: error.message });
    }
  };

  //delete document
  const deleteDocument = async (id) => {
    dispatch({ type: 'IS_PENDING' });

    try {
      await ref.doc(id).delete();
      dispacthIfNotCancelled({
        type: 'DELETED_DOCUMENT',
      });
    } catch (error) {
      console.log(error.message);
      dispacthIfNotCancelled({ type: 'ERROR', payload: error.message });
    }
  };

  //upafate document
  const updateDocument = async (id, updates) => {
    const updateDocument = await ref.doc(id).update(updates);
    dispatch({ type: 'IS_PENDING' });

    try {
      dispacthIfNotCancelled({
        type: 'UPDATED_DOCUMENT',
        payload: updateDocument,
      });
    } catch (error) {
      console.log(error.message);
      dispacthIfNotCancelled({ type: 'ERROR', payload: error.message });
    }
  };

  useEffect(() => {
    return setIsCancelled(true);
  }, []);

  return {
    addDocument,
    deleteDocument,
    updateDocument,
    response,
  };
};
