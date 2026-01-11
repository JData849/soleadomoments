import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { Enquiry } from "@/components/Enquiry";

type Location = {
  slug: "leigh" | "wigan" | "bolton" | "warrington";
  name: string;
  strap: string;
  intro: string;
  bullets: string[];
  nearby: Array<{ label: string; href: string }>;
};

const LOCATIONS: Record<string, Location> = {
  leigh: {
    slug: "leigh",
    name: "Leigh",
    strap: "Leigh-based soft play hire, covering Wigan, Bolton, Warrington and nearby areas.",
    intro:
      "Soleado Moments provides boutique, photo-friendly white soft play for parties and events in Leigh. Choose your package, pick your theme, and we’ll match the balls and optional decals so it fits your setup properly (not like a random bouncy clutter pile). Delivery, set up and collection included.",
    bullets: [
      "White soft play that photographs beautifully",
      "Theme-matching balls for your colour scheme",
      "Optional personalisation (included in Signature)",
      "Delivery, set up & collection included",
    ],
    nearby: [
      { label: "Soft play hire in Wigan", href: "/soft-play-hire/wigan" },
      { label: "Soft play hire in Bolton", href: "/soft-play-hire/bolton" },
      { label: "Soft play hire in Warrington", href: "/soft-play-hire/warrington" },
    ],
  },

  wigan: {
    slug: "wigan",
    name: "Wigan",
    strap: "Soft play hire in Wigan with delivery, set up and collection included.",
    intro:
      "Hiring soft play in Wigan should be simple: pick your package, choose your theme, and we handle the rest. Our white soft play looks clean in photos, works beautifully in homes or halls, and can be themed using matching ball colours and optional personalised decals.",
    bullets: [
      "Perfect for home parties and indoor venues",
      "Themed ball colours to suit your party",
      "Three clear packages with upfront pricing",
      "We deliver, set up and collect",
    ],
    nearby: [
      { label: "Soft play hire in Leigh", href: "/soft-play-hire/leigh" },
      { label: "Soft play hire in Bolton", href: "/soft-play-hire/bolton" },
      { label: "Soft play hire in Warrington", href: "/soft-play-hire/warrington" },
    ],
  },

  bolton: {
    slug: "bolton",
    name: "Bolton",
    strap: "Boutique soft play hire in Bolton for birthdays, christenings and family events.",
    intro:
      "Soleado Moments delivers photo-friendly white soft play to Bolton with themed balls and optional personalisation. Whether it’s a birthday at home or a hall hire, we’ll set everything up and collect afterwards so your day runs smoothly.",
    bullets: [
      "Clean, white, photo-friendly soft play",
      "Themed balls to match your decor",
      "Optional personalised decals",
      "Delivery, set up & collection included",
    ],
    nearby: [
      { label: "Soft play hire in Leigh", href: "/soft-play-hire/leigh" },
      { label: "Soft play hire in Wigan", href: "/soft-play-hire/wigan" },
      { label: "Soft play hire in Warrington", href: "/soft-play-hire/warrington" },
    ],
  },

  warrington: {
    slug: "warrington",
    name: "Warrington",
    strap: "Soft play hire in Warrington with themed balls and optional personalisation.",
    intro:
      "If you’re planning a party in Warrington, our boutique white soft play is designed to look great and keep little ones entertained. Choose a package, pick a theme, and we’ll deliver, set up, and collect after your event. Simple.",
    bullets: [
      "Perfect for birthdays and christenings",
      "Theme-matching balls available",
      "Personalised decals available (included in Signature)",
      "Delivery, set up & collection included",
    ],
    nearby: [
      { label: "Soft play hire in Leigh", href: "/soft-play-hire/leigh" },
      { label: "Soft play hire in Wigan", href: "/soft-play-hire/wigan" },
      { label: "Soft play hire in Bolton", href: "/soft-play-hire/bolton" },
    ],
  },
};

/** Build on-page FAQs (and schema) without needing loc.faqs */
const DEFAULT_FAQS = (locName: string) => [
  {
    q: `Do you deliver to ${locName}?`,
    a: `Yes. We deliver across ${locName} and nearby areas. Send your postcode/area when you enquire and we’ll confirm availability and delivery details.`,
  },
  {
    q: "What’s included with hire?",
    a: "Delivery, set up and collection are included. You choose your package, and we can theme the ball colours to match your party.",
  },
  {
    q: "How much space do I need?",
    a: "It depends on the package and the venue. Most setups work well in a cleared living room or a small hall space. Tell us your venue type and we’ll advise quickly.",
  },
  {
    q: "Can you match my party theme?",
    a: "Yes. We can match ball colours to your theme. Personalised name and decor-matching decals are included in our Signature package and available as an add-on for other packages.",
  },
  {
    q: "How do I book?",
    a: "Send your date, postcode/area, package choice and theme. We’ll confirm availability and reply with the next steps.",
  },
  {
    q: "What ages is the setup best for?",
    a: "Designed for toddlers and young children. Ideal for birthdays, christenings and family events.",
  },
];

function buildLocalBusinessJsonLd(args: {
  pageUrl: string;
  locName: string;
  description: string;
}) {
  // Replace these with your real details
  const BRAND_URL = "https://soleadomoments.co.uk";
  const PHONE = "+447848147550";
  const EMAIL = "info@soleadomoments.co.uk";
  const LOGO_URL = `${BRAND_URL}/images/logo.webp`;

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${args.pageUrl}#localbusiness`,
    name: `Soleado Moments – Soft play hire in ${args.locName}`,
    url: args.pageUrl,
    telephone: PHONE,
    email: EMAIL,
    logo: LOGO_URL,
    image: [`${BRAND_URL}/images/hero.webp`],
    description: args.description,
    priceRange: "££",
    serviceType: "Soft play hire",
    areaServed: [
      { "@type": "AdministrativeArea", name: args.locName },
      { "@type": "AdministrativeArea", name: "Leigh" },
      { "@type": "AdministrativeArea", name: "Wigan" },
      { "@type": "AdministrativeArea", name: "Bolton" },
      { "@type": "AdministrativeArea", name: "Warrington" },
      { "@type": "AdministrativeArea", name: "Greater Manchester" },
    ],
    makesOffer: [
      { "@type": "Offer", name: "The Sunshine Starter", price: "70", priceCurrency: "GBP" },
      { "@type": "Offer", name: "The Little Rays Package", price: "100", priceCurrency: "GBP" },
      { "@type": "Offer", name: "The Soleado Signature", price: "130", priceCurrency: "GBP" },
    ],
  };
}

function buildFaqJsonLd(faqs: Array<{ q: string; a: string }>, pageUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };
}

export async function generateStaticParams() {
  return Object.keys(LOCATIONS).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const loc = LOCATIONS[slug];
  if (!loc) return { title: "Soft play hire | Soleado Moments" };

  // Leigh-led style metadata, but location-specific
  const descriptionBySlug: Record<string, string> = {
    leigh:
      "Boutique white soft play hire in Leigh. Themed balls, optional personalisation, and delivery, set up & collection included. Check availability today.",
    wigan:
      "Soft play hire in Wigan with photo-friendly white setup. Choose your package, match your theme with coloured balls, and we deliver, set up & collect.",
    bolton:
      "White soft play hire in Bolton for birthdays and family events. Themed balls, optional personalisation, and delivery, set up & collection included. Enquire now.",
    warrington:
      "Boutique soft play hire in Warrington. Clean white setup, themed balls to match your party, personalisation available, plus delivery, set up & collection included.",
  };

  return {
    title: `Soft Play Hire in ${loc.name} | Soleado Moments`,
    description: descriptionBySlug[slug] ?? `Soft play hire in ${loc.name}. Delivery, set up & collection included.`,
  };
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const loc = LOCATIONS[slug];

  if (!loc) {
    return (
      <main className="py-16">
        <Container>
          <h1 className="text-3xl text-ink">Location not found</h1>
          <p className="mt-2 text-ink/80">Try one of our service areas.</p>
          <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {Object.values(LOCATIONS).map((x) => (
              <Link
                key={x.slug}
                href={`/soft-play-hire/${x.slug}`}
                className="rounded-2xl border border-line bg-paper px-4 py-3 text-sm text-ink/85 shadow-soft transition hover:-translate-y-px hover:shadow-float"
              >
                Soft play hire in {x.name}
              </Link>
            ))}
          </div>
        </Container>
      </main>
    );
  }

  // Replace with your real domain (used for schema IDs + URLs)
  const BRAND_URL = "https://soleadomoments.co.uk";
  const pageUrl = `${BRAND_URL}/soft-play-hire/${loc.slug}`;

  const faqs = DEFAULT_FAQS(loc.name);

  const localBusinessJsonLd = buildLocalBusinessJsonLd({
    pageUrl,
    locName: loc.name,
    description: `Boutique white soft play hire in ${loc.name}. Themed balls, optional personalisation, and delivery, set up & collection included.`,
  });

  const faqJsonLd = buildFaqJsonLd(faqs, pageUrl);

  return (
    <main>
      {/* JSON-LD: must reflect visible content */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* HERO */}
      <section className="paper-grain py-14">
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="inline-flex rounded-full border border-brand/25 bg-brand/10 px-3 py-1 text-xs text-ink/80">
              Serving {loc.name} + nearby areas
            </p>

            <h1 className="mt-4 text-4xl leading-[1.05] text-ink sm:text-5xl">
              Soft Play Hire in {loc.name}
            </h1>

            <p className="mt-3 text-ink/80">{loc.strap}</p>
            <p className="mt-4 max-w-prose text-sm leading-relaxed text-ink/80">{loc.intro}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="#enquiry">Check availability</Button>
              <Button href="/#packages" variant="ghost">
                View packages
              </Button>
            </div>

            <ul className="mt-7 grid gap-2 text-sm">
              {loc.bullets.map((b) => (
                <li key={b} className="flex gap-2 text-ink/85">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  {b}
                </li>
              ))}
            </ul>

            {/* mini trust strip */}
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                { t: "Photo-friendly", d: "Clean white soft play that looks beautiful in photos." },
                { t: "Theme matched", d: "Ball colours to suit your theme and decor." },
                { t: "Delivery included", d: "We deliver, set up, and collect after your event." },
                { t: "Parent-proof", d: "Simple packages, clear pricing, quick booking." },
              ].map((x) => (
                <div key={x.t} className="rounded-3xl border border-line bg-paper/70 p-4 shadow-soft">
                  <div className="text-sm font-medium text-ink">{x.t}</div>
                  <div className="mt-1 text-sm text-ink/80">{x.d}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-4xl bg-gradient-to-b from-brand/12 to-transparent blur-2xl" />
            <div className="relative overflow-hidden rounded-4xl border border-line bg-paper/70 shadow-float">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/hero.webp"
                  alt="Soleado Moments soft play setup"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />
              </div>
              <div className="border-t border-line bg-paper/70 px-5 py-4 text-sm">
                <div className="font-medium text-ink">Boutique, photo-friendly soft play</div>
                <div className="text-ink/80">Themed balls + optional decals to match your party</div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* MINI GALLERY */}
      <section className="border-y border-line/70 bg-paper/60 py-14" id="gallery">
        <Container>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl text-ink">Recent setups</h2>
              <p className="mt-2 max-w-prose text-ink/80">
                Real photos from our white soft play setup, themed with ball colours.
              </p>
            </div>
            <Button href="#enquiry" variant="ghost">
              Enquire now
            </Button>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "/images/setup-baptism.webp",
              "/images/setup-first-birthday.webp",
              "/images/setup-winter.webp",
              "/images/balls-halloween.webp",
            ].map((src) => (
              <div
                key={src}
                className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-line bg-paper shadow-soft"
              >
                <Image src={src} alt="Soft play setup photo" fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-14" id="faq">
        <Container>
          <h2 className="text-3xl text-ink">FAQ for {loc.name}</h2>
          <p className="mt-2 max-w-prose text-ink/80">Quick answers so you can book without back-and-forth.</p>

          <div className="mt-8 grid gap-4">
            {faqs.map((f) => (
              <div key={f.q} className="rounded-4xl border border-line bg-paper/70 p-6 shadow-soft">
                <div className="text-base font-medium text-ink">{f.q}</div>
                <div className="mt-2 text-sm leading-relaxed text-ink/80">{f.a}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-4xl border border-brand/25 bg-brand/10 p-6 shadow-soft">
            <h3 className="text-xl text-ink">Nearby areas</h3>
            <p className="mt-2 text-sm text-ink/80">
              If {loc.name} isn’t your exact location, use the page closest to you:
            </p>

            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              {loc.nearby.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className="rounded-2xl border border-line bg-paper px-4 py-3 text-sm text-ink/85 shadow-soft transition hover:-translate-y-px hover:shadow-float"
                >
                  {n.label}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ENQUIRY */}
      <Enquiry heading={`Check availability in ${loc.name}`} presetArea={loc.name} sourceLabel={`Location page: ${loc.name}`} />
    </main>
  );
}
