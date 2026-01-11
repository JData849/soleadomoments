"use client";

import { useRef } from "react";
import { Container } from "./Container";
import { Button } from "./Button";
import { registerGSAP, gsap, ScrollTrigger } from "@/lib/gsap";
import { useGsap } from "@/hooks/useGsap";

export function Trust() {
  const ref = useRef<HTMLElement>(null);

  useGsap(ref, ({ reducedMotion }) => {
    registerGSAP();
    if (reducedMotion) return;

    gsap.set("[data-how='panel']", { opacity: 0, y: 16 });
    gsap.set("[data-how='step']", { opacity: 0, x: 10 });
    gsap.set("[data-how='tile']", { opacity: 0, y: 10 });

    // Panels in
    ScrollTrigger.batch("[data-how='panel']", {
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

        batch.forEach((panel) => {
          const steps = (panel as HTMLElement).querySelectorAll("[data-how='step']");
          const tiles = (panel as HTMLElement).querySelectorAll("[data-how='tile']");

          if (steps.length) {
            gsap.to(steps, {
              opacity: 1,
              x: 0,
              duration: 0.45,
              ease: "power2.out",
              stagger: 0.08,
              delay: 0.12,
            });
          }

          if (tiles.length) {
            gsap.to(tiles, {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out",
              stagger: 0.07,
              delay: 0.12,
            });
          }
        });
      },
    });
  });

  return (
    <section ref={ref} id="how" className="py-14">
      <Container>
        <div className="grid gap-10 md:grid-cols-2 md:items-start">
          {/* Left panel */}
          <div
            data-how="panel"
            className="rounded-4xl border border-line bg-paper/70 p-6 shadow-soft backdrop-blur"
          >
            <h2 className="text-3xl text-ink">How booking works</h2>
            <p className="mt-3 max-w-prose text-ink/80">
              Send your date, area, package and theme. We’ll confirm availability and reply with delivery details.
            </p>

            <ol className="mt-6 space-y-3 text-sm">
              {[
                {
                  t: "Send your details",
                  d: "Date, postcode/area, package (Sunshine Starter / Little Rays / Soleado Signature) and your theme.",
                },
                {
                  t: "We confirm availability",
                  d: "We’ll reply with the next steps and any delivery info.",
                },
                {
                  t: "Delivery, setup, collect",
                  d: "We arrive, set up, and collect after. You don’t need to lift a thing.",
                },
              ].map((s, i) => (
                <li key={s.t} data-how="step" className="flex gap-3">
                  <span className="mt-0.5 h-6 w-6 shrink-0 rounded-full border border-brand/30 bg-paper text-center text-xs leading-6 text-ink">
                    {i + 1}
                  </span>
                  <div>
                    <div className="font-medium text-ink">{s.t}</div>
                    <div className="text-ink/75">{s.d}</div>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="#enquiry">Check availability</Button>
              <Button href="#packages" variant="ghost">
                Compare packages
              </Button>
            </div>
          </div>

          {/* Right panel */}
          <div
            data-how="panel"
            className="rounded-4xl border border-brand/25 bg-brand/10 p-6 shadow-soft"
          >
            <h3 className="text-xl text-ink">What’s included</h3>
            <p className="mt-2 text-sm text-ink/80">
              Everything is delivered, set up and collected. Themes are handled through balls + optional decals.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                { k: "Set up + pack down", v: "We assemble it for you" },
                { k: "Theme matching", v: "Ball colours to suit" },
                { k: "Personalised decals", v: "Included in Signature" },
                { k: "Venue-ready", v: "Homes & halls" },
              ].map((x) => (
                <div
                  key={x.k}
                  data-how="tile"
                  className="rounded-3xl border border-brand/20 bg-paper/70 p-4 shadow-soft"
                >
                  <div className="text-xs text-ink/75">{x.k}</div>
                  <div className="mt-1 font-medium text-ink">{x.v}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-3xl border border-brand/20 bg-paper/70 p-4 text-sm text-ink/80">
              If you’re just outside Greater Manchester, ask anyway. We’ll tell you what’s possible.
            </div>

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
