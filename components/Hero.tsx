"use client";

import { useRef } from "react";
import Image from "next/image";
import { Container } from "./Container";
import { Button } from "./Button";
import { registerGSAP, gsap } from "@/lib/gsap";
import { useGsap } from "@/hooks/useGsap";

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGsap(ref, ({ reducedMotion }) => {
    registerGSAP();
    if (reducedMotion) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      "[data-hero='kicker']",
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.6 }
    )
      .fromTo(
        "[data-hero='h1']",
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.75 },
        "-=0.25"
      )
      .fromTo(
        "[data-hero='p']",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.35"
      )
      .fromTo(
        "[data-hero='cta']",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.55, stagger: 0.08 },
        "-=0.25"
      )
      .fromTo(
        "[data-hero='media']",
        { opacity: 0, y: 10, scale: 0.985 },
        { opacity: 1, y: 0, scale: 1, duration: 0.9 },
        "-=0.5"
      )
      .fromTo(
        "[data-hero='glow']",
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" },
        "-=0.9"
      );
  });

  return (
    <section ref={ref} id="top" className="paper-grain relative overflow-hidden">
      <Container className="grid items-center gap-10 py-12 md:grid-cols-2 md:py-16">
        <div>
          <div
            data-hero="kicker"
            className="inline-flex items-center gap-2 rounded-full border border-brand/25 bg-brand/10 px-3 py-1 text-xs text-ink/80"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
           Serving Leigh, Wigan, Bolton, Warrington and Greater Manchester.
          </div>

          <h1 data-hero="h1" className="mt-5 text-4xl leading-[1.05] text-ink sm:text-5xl">
            Boutique soft play hire that looks incredible at parties.
          </h1>

          <p data-hero="p" className="mt-4 max-w-prose text-base leading-relaxed">
            White, photo-friendly soft play with themed balls and personalised decals. We deliver, set up and collect.
            You get the memories (and the photos).
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <div data-hero="cta">
              <Button href="#enquiry">Check availability</Button>
            </div>
            <div data-hero="cta">
              <Button href="#packages" variant="ghost">
                See packages
              </Button>
            </div>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
            {[
              { k: "Packages", v: "£70–£130" },
              { k: "Themes", v: "Balls + decals" },
              { k: "Setup", v: "We handle it" },
              { k: "Best for", v: "4–10 kids" },
            ].map((x) => (
              <div key={x.k} className="rounded-3xl border border-line bg-paper/70 px-4 py-3 shadow-soft">
                <div className="text-xs text-ink/75">{x.k}</div>
                <div className="mt-1 font-medium text-ink">{x.v}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div
            data-hero="glow"
            className="absolute inset-0 -z-10 rounded-4xl bg-gradient-to-b from-brand/12 to-transparent blur-2xl"
          />

          <div
            data-hero="media"
            className="relative overflow-hidden rounded-4xl border border-line bg-paper/60 shadow-float"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src="/images/hero.webp"
                alt="Soleado Moments soft play setup in a venue"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-line bg-paper/70 px-5 py-4">
              <div className="text-sm">
                <div className="font-medium text-ink">Theme-ready, always photo-friendly</div>
                <div className="text-ink/80">Custom balls + personalised decals available</div>
              </div>
              <span className="shrink-0 rounded-full border border-brand/35 bg-paper px-3 py-1 text-xs text-ink/80">
                Add-ons
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
