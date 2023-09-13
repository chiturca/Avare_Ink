"use client";
import { auth } from "@/firebase";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const AdminDashboard = () => {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/signin");
    },
  });

  // const isAdmin = session?.data?.user?.claims?.isAdmin;

  // const a = async () => {
  //   const { idToken } = await auth.currentUser.getIdTokenResult();
  //   console.log(idToken.claims);
  // };
  // a();
  if (!isAdmin) {
    return (
      <>
        <div>You are not authorized to access this page.</div>
        <button className="text-white" onClick={() => signOut()}>
          Logout
        </button>
      </>
    );
  }

  return (
    <div className="p-8">
      <div className="text-white">{session?.data?.user?.email}</div>
      <button className="text-white" onClick={() => signOut()}>
        Logout
      </button>
    </div>
  );
};

export default AdminDashboard;
