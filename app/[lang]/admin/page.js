"use client";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useTranslations } from "next-intl";
import Link from "next/link";

const AdminDashboard = () => {
  const t = useTranslations("Admin");
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/adminsignin");
    },
  });
  console.log(session?.data?.user);
  return (
    <div className="p-8">
      <div className="text-white">{session?.data?.user?.email}</div>
      <div className="text-white">{session?.data?.user?.role}</div>
      <button className="text-white" onClick={() => signOut()}>
        {t("logout")}
      </button>
      <br />
      {session?.data?.user?.role === "admin" && (
        <Link href="/">Upload Images</Link>
      )}
    </div>
  );
};

export default AdminDashboard;
