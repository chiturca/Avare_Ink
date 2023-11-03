"use client";
import { NextUIProvider } from "@nextui-org/react";
import { AuthContextProvider } from "../api/AuthContext";
import { IsClientCtxProvider } from "../api/IsClientCtx";
import Nav from "./navbar/Nav";
import Footer from "./footer/Footer";

export default function Layout({ children, lang }) {
  return (
    <AuthContextProvider>
      <NextUIProvider>
        <IsClientCtxProvider>
          <Nav lang={lang} />
          <main className="flex min-h-screen max-w-screen flex-col items-center justify-between px-16 py-8">
            <div className="dark">{children}</div>
          </main>
          <Footer lang={lang} />
        </IsClientCtxProvider>
      </NextUIProvider>
    </AuthContextProvider>
  );
}
