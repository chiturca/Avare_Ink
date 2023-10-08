import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["tr", "en"],

  defaultLocale: "tr",
});

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
