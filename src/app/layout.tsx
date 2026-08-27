import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Header } from "@/components/navbar/Header";
import { SeoHead } from "@/components/seo/SeoHead";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Free Online Invoice Generator - Create Professional Invoices Instantly",
  description: "Learn how to create invoices quickly. Free invoice generator and customizable invoice templates for freelancers and businesses. Download PDF invoices in seconds.",
  keywords: ["how to create invoices", "invoice generator", "invoice template", "free invoice generator", "free invoice template", "how to make an invoice", "invoice home"],
  openGraph: {
    title: "Free Online Invoice Generator - Create Professional Invoices Instantly",
    description: "Learn how to create invoices quickly. Free invoice generator and customizable invoice templates for freelancers and businesses.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Invoice Generator",
    description: "Create professional invoices instantly with our free online invoice generator.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAFA" },
    { media: "(prefers-color-scheme: dark)", color: "#09090B" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <SeoHead />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main className="flex-1">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}