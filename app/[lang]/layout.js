import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { i18n } from "@/i18n.config";
import SessionProvider from "./SessionProvider";
import Layout from "./components/Layout";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Avare Ink",
  description: "Tattoo Studio Ankara Turkiye",
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({ children, params }) {
  let dictionaries;
  try {
    dictionaries = (await import(`../../dictionaries/${params.lang}.json`))
      .default;
  } catch (error) {
    console.log(error);
  }
  return (
    <html lang={params.lang}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={params.lang} messages={dictionaries}>
          <SessionProvider>
            <Layout lang={params.lang}>{children}</Layout>
          </SessionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
