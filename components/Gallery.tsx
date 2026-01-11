"use client";

import { useRef } from "react";
import Image from "next/image";
import { Container } from "./Container";
import { registerGSAP, gsap, ScrollTrigger } from "@/lib/gsap";
import { useGsap } from "@/hooks/useGsap";

const IMAGES = [
  {
    src: "/images/setup-baptism.webp",
    alt: "Soft play setup with pink and pearl ball pit and personalised signage",
    tag: "Baptism",
  },
  {
    src: "/images/setup-first-birthday.webp",
    alt: "Soft play setup with personalised first birthday signage and themed balls",
    tag: "1st Birthday",
  },
  {
    src: "/images/setup-winter.webp",
    alt: "Winter themed soft play setup with teepee and ball pit",
    tag: "Winter",
  },
  {
    src: "/images/balls-halloween.webp",
    alt: "Close-up of ball pit with orange and black Halloween theme balls",
    tag: "Halloween",
  },
];

export function Gallery() {
  const ref = useRef<HTMLElement>(null);

  useGsap(ref, ({ reducedMotion }) => {
    registerGSAP();
    if (reducedMotion) return;

    // Initial states
    gsap.set("[data-gal='card']", { opacity: 0, y: 16 });
    gsap.set("[data-gal='pill']", { opacity: 0, y: 8 });

    // Reveal cards (once)
    ScrollTrigger.batch("[data-gal='card']", {
      start: "top 88%",
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

    // Pills (optional tiny stagger)
    ScrollTrigger.batch("[data-gal='pill']", {
      start: "top 92%",
      once: true,
      onEnter: (batch) => {
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.05,
        });
      },
    });

    // Parallax per frame (subtle)
    const frames = gsap.utils.toArray<HTMLElement>("[data-gal='frame']");
    frames.forEach((frame) => {
      const img = frame.querySelector<HTMLElement>("[data-gal='img']");
      if (!img) return;

      gsap.fromTo(
        img,
        { y: 10 },
        {
          y: -10,
          ease: "none",
          scrollTrigger: {
            trigger: frame,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        }
      );
    });
  });

  return (
    <section ref={ref} id="gallery" className="border-y border-line/70 bg-paper/60 scroll-mt-24 py-16">
      <Container>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl text-ink">Real setups. Real themes.</h2>
            <p className="mt-2 max-w-prose">
              White soft play that photographs beautifully, with themed balls and personalised decals available.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            {["Baptism", "1st Birthday", "Winter", "Halloween"].map((t) => (
              <span
                key={t}
                data-gal="pill"
                className="rounded-full border border-brand/25 bg-brand/10 px-3 py-1 text-ink/80"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {IMAGES.map((img) => (
            <figure key={img.src} data-gal="card" className="group">
              <div
                data-gal="frame"
                className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-line bg-paper shadow-soft"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.02]"
                  data-gal="img"
                />

                {/* Tag */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent p-3">
                  <span className="inline-flex rounded-full border border-paper/30 bg-paper/15 px-2.5 py-1 text-xs text-paper backdrop-blur">
                    {img.tag}
                  </span>
                </div>
              </div>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
