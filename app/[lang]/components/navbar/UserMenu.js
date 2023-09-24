import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { UserAuth } from "../../api/AuthContext";
import Button from "../ui/Button";

export default function UserMenu() {
  const t = useTranslations("usermenu");
  const { user, logOut } = UserAuth();
  const [loading, setLoading] = useState(true);

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);
  return (
    <>
      {loading ? null : user ? (
        <div className="mr-5 text-sky-200 text-2xl text-shadow-[0 0 50px #bae6fd] whitespace-nowrap cursor-pointer">
          <Dropdown placement="bottom-left" className="dark">
            <DropdownTrigger>
              <Image
                className="m-auto h-16 w-16 rounded-full border-2 border-sky-200"
                src={user.photoURL}
                alt="UserAvatar"
                width={50}
                height={50}
              />
            </DropdownTrigger>
            <DropdownMenu color="primary" aria-label="Avatar Actions">
              <DropdownItem key="profile" css={{ height: "$18" }}>
                <p b color="inherit" css={{ d: "flex" }}>
                  {t("dropdownProfile")}
                </p>
                <p b color="inherit" css={{ d: "flex" }}>
                  {user.email}
                </p>
              </DropdownItem>
              <DropdownItem key="settings" withDivider>
                {t("dropdownSettings")}
              </DropdownItem>
              <DropdownItem key="analytics" withDivider>
                {t("dropdownAnalytics")}
              </DropdownItem>
              <DropdownItem key="system">{t("dropdownSystem")}</DropdownItem>
              <DropdownItem key="configurations">
                {t("dropdownConfigurations")}
              </DropdownItem>
              <DropdownItem key="help_and_feedback" withDivider>
                {t("dropdownHelp&Feedback")}
              </DropdownItem>
              <DropdownItem key="logout" color="error" withDivider>
                <div onClick={handleSignOut}>{t("dropdownLogout")}</div>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      ) : (
        <div className="">
          <Link href="/login">
            <Button name={t("login")} />
          </Link>
        </div>
      )}
    </>
  );
}
