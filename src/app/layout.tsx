
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jewlina by Aneya | Elegant Jewelry",
  description:
    "Discover timeless jewelry, rings, bracelets, watches and earrings at Jewlina by Aneya.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
