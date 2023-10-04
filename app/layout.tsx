import Header from "@/components/Header";
import "./globals.css";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "PriceWise",
  description:
    "Discover PriceWise, your go-to Amazon price tracking tool. Stay informed about price drops, availability, and get in-stock notifications for your favorite products. Save money and shop smart with PriceWise!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={spaceGrotesk.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
