import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Packages } from "@/components/Packages";
import { Gallery } from "@/components/Gallery";
import { Trust } from "@/components/Trust";
import { FAQ } from "@/components/FAQ";
import { Enquiry } from "@/components/Enquiry";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Soft Play Hire in Leigh, Wigan, Bolton & Warrington | Soleado Moments",
  description:
    "Boutique white soft play hire across Leigh, Wigan, Bolton & Warrington. Themed balls, optional personalisation, and delivery, set up & collection included. Check availability.",
  openGraph: {
    title: "Soft Play Hire in Leigh, Wigan, Bolton & Warrington | Soleado Moments",
    description:
      "Boutique white soft play hire across Leigh, Wigan, Bolton & Warrington. Themed balls, optional personalisation, and delivery, set up & collection included.",
    type: "website",
    url: "https://soleadomoments.co.uk",
  },
};

export default function Page() {
  return (
    <main className="min-h-dvh bg-paper text-ink">
      <Hero />
      <Packages />
      <Gallery />
      <Trust />
      <FAQ />
      <Enquiry />
    </main>
  );
}
