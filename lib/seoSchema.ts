type BuildLocalBusinessSchemaArgs = {
  pageUrl: string;
  pageName?: string;
  description: string;
  areaServed: string[];
  images?: string[];
};


export function buildLocalBusinessSchema({
  pageUrl,
  pageName,
  description,
  areaServed,
  images = [],
}: BuildLocalBusinessSchemaArgs) {
  const SITE_NAME = "Soleado Moments";

  // Replace these with your real details:
  const BRAND_URL = "https://soleadomoments.co.uk";
  const PHONE = "+447848147550";
  const EMAIL = "info@soleadomoments.co.uk";
  const LOGO_URL = `${BRAND_URL}/images/logo.webp`;

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${pageUrl}#localbusiness`,
    name: pageName ? `${SITE_NAME} – ${pageName}` : SITE_NAME,
    url: pageUrl,
    image: images,
    logo: LOGO_URL,
    telephone: PHONE,
    email: EMAIL,
    priceRange: "££",
    description,
    areaServed: areaServed.map((name) => ({ "@type": "AdministrativeArea", name })),
    serviceType: "Soft play hire",
    // Optional: add your socials if you have them
    sameAs: ["https://www.instagram.com/soleadomoments/", "https://www.facebook.com/profile.php?id=61582782087780"],
    makesOffer: [
      {
        "@type": "Offer",
        name: "The Sunshine Starter",
        price: "70",
        priceCurrency: "GBP",
      },
      {
        "@type": "Offer",
        name: "The Little Rays Package",
        price: "100",
        priceCurrency: "GBP",
      },
      {
        "@type": "Offer",
        name: "The Soleado Signature",
        price: "130",
        priceCurrency: "GBP",
      },
    ],
  };
}

export function buildFaqSchema(faqs: Array<{ q: string; a: string }>, pageUrl: string) {
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
