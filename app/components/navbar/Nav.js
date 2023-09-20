import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "./Logo";
import UserMenu from "./UserMenu";
import menu from "../../assets/menu.png";
import close from "../../assets/close.png";

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
      <div className="flex sticky top-0 z-10 w-full justify-between font-mono text-sm dark">
        <nav className="fixed left-0 top-0 flex w-full border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 drop-shadow-lg">
          <ul className="lg:flex md:hidden sm:hidden flex-wrap flex-row justify-between items-center w-full">
            <li className="lg:flex md:hidden sm:hidden">
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

          {/* Mobile Navigation */}
          <div className="lg:hidden md:flex sm:flex flex-wrap flex-row justify-between items-center w-full p-8">
            <div>
              <Image
                src={toggle ? close : menu}
                alt="menu"
                className="w-[28px] h-[28px] object-contain"
                onClick={() => setToggle(!toggle)}
              />

              {/* Sidebar */}
              <div
                className={`${
                  !toggle ? "hidden" : "flex"
                } p-6 absolute top-20 left-0 mx-4 my-2 min-w-[140px] sidebar border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit rounded-xl border bg-gray-200 drop-shadow-lg`}
              >
                <ul className="list-none flex justify-end items-start flex-1 flex-col">
                  {links.map((nav, index) => (
                    <li
                      key={nav.href}
                      className={`font-poppins font-medium cursor-pointer text-[16px] ${
                        active === nav.name ? "text-sky-200" : "text-sky-500"
                      } ${index === links.length - 1 ? "mb-0" : "mb-4"}`}
                      onClick={() => setActive(nav.name)}
                    >
                      <Link href={nav.href}>{nav.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <Logo />
            <UserMenu />
          </div>
        </nav>
      </div>
    </>
  );
}
