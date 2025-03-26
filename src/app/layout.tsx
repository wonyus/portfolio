import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar/Navbar";
import { Analytics } from "@vercel/analytics/next";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WonYus's Portfolio",
  description: "Created by wonyus",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Theme appearance="dark">
          <div className="flex">
            <div id="left-section" className="w-[20%] lg:w-[20%] md:w-[10%]"></div>
            <div id="middle-section" className="w-[60%] lg:w-[60%] md:w-[80%]">
              <Navbar />
              <main>{children}</main>
            </div>
            <div id="right-section" className="w-[20%] lg:w-[20%] md:w-[10%]"></div>
          </div>
          <Analytics />
        </Theme>
      </body>
    </html>
  );
}
