"use client";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useTranslations } from "next-intl";
import { auth } from "../../../firebase";
import { setCustomClaimMiddleware } from "../middleware";

const AdminDashboard = () => {
  const t = useTranslations("Admin");
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/adminsignin");
    },
  });

  const isAdmin = session?.data?.user?.claims?.isAdmin;

  console.log(session?.data?.user?.claims);
  console.log(auth.currentUser);
  console.log(isAdmin);

  const a = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        if (idTokenResult.claims.isAdmin) {
          console.log("Is an admin");
        } else {
          console.log("Not an admin");
        }
      } else {
        console.log("User is not authenticated.");
      }
    } catch (error) {
      console.error("Error getting custom claims:", error);
    }
  };

  a();
  // if (!isAdmin) {
  //   return (
  //     <>
  //       <div>You are not authorized to access this page.</div>
  //       <button className="text-white" onClick={() => signOut()}>
  //         Logout
  //       </button>
  //     </>
  //   );
  // }

  return (
    <div className="p-8">
      <div className="text-white">{session?.data?.user?.email}</div>
      <button className="text-white" onClick={() => signOut()}>
        {t("logout")}
      </button>
    </div>
  );
};

export default AdminDashboard;
export const middleware = [setCustomClaimMiddleware];
