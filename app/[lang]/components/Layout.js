"use client";
import { NextUIProvider } from "@nextui-org/react";
import { AuthContextProvider } from "../api/AuthContext";
import Nav from "./navbar/Nav";
import Footer from "./footer/Footer";

export default function Layout({ children, lang }) {
  return (
    <AuthContextProvider>
      <NextUIProvider>
        <Nav lang={lang} />
        <main className="flex min-h-screen max-w-screen flex-col items-center justify-between px-16 py-8">
          <div className="dark">{children}</div>
        </main>
        <Footer lang={lang} />
      </NextUIProvider>
    </AuthContextProvider>
  );
}
