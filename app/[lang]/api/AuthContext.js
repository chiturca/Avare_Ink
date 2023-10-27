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

const adminEmails = ["sonmezmiray@gmail.com"];

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const { user: loggedInUser } = result;

      if (loggedInUser) {
        const userRef = doc(db, "users", loggedInUser.uid);
        await setDoc(userRef, {
          email: loggedInUser.email,
        });

        if (adminEmails.includes(loggedInUser.email)) {
          loggedInUser.role = "admin";
          console.log("User role: admin");
        } else {
          loggedInUser.role = "user";
          console.log("User role: user");
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
