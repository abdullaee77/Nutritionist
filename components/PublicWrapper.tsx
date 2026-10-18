"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppFloat from "./WhatsAppFloat";
import Preloader from "./Preloader";

export default function PublicWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isOwner = pathname.startsWith("/owner");

  return (
    <>
      {!isOwner && <Preloader />}
      {!isOwner && <Navbar />}
      <main>{children}</main>
      {!isOwner && <Footer />}
      {!isOwner && <WhatsAppFloat />}
    </>
  );
}