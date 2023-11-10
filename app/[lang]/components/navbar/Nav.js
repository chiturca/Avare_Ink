import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Logo from "./Logo";
import UserMenu from "./UserMenu";
import LocaleSwitcher from "./LocaleSwitcher";
import menu from "../../assets/menu.png";
import close from "../../assets/close.png";

export default function Nav({ lang }) {
  const t = useTranslations("navigation");
  const pathname = usePathname();
  const [toggle, setToggle] = useState(false);

  const links = [
    { href: "/", name: `${t("home")}` },
    { href: "/design", name: `${t("design")}` },
    { href: "/aftercare", name: `${t("aftercare")}` },
    { href: "/transportation", name: `${t("transportation")}` },
    { href: "/book", name: `${t("book")}` },
  ];
  return (
    <>
      <div className="flex sticky top-0 z-10 w-full justify-between font-mono text-sm dark">
        <nav className="static left-0 top-0 flex w-full border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit rounded-xl border bg-gray-200 p-4 drop-shadow-lg">
          <ul className="lg:flex flex-wrap flex-row justify-between items-center w-full hidden">
            <li>
              <Logo />
            </li>
            <li>
              <ul className="flex flex-row items-center">
                {links.map((link) => (
                  <li
                    key={link.href}
                    className="m-7 text-2xl text-shadow-[0 0 50px #bae6fd]"
                  >
                    <Link
                      className={
                        (pathname === `/${lang}` || pathname === "/") &&
                        link.href === "/"
                          ? "text-sky-200"
                          : pathname === `/${lang}${link.href}`
                          ? "text-sky-200"
                          : "text-sky-500"
                      }
                      href={`/${lang}${link.href}`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className="flex flex-col items-center">
              <LocaleSwitcher />
              <br />
              <UserMenu lang={lang} />
            </li>
          </ul>

          {/* Mobile Navigation */}
          <div className="lg:hidden flex flex-wrap flex-row justify-between items-center w-full p-4">
            <div>
              <Image
                src={toggle ? close : menu}
                alt="menu"
                className="w-[28px] h-[28px] object-contain"
                onClick={() => setToggle(!toggle)}
              />

              <div className="absolute z-10 font-mono text-sm dark">
                <div
                  className={`${
                    !toggle ? "hidden" : "flex"
                  } border-b border-gray-300 backdrop-blur-2xl bg-gradient-to-b from-zinc-200/30  dark:border-neutral-800 dark:bg-zinc-800 dark:from-inherit static rounded-xl border bg-gray-200 drop-shadow-lg m-4`}
                >
                  <ul className="list-none flex justify-end items-start flex-1 flex-col p-5">
                    {links.map((nav, index) => (
                      <li
                        key={nav.href}
                        className={`font-poppins font-medium cursor-pointer text-[16px] ${
                          index === links.length - 1 ? "mb-0" : "mb-4"
                        }`}
                      >
                        <Link
                          className={
                            (pathname === `/${lang}` || pathname === "/") &&
                            nav.href === "/"
                              ? "text-sky-200"
                              : pathname === `/${lang}${nav.href}`
                              ? "text-sky-200"
                              : "text-sky-500"
                          }
                          href={`/${lang}${nav.href}`}
                        >
                          {nav.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <Logo />
            <div className="flex flex-col items-center">
              <LocaleSwitcher />
              <br />
              <UserMenu />
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
