"use client";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useTranslations } from "next-intl";

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
    </div>
  );
};

export default AdminDashboard;
