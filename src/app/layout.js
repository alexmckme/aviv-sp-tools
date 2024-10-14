import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Aviv SP Helper",
  description: "Generated by create next app",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      'max-video-preview': 0,
      'max-image-preview': 'none',
      'max-snippet': 0,
    }
  }
};

export default function RootLayout({ children }) {
  return (
      <html lang="en">
      <head>
        <link rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=arrow_drop_down,arrow_drop_up,close,menu,payments,productivity,rocket_launch"/>
      </head>
      <body className={inter.className}>{children}</body>
      </html>
  );
}
