import React from "react";
import Nav from "./Nav";

export default function Layout({ children }) {
  return (
    <>
      <Nav />
      <main className="flex min-h-screen max-w-screen flex-col items-center justify-between p-16">
        {children}
      </main>
    </>
  );
}
