"use client";
import Nav from "./Nav";
import { AuthContextProvider } from "../api/AuthContext";
import { NextUIProvider } from "@nextui-org/react";

export default function Layout({ children }) {
  return (
    <AuthContextProvider>
      <NextUIProvider>
        <Nav />
        <main className="flex min-h-screen max-w-screen flex-col items-center justify-between p-16">
          <div className="dark">
          {children}
          </div>
        </main>
      </NextUIProvider>
    </AuthContextProvider>
  );
}
