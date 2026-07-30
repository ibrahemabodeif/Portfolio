import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ibrahem Abodeif — Full-stack developer",
  description:
    "Full-stack developer taking web apps & SaaS from first commit to production — end to end.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // Tells Next to suspend the smooth `scroll-behavior` set in globals.css
      // while it navigates, so route changes jump to the top instantly and
      // only in-page anchors animate. Next 16 stopped doing this by default.
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* Header and footer live here rather than in a page, so every route
          gets the same chrome and the sticky header survives navigation. */}
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
