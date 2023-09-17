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
  return (
    <div className="sticky top-0 z-10 w-full items-center justify-between font-mono text-sm lg:flex dark">
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
      <UserMenu />
    </div>
  );
}
