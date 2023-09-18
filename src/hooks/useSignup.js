import { useState, useEffect } from 'react';
import { auth, db } from '../firebase/config';
import { useAuthContext } from './useAuthContext';
import { projectStorage } from '../firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName, thumbnail) => {
    setError(null);
    setIsPending(true);

    //signup user
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        //signup user
        // const res = await auth.createUserWithEmailAndPassword(email, password);
        if (!res) {
          throw new Error('Could not complete signup');
        }

        //Dispatch login action
        dispatch({ type: 'LOGIN', payload: res.user });

        //update state
        // if (!isCancelled) {
        //   setIsPending(false);
        //   setError(null);
        // }
        // })
        // .then((res) => {
        //   //upload user profile image
        //   const uplaodPath = `thumbnails/${res.user.uid}/${thumbnail.name}`;
        //   const img = db.ref(uplaodPath).put(thumbnail);
        //   const imgUrl = img.ref.getDownloadURL();
        // })
        // .then((displayName, photoURL, imgUrl, res) => {
        //add display name to user
        // res.user.updateProfile({ displayName, photoURL: imgUrl });
        //create a user document
        // db.collection('users').doc(res.user.uid).set({
        //   online: true,
        //   displayName,
        //   photoURL: imgUrl,
        // });
      })
      .catch((err) => {
        // if (!isCancelled) {
        console.log(err);
        setError(err.message);
        setIsPending(false);
        // }
        setIsPending(false);
      });
    // useEffect(() => {
    //   return () => setIsCancelled(true);
    // }, []);
  };
  return { signup, error, isPending };
};
