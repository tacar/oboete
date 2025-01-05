import type { Metadata } from "next";
import React from "react";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "この流れは覚えておきたい",
  description: "ビジネスや生活に役立つアクションのステップを提供",
  icons: {
    icon: [{ url: "./favicon.ico" }, { url: "./icon.png", type: "image/png" }],
    apple: { url: "./apple-icon.png" },
  },
  openGraph: {
    title: "この流れは覚えておきたい",
    description: "ビジネスや生活に役立つアクションのステップを提供",
    images: [
      {
        url: "./og-image.png",
        width: 1200,
        height: 630,
        alt: "この流れは覚えておきたい",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "この流れは覚えておきたい",
    description: "ビジネスや生活に役立つアクションのステップを提供",
    images: ["./og-image.png"],
    creator: "@tacarzen",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head />
      <body className="flex flex-col min-h-screen">
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
