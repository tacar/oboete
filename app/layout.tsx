import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Action Words",
  description: "ビジネスや生活に役立つアクションのステップを提供",
  icons: {
    icon: [{ url: "./favicon.ico" }, { url: "./icon.png", type: "image/png" }],
    apple: { url: "./apple-icon.png" },
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
      <body>{children}</body>
    </html>
  );
}
