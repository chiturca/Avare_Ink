import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { UserAuth } from "../api/AuthContext";
import Logo from "./Logo";

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
        <ul>
          <li
            onClick={handleSignOut}
            className="m-7 text-sky-200 text-2xl text-shadow-[0 0 50px #bae6fd] whitespace-nowrap cursor-pointer"
          >
            <Image
              className="m-auto h-16 w-16 rounded-full border-2 border-sky-200"
              src={user.photoURL}
              alt="UserAvatar"
              width={50}
              height={50}
            />
          </li>
          <li
            onClick={handleSignOut}
            className="m-7 text-sky-200 text-2xl text-shadow-[0 0 50px #bae6fd] whitespace-nowrap cursor-pointer"
          >
            Sign Out
          </li>
        </ul>
      ) : (
        <ul>
          <li
            onClick={hadleSignIn}
            className="m-7 text-sky-200 text-2xl text-shadow-[0 0 50px #bae6fd] cursor-pointer"
          >
            Login
          </li>
        </ul>
      )}
    </div>
  );
}
