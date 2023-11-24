"use client";
import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { UserAuth } from "../api/AuthContext";
import Card from "./ui/Card";
import { deleteUser } from "firebase/auth";

export const getUserAppointments = async (uid) => {
  const q = query(collection(db, "appointments"), where("uid", "==", uid));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export default function ProfileList({ lang }) {
  const { user, logOut } = UserAuth();
  const [userAppointments, setUserAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const appointments = await getUserAppointments(user.uid);
      setUserAppointments(appointments);
    };

    fetchData();
  }, [user]);

  const handleDeleteAccount = async () => {
    if (user) {
      // Perform any cleanup or additional actions before deleting the account
      // ...

      // Delete the account
      try {
        await deleteDoc(doc(db, "users", user.uid));
        await deleteUser(user);
        logOut();
      } catch (error) {
        console.error("Error deleting account:", error.message);
      }
    }
  };

  return (
    <>
      <div className="flex flex-wrap justify-center">
        {userAppointments.map((appointment, index) => (
          <div key={index} className="m-3 flex">
            {appointment.uid === user.uid && (
              <Card
                className="cursor-default"
                title={appointment.title}
                description={`Start Time: ${appointment.start
                  .toDate()
                  .toLocaleString()}`}
              />
            )}
          </div>
        ))}
      </div>
      <br />
      <hr className="border-[#e02f2f]" />
      <div className="flex flex-col items-center text-[#fd4242]">
        <p>Danger Zone</p>
        {user && (
          <div className="m-3">
            <button
              onClick={handleDeleteAccount}
              className="px-7 py-2.5 bg-[#e02f2f] text-rose-200 font-medium text-xl text-shadow-[0 0 50px [#e02f2f]] 
             rounded-full shadow-md ease-in duration-300 hover:bg-rose-300 hover:text-[#e02f2f] hover:shadow-lg hover:scale-110"
            >
              Delete My Account
            </button>
          </div>
        )}
      </div>
    </>
  );
}
