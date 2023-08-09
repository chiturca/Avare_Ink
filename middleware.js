import { useRouter } from "next/router";
import { useEffect } from "react";
import { UserAuth } from "./app/api/AuthContext";

export const useAdminOnly = () => {
  const router = useRouter();
  const auth = UserAuth();

  useEffect(() => {
    if (!auth.user) {
      router.push("/login");
      return;
    }

    if (!auth.user.isAdmin) {
      router.push("/");
    }

    if (auth.user.isAdmin) {
      router.push("/admin");
    }
  }, [auth.user, router]);

  return auth.user;
};
