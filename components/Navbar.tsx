"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Container } from "./Container";
import { Button } from "./Button";

const NAV_ITEMS = [
  { label: "Packages", hash: "#packages" },
  { label: "Gallery", hash: "#gallery" },
  { label: "How it works", hash: "#how" },
  { label: "FAQ", hash: "#faq" },
];

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);

  const linkHref = (hash: string) => (isHome ? hash : `/${hash}`);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (panelRef.current?.contains(t) || toggleRef.current?.contains(t)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-paper/85 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-3">
        <a href={isHome ? "#top" : "/"} className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
          <Image src="/images/logo.webp" alt="Soleado Moments" width={40} height={40} className="shrink-0 rounded-xl" priority />
          <div className="hidden min-w-0 sm:block leading-tight">
            <div className="truncate text-sm font-semibold text-ink">Soleado Moments</div>
            <div className="truncate text-xs text-ink/80">
              Leigh • Wigan • Bolton • Warrington • Greater Manchester
            </div>
          </div>
        </a>

        <nav className="hidden items-center gap-6 text-sm md:flex">
          {NAV_ITEMS.map((i) => (
            <a key={i.hash} className="text-ink/80 hover:text-ink" href={linkHref(i.hash)}>
              {i.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <div className="hidden items-center gap-3 md:flex">
            <Button href={linkHref("#enquiry")} variant="ghost">Check availability</Button>
            <Button href={linkHref("#enquiry")}>Get a quote</Button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <Button href={linkHref("#enquiry")}>Quote</Button>

            <button
              ref={toggleRef}
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-line bg-paper shadow-soft transition hover:-translate-y-px hover:shadow-float"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="relative block h-4 w-5">
                <span className={["absolute left-0 top-0 h-0.5 w-5 rounded bg-ink transition", open ? "translate-y-[7px] rotate-45" : ""].join(" ")} />
                <span className={["absolute left-0 top-[7px] h-0.5 w-5 rounded bg-ink transition", open ? "opacity-0" : "opacity-100"].join(" ")} />
                <span className={["absolute left-0 top-[14px] h-0.5 w-5 rounded bg-ink transition", open ? "-translate-y-[7px] -rotate-45" : ""].join(" ")} />
              </span>
            </button>
          </div>
        </div>
      </Container>

      <div
        ref={panelRef}
        className={[
          "md:hidden overflow-hidden border-b border-line/70 bg-paper/95 backdrop-blur transition-[max-height,opacity] duration-300",
          open ? "max-h-[460px] opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
      >
        <Container className="py-4">
          <div className="grid gap-2">
            {NAV_ITEMS.map((i) => (
              <a
                key={i.hash}
                href={linkHref(i.hash)}
                onClick={() => setOpen(false)}
                className="rounded-2xl border border-line bg-paper px-4 py-3 text-sm text-ink/85 shadow-soft transition hover:-translate-y-px hover:shadow-float"
              >
                {i.label}
              </a>
            ))}
            <a
              href={linkHref("#enquiry")}
              onClick={() => setOpen(false)}
              className="rounded-2xl border border-brand/25 bg-brand/10 px-4 py-3 text-sm text-ink shadow-soft transition hover:-translate-y-px hover:shadow-float"
            >
              Enquiry
            </a>
          </div>
        </Container>
      </div>
    </header>
  );
}
