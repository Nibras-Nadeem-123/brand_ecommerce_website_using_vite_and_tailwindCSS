import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@components/header/Header";
import Footer from "@components/footer/Footer";
import { CartProvider } from "@/context/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Brand E-commerce",
  description: "Full-stack ecommerce application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <CartProvider>
        <Header />
        <div className="pt-35.5 bg-[#F7FAFC] pl-35.5 pr-35.5">
          {children}
        </div>
        <Footer />
      </CartProvider>
      </body>
    </html>
  );
}
