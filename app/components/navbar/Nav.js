import { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import UserMenu from "./UserMenu";

export const links = [
  { href: "/", name: "Home" },
  { href: "/design", name: "Design" },
  { href: "/aftercare", name: "Aftercare" },
  { href: "/contact", name: "Contact" },
  { href: "/book", name: "Book" },
];
export default function Nav() {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <div className="flex sticky top-0 z-10 w-full items-center justify-between font-mono text-sm  dark">
        <nav className="fixed left-0 top-0 flex w-full border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 drop-shadow-lg">
          <ul className="lg:flex md:hidden sm:hidden flex-wrap flex-row justify-between items-center w-full">
            <li>
              <Logo />
            </li>
            <li>
              <ul className="flex flex-row items-center">
                {links.map((link) => (
                  <li
                    key={link.href}
                    onClick={() => setActive(link.name)}
                    className={`m-7 text-2xl text-shadow-[0 0 50px #bae6fd] ${
                      active === link.name ? "text-sky-200" : "text-sky-500"
                    }`}
                  >
                    <Link href={link.href}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <UserMenu />
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
