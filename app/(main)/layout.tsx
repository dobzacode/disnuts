import Header from "@/components/header/Header";
import "@/app/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/footer/Footer";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
  viewport: "width=device-width,initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header
        height="h-[150px]"
        //top-[150px]
        textColor="text-neutral80"
        textType="sub-heading"
        logoColor="text-neutral80"
        logoType="heading font-bold tracking-widest"
        mobileTextType="sub-heading"
      ></Header>
      {children}
      <Footer
        height="h-[100px]"
        bgColor="bg-black"
        flex="flex items-center justify-center"
      ></Footer>
    </>
  );
}
