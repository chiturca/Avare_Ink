"use client";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import Denied from "../denied/page";

const AdminDashboard = () => {
  const t = useTranslations("Admin");
  const { data: session } = useSession();

  if (session?.user?.role === "admin") {
    return (
      <div className="p-8">
        <Image
          className="m-auto h-16 w-16 rounded-full border-2 border-sky-200 shadow-md ease-in duration-300 hover:border-sky-900 hover:shadow-lg hover:scale-110"
          src={session?.user?.image}
          alt="UserAvatar"
          width={50}
          height={50}
        />
        <div className="text-white">{session?.user?.email}</div>
        <div className="text-white">{session?.user?.role}</div>
        <br />
        <Link href="/" className="text-3xl text-sky-500">
          Upload Images
        </Link>
      </div>
    );
  } else {
    return <Denied />;
  }
};

export default AdminDashboard;
