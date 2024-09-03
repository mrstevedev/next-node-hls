import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import "bootstrap/dist/css/bootstrap.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BBP Music Library",
  description:
    "Compositions for Film Makers, Music Producers, Content Creators, Beats/Sampling, Etc.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
