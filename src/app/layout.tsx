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
            <div className="absolute inset-0">
              <div className="absolute top-[20%] left-[5%] h-[300px] w-[300px] rounded-full bg-purple-600/30 blur-[100px]" />
              <div className="absolute top-[20%] right-[10%] h-[400px] w-[400px] rounded-full bg-pink-600/30 blur-[100px]" />
              <div className="absolute bottom-[10%] left-[20%] h-[600px] w-[600px] rounded-full bg-purple-500/20 blur-[120px]" />
              <div className="absolute top-[40%] left-[30%] h-[300px] w-[300px] rounded-full bg-pink-500/20 blur-[90px]" />
              <div className="absolute top-[10%] left-[10%] h-[300px] w-[300px] rounded-full bg-pink-500/20 blur-[90px]" />
              <div className="absolute bottom-[5%] right-[20%] h-[450px] w-[450px] rounded-full bg-purple-400/20 blur-[110px]" />

              {/* Blur Points */}
              <div className="absolute top-[15%] left-[15%] h-[8px] w-[8px] rounded-full bg-purple-400/70 blur-[3px] animate-pulse" />
              <div className="absolute top-[45%] right-[25%] h-[6px] w-[6px] rounded-full bg-pink-400/60 blur-[2px] animate-pulse" />
              <div className="absolute bottom-[30%] left-[35%] h-[10px] w-[10px] rounded-full bg-purple-300/80 blur-[4px] animate-pulse" />
              <div className="absolute top-[60%] right-[40%] h-[12px] w-[12px] rounded-full bg-pink-300/50 blur-[5px] animate-pulse" />
              <div className="absolute top-[25%] left-[45%] h-[7px] w-[7px] rounded-full bg-purple-500/65 blur-[3px] animate-pulse" />
              <div className="absolute bottom-[15%] right-[15%] h-[9px] w-[9px] rounded-full bg-pink-500/75 blur-[4px] animate-pulse" />
            </div>
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
