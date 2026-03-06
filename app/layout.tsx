import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Providers } from "./providers";
import { LuminousNavbar } from "@/components/shared/LuminousNavbar";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { LeadFormModal } from "@/components/shared/LeadFormModal";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Adotzee | Elite Education Discovery Protocol",
  description: "Advanced institutional synchronization and strategic academic discovery platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-white overflow-x-hidden relative`}>
        {/* Subtle noise grain for premium paper feel */}
        <div
          className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-0.02 mix-blend-overlay"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
        />
        <Providers>
          <LuminousNavbar />
          <main className="flex-1">
            {children}
          </main>
          <WhatsAppButton />
          <LeadFormModal />
          <Toaster position="top-center" expand={false} richColors />
        </Providers>
      </body>
    </html>
  );
}
