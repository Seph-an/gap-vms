"use client";
import "@styles/globals.css";
import { Providers } from "./Providers";
import Head from "next/head";
import { useEffect } from "react";

export const metadata = {
  title: "Visitors Management System | GRSL",
  description: "Recruitment | Payroll Management | Jobs | Career Development",
  favicon: "/favicon.ico",
};

const RootLayout = ({ children }) => {
  // useEffect(() => {
  //   if ("serviceWorker" in navigator) {
  //     navigator.serviceWorker
  //       .register("/service-worker.js")
  //       .then((registration) => {
  //         console.log("Service Worker registered:", registration);
  //       })
  //       .catch((error) => {
  //         console.error("Service Worker registration failed:", error);
  //       });
  //   }
  // }, []);

  return (
    <html lang="en">
      <Head>
        <meta name="theme-color" content="#59d6d7" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <body>
        <div className="main"></div>
        <Providers>
          <main className="app">{children}</main>
        </Providers>
      </body>
    </html>
  );
};
export default RootLayout;
