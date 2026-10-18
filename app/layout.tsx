import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Figtree, Quicksand } from "next/font/google";
import { Suspense } from "react"; // <-- ADD THIS IMPORT
import "./globals.css";
import AuthProvider from "../components/AuthProvider";
import PublicWrapper from "../components/PublicWrapper";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
});
const body = Figtree({ subsets: ["latin"], variable: "--font-body" });
const head = Quicksand({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-head" });

export const metadata: Metadata = {
  title: "Naflar Health Care — Clinical Dietitian & Nutrition Coach",
  description:
    "Evidence-based clinical nutrition joined with Sunnah-inspired balance. Feed the Purpose, Balance the Life.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#A8475A",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${head.variable}`}
    >
      <body suppressHydrationWarning>
        <AuthProvider>
          {/* 2. WRAP PUBLICWRAPPER IN SUSPENSE */}
          <Suspense fallback={<div>{children}</div>}>
            <PublicWrapper>{children}</PublicWrapper>
          </Suspense>
        </AuthProvider>
      </body>
    </html>
  );
}