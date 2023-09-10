"use client";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const AdminDashboard = () => {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/signin");
    },
  });

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
