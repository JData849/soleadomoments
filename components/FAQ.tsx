"use client";

import { useRef, useState } from "react";
import { Container } from "./Container";
import { registerGSAP, gsap, ScrollTrigger } from "@/lib/gsap";
import { useGsap } from "@/hooks/useGsap";

const FAQS = [
  {
    q: "What do you need from me to book?",
    a: "Date, postcode/area, which package you want, and your theme (so we can match ball colours and decals where relevant).",
  },
  {
    q: "Do the balls match the theme?",
    a: "Yes. Ball colours can be chosen to suit your party theme.",
  },
  {
    q: "Is personalisation included?",
    a: "Personalised name + decor-matching decals are included in The Soleado Signature package. It’s also available as an add-on for £10.",
  },
  {
    q: "How many children is it suitable for?",
    a: "Sunshine Starter is ideal for around 4–6 little ones. Soleado Signature is best for 8–10 children. Little Rays sits nicely in the middle.",
  },
  {
    q: "Where do you cover?",
    a: "Local to Leigh, Wigan, Bolton, Warrington and Greater Manchester. If you’re just outside, ask anyway. We may be able to accommodate you.",
  },
];

export function FAQ() {
  const ref = useRef<HTMLElement>(null);
  const reducedRef = useRef(false);

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const panelRefs = useRef<Array<HTMLDivElement | null>>([]);

  useGsap(ref, ({ reducedMotion }) => {
    registerGSAP();
    reducedRef.current = reducedMotion;

    if (reducedMotion) return;

    // Reveal the FAQ items
    gsap.set("[data-faq='item']", { opacity: 0, y: 14 });

    ScrollTrigger.batch("[data-faq='item']", {
      start: "top 88%",
      once: true,
      onEnter: (batch) => {
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.08,
        });
      },
    });

    // Ensure panels start closed with explicit height/opacity (prevents first-open jump)
    panelRefs.current.forEach((el) => {
      if (!el) return;
      gsap.set(el, { height: 0, opacity: 0 });
    });
  });

  const animateOpen = (i: number) => {
    const el = panelRefs.current[i];
    if (!el) return;

    gsap.killTweensOf(el);
    gsap.set(el, { height: 0, opacity: 0 });

    gsap.to(el, {
      height: "auto",
      opacity: 1,
      duration: 0.45,
      ease: "power2.out",
    });
  };

  const animateClose = (i: number) => {
    const el = panelRefs.current[i];
    if (!el) return Promise.resolve();

    gsap.killTweensOf(el);

    return new Promise<void>((resolve) => {
      gsap.to(el, {
        height: 0,
        opacity: 0,
        duration: 0.32,
        ease: "power2.inOut",
        onComplete: () => resolve(),
      });
    });
  };

  const onToggle = async (i: number) => {
    // Reduced motion: just toggle state, no animation
    if (reducedRef.current) {
      setOpenIndex((curr) => (curr === i ? null : i));
      return;
    }

    // Close if clicking the open one
    if (openIndex === i) {
      await animateClose(i);
      setOpenIndex(null);
      return;
    }

    // If another is open, close it first, then open the new one
    if (openIndex !== null) {
      const prev = openIndex;
      await animateClose(prev);
    }

    setOpenIndex(i);
    // let DOM update before we animate open
    requestAnimationFrame(() => animateOpen(i));
  };

  return (
    <section ref={ref} id="faq" className="scroll-mt-24 py-16">
      <Container>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl text-ink">FAQ</h2>
            <p className="mt-2 max-w-prose text-ink/80">
              Quick answers to the questions people always ask right before they book.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-4">
          {FAQS.map((f, i) => {
            const isOpen = openIndex === i;

            return (
              <div
                key={f.q}
                data-faq="item"
                className="rounded-4xl border border-line bg-paper/70 shadow-soft backdrop-blur"
              >
                <button
                  type="button"
                  onClick={() => onToggle(i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-base font-medium text-ink">{f.q}</span>
                  <span
                    className={[
                      "shrink-0 rounded-full border px-3 py-1 text-xs",
                      isOpen ? "border-brand/30 bg-brand/10 text-ink" : "border-line bg-paper text-ink/80",
                    ].join(" ")}
                  >
                    {isOpen ? "Close" : "Open"}
                  </span>
                </button>

                <div
                  ref={(el) => {
                    panelRefs.current[i] = el;
                  }}
                  className="overflow-hidden px-6"
                  // if reduced motion, we don't rely on animated inline height
                  style={
                    reducedRef.current
                      ? { height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }
                      : undefined
                  }
                >
                  <div className="pb-5 text-sm leading-relaxed text-ink/80">{f.a}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
