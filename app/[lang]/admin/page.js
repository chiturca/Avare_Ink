"use client";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";

const AdminDashboard = () => {
  const t = useTranslations("Admin");
  const { data: session } = useSession();

  // console.log(session?.user);
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
        <Link href="/">Upload Images</Link>
      </div>
    );
  } else {
    return (
      <div>
        <p>You do not have permission to access this page.</p>
        <Link href="/">Go to the main page</Link>
      </div>
    );
  }
};

export default AdminDashboard;
