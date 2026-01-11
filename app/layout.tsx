import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const SITE_URL = "https://soleadomoments.co.uk"; // ✅ keep this exact
const SITE_NAME = "Soleado Moments";

const DEFAULT_TITLE = "Boutique Soft Play Hire in Leigh | Soleado Moments";
const DEFAULT_DESC =
  "Photo-friendly white soft play hire based in Leigh, delivering across Wigan, Bolton & Warrington. Themed balls, optional personalisation, delivery, set up & collection included.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | Soleado Moments",
  },
  description: DEFAULT_DESC,

  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESC,
    images: [
      {
        url: "/logo.webp",
        width: 1200,
        height: 630,
        alt: "Soleado Moments – boutique white soft play hire",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESC,
    images: ["/logo.webp"],
  },

  // Optional but recommended
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-paper text-ink">
        <div className="flex min-h-dvh flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
