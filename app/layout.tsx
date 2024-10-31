import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Session from "@/components/header/session";
import Navbar from "@/components/header/navbar";
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nexus",
  description: "Generated by Guille",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
         <Theme appearance='light' >
          <Toaster/>
      <Session>
      <Navbar/>
        {children}
        </Session>
        </Theme>
      </body>
    </html>
  );
}