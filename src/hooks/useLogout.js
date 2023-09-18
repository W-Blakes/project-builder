import { useState, useEffect } from 'react';
import { auth, db } from '../firebase/config';
import { signOut } from 'firebase/auth';
import { useAuthContext } from './useAuthContext';

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch, user } = useAuthContext();

  const logOut = async () => {
    setError(null);
    setIsPending(true);

    //sign the user out
    // try {
    //update online status
    // const { uid } = user;
    // await db
    //   .collection('users')
    //   .doc(uid)
    //   .update({ online: false });

    signOut(auth)
      .then(() => {
        //dispacth logout action
        dispatch({ type: 'LOGOUT' });
        console.log('user signed out');
      })
      .catch((err) => {
        console.log(err.message);
        // if (!isCancelled) {
        // console.log(err);
        setError(err.message);
        setIsPending(false);
        // }
      });

    //update state
    // if (!isCancelled) {
    //   setIsPending(false);
    //   setError(null);
    // }
    // } catch (err) {
    // }
    // setIsPending(false);
  };

  // useEffect(() => {
  //   return () => setIsCancelled(true);
  // }, []);

  return { logOut, error, isPending };
};
