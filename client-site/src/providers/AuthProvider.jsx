/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase/firebase.init";
import axios from "axios";

export const AuthContext = React.createContext(null)
const AuthProvider = ({children}) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  // OnAuth State Change handler =====================
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async(currentUser) => {
      if (currentUser?.email) {
        setUser(currentUser);
        await axios.post(`${import.meta.env.VITE_api_url}/jwt`, {
          email: currentUser?.email
        },{withCredentials: true} )
      } else {
        setUser(null);
        await axios.post(`${import.meta.env.VITE_api_url}/logout`,{},{withCredentials: true} )
      }
      setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  
  //SignWithGoogle =========================
  const googleProvider = new GoogleAuthProvider();
  const signWithGoogle = ()=>{
    return signInWithPopup(auth, googleProvider)
  }


  // Sign Up user ==================================
  const signUpUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // sign In user ==================================
  const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  // Update user profile =================================
  const updateUserProfile = (updateInfo)=>{
    return updateProfile(auth.currentUser, updateInfo)
  }
  const signOutUser = () => {
    return signOut(auth);
  };
  const dataInfo = {
    loading,
    setLoading,
    user,
    signUpUser,
    signInUser,
    signOutUser,
    updateUserProfile,
    setUser,
    signWithGoogle,
  };
  return (
    <>
      <AuthContext.Provider value={dataInfo}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthProvider;