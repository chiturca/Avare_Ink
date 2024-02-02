import { usePathname } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import Logo from "../navbar/Logo";

export default function Footer({ lang }) {
  const t = useTranslations("footer");
  const pathname = usePathname();

  const links = [
    { href: "/about", name: `${t("about")}` },
    { href: "/privacypolicy", name: `${t("privacypolicy")}` },
    { href: "/termsofservice", name: `${t("termsofservice")}` },
    { href: "/contact", name: `${t("contact")}` },
  ];
  const getHref = (path) => (lang === "en" ? `/${lang}${path}` : path);
  return (
    <div className="bottom-0 left-0 z-10 w-full justify-between font-mono text-sm dark">
      <footer className="static border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit  rounded-xl border bg-gray-200 lg:p-2 drop-shadow-lg m-4">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center justify-between">
            <div className="flex flex-row">
              <Logo />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white ml-3">
                Avare Ink
              </span>
            </div>
            <ul className="flex flex-wrap items-center my-6 text-sm font-medium text-gray-500 dark:text-gray-400">
              {links.map((link) => (
                <li key={link.href} className="mr-4 hover:underline md:mr-6">
                  <Link
                    className={
                      (pathname === `/${lang}` || pathname === "/") &&
                      link.href === "/"
                        ? "text-sky-200"
                        : pathname === getHref(link.href)
                        ? "text-sky-200"
                        : "text-sky-500"
                    }
                    href={getHref(link.href)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023{" "}
            <a href="https://avare-ink.vercel.app/" className="hover:underline">
              Avare Ink™
            </a>
            . {t("reserved")}.
          </span>
        </div>
      </footer>
    </div>
  );
}
