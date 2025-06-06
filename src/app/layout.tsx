import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";

const benyoritha = localFont({
  src: [
    {
      path: "../assets/TT Norms Pro Serif Trial Normal.ttf",
      weight: "400",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "Fire Kitchen",
  description: "App by Kuma",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased ${benyoritha.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
