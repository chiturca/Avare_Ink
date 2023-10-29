import React, { useContext, createContext, useState, useEffect } from "react";
import {
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../../../firebase";
import { doc, setDoc } from "firebase/firestore";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const { user: loggedInUser } = result;

      if (loggedInUser) {
        const userRef = doc(db, "users", loggedInUser.uid);
        if (loggedInUser.email === process.env.NEXT_PUBLIC_ADMIN_MAIL) {
          await setDoc(userRef, {
            email: loggedInUser.email,
            role: "admin",
          });
        } else {
          await setDoc(userRef, {
            email: loggedInUser.email,
            role: "user",
          });
        }
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  const logOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out successful");
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      // if (currentUser) {
      //   const tokenResult = await currentUser.getIdTokenResult();
      //   setUserClaims(tokenResult.claims);
      // }
    });
    return () => unsubscribe();
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        googleSignIn,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
