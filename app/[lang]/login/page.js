"use client";
import React, { useEffect } from "react";
// import ReCAPTCHA from "react-google-recaptcha";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useSession, signIn } from "next-auth/react";
import { UserAuth } from "../api/AuthContext";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";

const Login = () => {
  const t = useTranslations("Login");
  const router = useRouter();
  const { user, googleSignIn } = UserAuth();
  const { data: session } = useSession();
  // const recaptchaRef = useRef(null);

  const handleSignIn = async () => {
    try {
      // if (recaptchaRef.current) {
      //   recaptchaRef.current.execute();
      // }

      await googleSignIn();
      await signIn("google");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkUserRole = async () => {
      if (session && user) {
        const userDoc = doc(db, "users", user.uid);
        const userSnapshot = await getDoc(userDoc);

        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          const userRole = userData.role;

          if (userRole === "admin") {
            router.push("/admin");
          } else {
            router.push("/book");
          }
        }
      }
    };

    checkUserRole();
  }, [session, router, user]);

  return (
    <div className="border flex flex-col items-center md:w-1/2 m-auto p-14 px-40 rounded-3xl shadow-[5px_5px_15px_-1px_rgba(0,0,0,0.3)] z-50">
      <h1 className="text-cyan-600 font-bold text-2xl pb-8 whitespace-nowrap">
        {t("title")}
      </h1>
      <div className="flex flex-col justify-center items-center p-10">
        {/* <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={process.env.NEXT_PUBLIC_REACT_APP_RECAPTCHA_SITE_KEY}
          size="invisible"
          onChange={(value) => {
            console.log("reCAPTCHA value:", value);
          }}
          container="recaptcha-container"
        /> */}

        <button
          onClick={handleSignIn}
          className="m-10 px-7 py-2.5 bg-sky-200 text-sky-900 font-medium text-xl text-shadow-[0 0 50px #bae6fd] 
             rounded-full shadow-md ease-in duration-300 hover:bg-sky-900 hover:text-sky-200 hover:shadow-lg hover:scale-110"
        >
          Google
        </button>
      </div>
    </div>
  );
};

export default Login;
