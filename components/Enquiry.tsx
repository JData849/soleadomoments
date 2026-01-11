"use client";

import { useRef } from "react";
import { Container } from "./Container";
import { Button } from "./Button";
import { registerGSAP, gsap, ScrollTrigger } from "@/lib/gsap";
import { useGsap } from "@/hooks/useGsap";

const WHATSAPP_NUMBER = "447848147550"; // replace (no +, no spaces)
const EMAIL_TO = "info@soleadomoments.co.uk"; // replace with your real inbox

function buildMessage(opts: { name: string; date: string; area: string; details: string }) {
  const { name, date, area, details } = opts;

  return [
    "Hi Soleado Moments 👋",
    "",
    "I’d like to check availability for soft play:",
    `• Name: ${name}`,
    `• Event date: ${date}`,
    `• Postcode/area: ${area}`,
    `• Package/theme/add-ons: ${details}`,
    "",
    "Please let me know availability and the next steps. Thank you!",
  ].join("\n");
}

function buildWhatsAppUrl(opts: {
  number: string;
  name: string;
  date: string;
  area: string;
  details: string;
}) {
  const message = buildMessage(opts);
  return `https://wa.me/${opts.number}?text=${encodeURIComponent(message)}`;
}

function buildEmailUrl(opts: {
  to: string;
  name: string;
  date: string;
  area: string;
  details: string;
}) {
  const body = buildMessage(opts);
  const subject = `Availability enquiry – ${opts.date} – ${opts.area}`;
  return `mailto:${opts.to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function Enquiry() {
  const ref = useRef<HTMLElement>(null);

  useGsap(ref, ({ reducedMotion }) => {
    registerGSAP();
    if (reducedMotion) return;

    gsap.set("[data-enq='wrap']", { opacity: 0, y: 16 });
    gsap.set("[data-enq='left']", { opacity: 0, y: 12 });
    gsap.set("[data-enq='cta']", { opacity: 0, y: 10 });
    gsap.set("[data-enq='form']", { opacity: 0, y: 16 });
    gsap.set("[data-enq='field']", { opacity: 0, y: 10 });

    ScrollTrigger.create({
      trigger: ref.current,
      start: "top 86%",
      once: true,
      onEnter: () => {
        gsap.to("[data-enq='wrap']", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" });
        gsap.to("[data-enq='left']", { opacity: 1, y: 0, duration: 0.65, ease: "power3.out", delay: 0.08 });
        gsap.to("[data-enq='cta']", {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.08,
          delay: 0.16,
        });
        gsap.to("[data-enq='form']", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.12 });
        gsap.to("[data-enq='field']", {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.08,
          delay: 0.18,
        });
      },
    });
  });

  return (
    <section ref={ref} id="enquiry" className="scroll-mt-24 py-16">
      <Container>
        <div
          data-enq="wrap"
          className="rounded-[2.2rem] border border-brand/25 bg-brand/10 p-7 shadow-float md:p-10"
        >
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div data-enq="left">
              <h2 className="text-3xl text-ink">Check availability</h2>
              <p className="mt-3 text-ink/80">
                Tell us your date, area, package and theme. We’ll confirm availability and reply with delivery details.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <div data-enq="cta">
                  <Button href={`https://wa.me/${WHATSAPP_NUMBER}`} className="bg-ink text-paper">
                    WhatsApp us
                  </Button>
                </div>

                <div data-enq="cta">
                  <Button href={`mailto:${EMAIL_TO}`} variant="ghost">
                    Email
                  </Button>
                </div>

                <div data-enq="cta">
                  <Button href="tel:+447848147550" variant="ghost">
                    Call
                  </Button>
                </div>
              </div>
            </div>

            <form
              data-enq="form"
              className="rounded-2xl border border-brand/20 bg-paper/70 p-5 shadow-soft"
              onSubmit={(e) => {
                e.preventDefault();

                const form = e.currentTarget;
                const fd = new FormData(form);

                const name = String(fd.get("name") ?? "").trim();
                const date = String(fd.get("date") ?? "").trim();
                const area = String(fd.get("area") ?? "").trim();
                const details = String(fd.get("details") ?? "").trim();

                if (!name || !date || !area || !details) return;

                // Detect which submit button was clicked
                const native = e.nativeEvent as SubmitEvent;
                const submitter = native.submitter as HTMLButtonElement | null;
                const channel = submitter?.value ?? "whatsapp";

                if (channel === "email") {
                  const url = buildEmailUrl({ to: EMAIL_TO, name, date, area, details });
                  // mailto: works best via location
                  window.location.href = url;
                } else {
                  const url = buildWhatsAppUrl({ number: WHATSAPP_NUMBER, name, date, area, details });
                  window.open(url, "_blank", "noopener,noreferrer");
                }

                form.reset();
              }}
            >
              <div className="grid gap-3">
                <input
                  data-enq="field"
                  className="w-full rounded-2xl border border-line bg-paper px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand/25"
                  placeholder="Name"
                  name="name"
                  required
                />

                <input
                  data-enq="field"
                  className="w-full rounded-2xl border border-line bg-paper px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand/25"
                  placeholder="Event date"
                  name="date"
                  required
                />

                <input
                  data-enq="field"
                  className="w-full rounded-2xl border border-line bg-paper px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand/25"
                  placeholder="Postcode / area"
                  name="area"
                  required
                />

                <textarea
                  data-enq="field"
                  className="min-h-[110px] w-full rounded-2xl border border-line bg-paper px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand/25"
                  placeholder="Package (Sunshine Starter / Little Rays / Soleado Signature) + theme + any add-ons"
                  name="details"
                  required
                />

                <div data-enq="field" className="grid gap-2 sm:grid-cols-2">
                  <button
                    type="submit"
                    value="whatsapp"
                    className="rounded-2xl bg-ink px-5 py-3 text-sm font-medium text-paper shadow-soft transition hover:-translate-y-px hover:shadow-float"
                  >
                    Send via WhatsApp
                  </button>

                  <button
                    type="submit"
                    value="email"
                    className="rounded-2xl border border-line bg-paper px-5 py-3 text-sm font-medium text-ink shadow-soft transition hover:-translate-y-px hover:shadow-float"
                  >
                    Send via Email
                  </button>
                </div>

                <p data-enq="field" className="text-xs text-ink/75">
                  This opens your chosen app with the message prefilled.
                </p>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
