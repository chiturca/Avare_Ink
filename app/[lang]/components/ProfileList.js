"use client";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase";
import { UserAuth } from "../api/AuthContext";
import Card from "./ui/Card";

export const getUserAppointments = async (uid) => {
  const q = query(collection(db, "appointments"), where("uid", "==", uid));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export default function ProfileList() {
  const { user } = UserAuth();
  const [userAppointments, setUserAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const appointments = await getUserAppointments(user.uid);
      setUserAppointments(appointments);
    };

    fetchData();
  }, [user]);

  return (
    <div className="flex flex-wrap justify-center">
      {userAppointments.map((appointment, index) => (
        <div key={index} className="m-3 flex">
          {appointment.uid === user.uid && (
            <Card
              title={appointment.title}
              description={`Start Time: ${appointment.start
                .toDate()
                .toLocaleString()}`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
