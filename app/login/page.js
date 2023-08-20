"use client";
import { useEffect } from "react";
import { UserAuth } from "../api/AuthContext";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const { user, googleSignIn } = UserAuth();

  const hadleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      router.push("/book");
    }
  }, [router, user]);

  return (
    <div className="border flex flex-col items-center md:w-1/2 m-auto p-14 rounded-3xl shadow-[5px_5px_15px_-1px_rgba(0,0,0,0.3)] z-50">
      <h1 className="text-cyan-600 font-bold text-2xl pb-14">SIGN IN WITH</h1>
      <div className="flex justify-center items-center pb-10">
        <button
          onClick={hadleSignIn}
          className="m-10 px-7 py-2.5 bg-sky-200 text-sky-900 font-medium text-xl text-shadow-[0 0 50px #bae6fd] 
             rounded-full shadow-md ease-in duration-300 hover:bg-sky-900 hover:text-sky-200 hover:shadow-lg hover:scale-110"
        >
          Google
        </button>
      </div>
    </div>
  );
}
