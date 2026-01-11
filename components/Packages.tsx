"use client";

import { useRef } from "react";
import { Container } from "./Container";
import { Button } from "./Button";
import { registerGSAP, gsap, ScrollTrigger } from "@/lib/gsap";
import { useGsap } from "@/hooks/useGsap";

type Package = {
  name: string;
  price: string;
  tagline: string;
  bulletsLead?: string;
  bullets: string[];
  note: string;
  featured?: boolean;
  badge?: string;
};

const PACKAGES: Package[] = [
  {
    name: "The Sunshine Starter",
    price: "£70",
    tagline: "Perfect for smaller parties or younger babies discovering soft play for the first time.",
    bulletsLead: "Includes:",
    bullets: [
      "Flooring",
      "Ball pit (with balls to match theme)",
      "Step & slide",
      "2 ride-on hoppers",
      "Tunnel",
      "Teepee",
    ],
    note: "Ideal for around 4–6 little ones.",
    featured: true,
    badge: "Budget friendly",
  },
  {
    name: "The Little Rays Package",
    price: "£100",
    tagline: "A bright and cheerful setup for your little one’s special day.",
    bulletsLead: "Includes:",
    bullets: [
      "Flooring",
      "Ball pit (with balls to match theme)",
      "Step & slide",
      "Maxi castle blocks",
      "2 ride-on hoppers",
      "Tunnel",
      "Teepee",
      "2 balance bikes / ride on cars",
    ],
    note: "Perfect for birthdays and indoor venues.",
    featured: true,
    badge: "Most popular",
  },
  {
    name: "The Soleado Signature",
    price: "£130",
    tagline: "Our full soft play experience, everything you need for a truly unforgettable celebration.",
    bulletsLead: "Includes everything in The Little Rays Package, plus:",
    bullets: [
      "Slide into ball pit",
      "Double rocker",
      "Personalised soft play with name and decals to match the decor",
    ],
    note: "Best for 8–10 children and fully customisable to your theme.",
    badge: "Full experience",
  },
];

const ADDONS = [
  {
    name: "Personalised name + theme",
    price: "£10",
    note: "Already included in The Soleado Signature package.",
  },
  {
    name: "Extra hoppers / ride-ons",
    price: "£5 each",
    note: "",
  },
];

export function Packages() {
  const ref = useRef<HTMLElement>(null);

  useGsap(ref, ({ reducedMotion }) => {
    registerGSAP();
    if (reducedMotion) return;

    // initial states
    gsap.set("[data-pkg='card']", { opacity: 0, y: 16 });
    gsap.set("[data-pkg='li']", { opacity: 0, x: 8 });

    gsap.set("[data-pkg='panel']", { opacity: 0, y: 16 });
    gsap.set("[data-pkg='addon']", { opacity: 0, x: 8 });
    gsap.set("[data-pkg='step']", { opacity: 0, x: 8 });

    // Cards in
    ScrollTrigger.batch("[data-pkg='card']", {
      start: "top 85%",
      once: true,
      onEnter: (batch) => {
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: "power3.out",
          stagger: 0.08,
        });
      },
    });

    // Bullets per-card
    ScrollTrigger.batch("[data-pkg='card']", {
      start: "top 80%",
      once: true,
      onEnter: (batch) => {
        batch.forEach((card) => {
          const items = (card as HTMLElement).querySelectorAll("[data-pkg='li']");
          gsap.to(items, {
            opacity: 1,
            x: 0,
            duration: 0.45,
            ease: "power2.out",
            stagger: 0.03,
            delay: 0.12,
          });
        });
      },
    });

    // Bottom panels in
    ScrollTrigger.batch("[data-pkg='panel']", {
      start: "top 88%",
      once: true,
      onEnter: (batch) => {
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: "power3.out",
          stagger: 0.1,
        });

        // After panel enters, animate its inner rows
        batch.forEach((panel) => {
          const addons = (panel as HTMLElement).querySelectorAll("[data-pkg='addon']");
          const steps = (panel as HTMLElement).querySelectorAll("[data-pkg='step']");

          if (addons.length) {
            gsap.to(addons, {
              opacity: 1,
              x: 0,
              duration: 0.45,
              ease: "power2.out",
              stagger: 0.06,
              delay: 0.15,
            });
          }

          if (steps.length) {
            gsap.to(steps, {
              opacity: 1,
              x: 0,
              duration: 0.45,
              ease: "power2.out",
              stagger: 0.06,
              delay: 0.15,
            });
          }
        });
      },
    });
  });

  return (
    <section ref={ref} id="packages" className="scroll-mt-24 py-14">
      <Container>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl text-ink">Soft Play Packages</h2>
            <p className="mt-2 max-w-prose">
              Photo-friendly soft play with themed balls and optional personalisation so it matches your party, not fights it.
            </p>
          </div>
          <Button href="#enquiry" variant="ghost">
            Check availability
          </Button>
        </div>

        {/* Packages grid */}
        <div className="mt-8 grid items-stretch gap-5 lg:grid-cols-3">
          {PACKAGES.map((p) => (
            <article
              key={p.name}
              data-pkg="card"
              className={[
                "h-full rounded-4xl border bg-paper/70 p-6 shadow-soft backdrop-blur",
                "flex flex-col",
                p.featured ? "border-brand/45 ring-1 ring-brand/25 shadow-float" : "border-line",
              ].join(" ")}
            >
              {/* TOP ZONE */}
              <div className="min-h-[168px]">
                {p.badge && (
                  <div
                    className={[
                      "mb-4 inline-flex rounded-full border px-3 py-1 text-xs",
                      p.featured
                        ? "border-brand/30 bg-brand/10 text-ink"
                        : "border-brand/25 bg-paper/70 text-ink/80",
                    ].join(" ")}
                  >
                    {p.badge}
                  </div>
                )}

                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-2xl text-ink">{p.name}</h3>
                  <div className="text-lg font-semibold text-ink">{p.price}</div>
                </div>

                <p className="mt-2 text-sm text-ink/80">{p.tagline}</p>
              </div>

              {/* LIST ZONE */}
              <div className="mt-6 border-t border-line/60 pt-2">
                {p.bulletsLead ? (
                  <div className="mb-3 text-xs font-medium uppercase tracking-wide text-ink/75">
                    {p.bulletsLead}
                  </div>
                ) : null}

                <ul className="space-y-1.5 text-sm leading-relaxed">
                  {p.bullets.map((i) => (
                    <li key={i} data-pkg="li" className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                      <span className="text-ink/85">{i}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* BOTTOM ZONE */}
              <div className="mt-auto pt-6">
                <p className="min-h-[44px] text-sm italic text-ink/75">{p.note}</p>

                <Button href="#enquiry" className="mt-4 w-full">
                  Enquire about {p.name}
                </Button>
              </div>
            </article>
          ))}
        </div>

        {/* Add-ons + steps */}
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <div data-pkg="panel" className="rounded-4xl border border-line bg-paper/70 p-6 shadow-soft">
            <h3 className="text-xl text-ink">Add Some Extra Sunshine</h3>
            <p className="mt-2 text-sm text-ink/80">
              Optional extras to match your theme and add a little more fun.
            </p>

            <div className="mt-5 space-y-4">
              {ADDONS.map((a) => (
                <div
                  key={a.name}
                  data-pkg="addon"
                  className="rounded-2xl border border-line bg-paper px-4 py-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="font-medium text-ink">{a.name}</div>
                    <div className="text-sm font-semibold text-ink">{a.price}</div>
                  </div>
                  {a.note ? <div className="mt-1 text-xs text-ink/75">{a.note}</div> : null}
                </div>
              ))}
            </div>
          </div>

          <div data-pkg="panel" className="rounded-4xl border border-brand/25 bg-brand/10 p-6 shadow-soft">
            <h3 className="text-xl text-ink">What happens next</h3>

            <ol className="mt-4 space-y-3 text-sm">
              {[
                { t: "Send your details", d: "Date, postcode/area, package and your theme." },
                { t: "We confirm availability", d: "We’ll reply with the next steps and delivery details." },
                { t: "Delivery, setup, collect", d: "We arrive, set up, and collect after your event." },
              ].map((x, i) => (
                <li key={x.t} data-pkg="step" className="flex gap-3">
                  <span className="mt-0.5 h-6 w-6 shrink-0 rounded-full border border-brand/30 bg-paper text-center text-xs leading-6 text-ink">
                    {i + 1}
                  </span>
                  <div>
                    <div className="font-medium text-ink">{x.t}</div>
                    <div className="text-ink/75">{x.d}</div>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-6">
              <Button href="#enquiry" className="w-full">
                Check availability
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
