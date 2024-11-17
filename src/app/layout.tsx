import { Header } from "@/app/components/header/header";
import { Providers } from "@/components/providers";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { Footer } from "./components/footer";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} relative flex min-h-screen w-screen flex-col bg-background px-20 pb-[100px] pt-[100px] font-geist-sans text-sm font-medium text-text ${geistMono.variable} antialiased`}
      >
        <Suspense fallback={<></>}>
          <Providers>
            <Header />
            {children}
            <Footer />

            {/* TODO: Customize toaster styling */}
            <Toaster
              position="top-right"
              toastOptions={{
                success: {
                  icon: "✅",
                  style: {
                    fontFamily: "var(--font-geist-mono)",
                    background: "#17ba0b",
                    color: "white",
                    borderColor: "#11c904",
                    borderWidth: "3px",
                    borderRadius: "10px",
                  },
                },
                error: {
                  icon: "❌",
                  style: {
                    fontFamily: "var(--font-geist-mono)",
                    background: "#a3150b",
                    color: "white",
                    borderColor: "#C02B1D",
                    borderWidth: "3px",
                    borderRadius: "10px",
                  },
                },
              }}
            />
          </Providers>
        </Suspense>
      </body>
    </html>
  );
}
