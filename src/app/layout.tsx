import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import FloatingActions from "@/components/FloatingActions";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "TRECOM — Find, Buy, Rent & Sell Property in Bangalore",
    template: "%s · TRECOM",
  },
  description:
    "Discover verified properties across India. Buy, rent, sell apartments, villas, plots and commercial spaces from trusted owners, agents and builders.",
  metadataBase: new URL("https://trecom.in"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "TRECOM",
    title: "TRECOM — Find, Buy, Rent & Sell Property in Bangalore",
    description:
      "Discover verified properties, explore neighbourhoods and make smarter real-estate decisions in Bangalore.",
  },
  twitter: {
    card: "summary_large_image",
    title: "TRECOM Real Estate",
    description: "Find, buy, rent and sell property in Bangalore.",
  },
  alternates: {
    canonical: "https://trecom.in/",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          {children}
          <FloatingActions />
        </Providers>
      </body>
    </html>
  );
}
