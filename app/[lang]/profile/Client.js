"use client";
import { UserAuth } from "../api/AuthContext";
import ProfileList from "../components/ProfileList";
import img from "../assets/logo2.png";
import Image from "next/image";

export default function Client() {
  const { user } = UserAuth();

  return (
    <div className="bg-gray-700 rounded-3xl shadow-lg m-auto p-8">
      <div className="relative flex max-md:flex-col border-b-2 items-center gap-10 pb-5 md:justify-around  md:mx-24 mx-10">
        <div className="flex flex-col items-center max-md:p-10">
          <Image
            className="m-auto rounded-full"
            width={120}
            height={120}
            src={user ? user.photoURL : img}
            alt="user-photo"
          />
        </div>
        <div className=" text-center justify-center">
          <h2 className="p-2 font-bold text-5xl text-cyan-600">
            {user ? user.displayName : "User Name"}
          </h2>
        </div>
      </div>
      <div className=" m-auto py-10">
        <div className="">
          {user ? (
            <div>
              <ProfileList />
            </div>
          ) : (
            <div className="flex justify-center mt-10">Make reservation</div>
          )}
        </div>
      </div>
    </div>
  );
}
