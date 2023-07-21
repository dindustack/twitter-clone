import "./globals.css";
import type { Metadata } from "next";
import { Barlow } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { RegisterModal } from "@/components/Modals/RegisterModal";
import { LoginModal } from "@/components/Modals/LoginModal";
import { NextAuthProvider } from "./providers";
import Layout from "@/components/Layout";
import { EditModal } from "@/components/Modals/EditModal";

export const metadata: Metadata = {
  title: "Twitter Clone",
  description: "A Twitter clone built with Next.js and Prisma.",
};

const barlow = Barlow({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: "normal",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-barlow",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${barlow.variable}`}>
      <body>
        <Toaster />
        <EditModal />
        <RegisterModal />
        <LoginModal />
        <NextAuthProvider>
          <Layout>{children}</Layout>
        </NextAuthProvider>
      </body>
    </html>
  );
}
