"use client";
import Nav from "./Nav";
import { AuthContextProvider } from "../api/AuthContext";

export default function Layout({ children }) {
  return (
    <AuthContextProvider>
      <Nav />
      <main className="flex min-h-screen max-w-screen flex-col items-center justify-between p-16">
        {children}
      </main>
    </AuthContextProvider>
  );
}
