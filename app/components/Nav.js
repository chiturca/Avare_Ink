import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Dropdown, Text } from "@nextui-org/react";
import { UserAuth } from "../api/AuthContext";
import Logo from "./Logo";
import Button from "./ui/Button";

export const links = [
  { href: "/", name: "Home" },
  { href: "/design", name: "Design" },
  { href: "/aftercare", name: "Aftercare" },
  { href: "/contact", name: "Contact" },
  { href: "/book", name: "Book" },
];
export default function Nav() {
  const { user, googleSignIn, logOut } = UserAuth();
  const [loading, setLoading] = useState(true);

  const hadleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };
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
    <div className="sticky top-0 z-10 w-full items-center justify-between font-mono text-sm lg:flex">
      <div className="z-10 w-full max-w-7xl items-center justify-between font-mono text-sm lg:flex drop-shadow-lg">
        <nav className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          <ul className="flex flex-row">
            <li>
              <Logo />
            </li>
            {links.map((link) => (
              <li
                key={link.href}
                className="m-7 text-sky-200 text-2xl text-shadow-[0 0 50px #bae6fd]"
              >
                <Link href={link.href}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {loading ? null : user ? (
        <div className="m-10 text-sky-200 text-2xl text-shadow-[0 0 50px #bae6fd] whitespace-nowrap cursor-pointer">
          <Dropdown placement="bottom-left">
            <Dropdown.Trigger>
              <Image
                className="m-auto h-16 w-16 rounded-full border-2 border-sky-200"
                src={user.photoURL}
                alt="UserAvatar"
                width={50}
                height={50}
              />
            </Dropdown.Trigger>
            <Dropdown.Menu color="primary" aria-label="Avatar Actions">
              <Dropdown.Item key="profile" css={{ height: "$18" }}>
                <Text b color="inherit" css={{ d: "flex" }}>
                  Signed in as
                </Text>
                <Text b color="inherit" css={{ d: "flex" }}>
                  {user.email}
                </Text>
              </Dropdown.Item>
              <Dropdown.Item key="settings" withDivider>
                My Settings
              </Dropdown.Item>
              <Dropdown.Item key="analytics" withDivider>
                Analytics
              </Dropdown.Item>
              <Dropdown.Item key="system">System</Dropdown.Item>
              <Dropdown.Item key="configurations">Configurations</Dropdown.Item>
              <Dropdown.Item key="help_and_feedback" withDivider>
                Help & Feedback
              </Dropdown.Item>
              <Dropdown.Item key="logout" color="error" withDivider>
                <div onClick={handleSignOut}>Sign Out</div>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      ) : (
        <Button onClick={hadleSignIn} name="Login" />
      )}
    </div>
  );
}
