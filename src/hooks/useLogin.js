import { useAuthContext } from './useAuthContext';
import { auth, db } from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState, useEffect } from 'react';

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        if (!res) {
          throw new Error('Could not complete login');
        }
        //Dispatch login action
        dispatch({ type: 'LOGIN', payload: res.user });
        console.log('user logged in', res.user);

        //   //change online status
        //   await projectFirestore
        //     .collection('users')
        //     .doc(res.user.uid)
        //     .update({ online: true });

        //   //update state
        //   if (!isCancelled) {
        //     setIsPending(false);
        //     setError(null);
        //   }
      })
      .catch((err) => {
        // if (!isCancelled) {
        console.log(err.message);
        // console.log(err);
        setError(err.message);
        setIsPending(false);
        // }
      });
  };
  // useEffect(() => {
  //   return () => setIsCancelled(true);
  // }, []);

  return { error, isPending, login };
};
