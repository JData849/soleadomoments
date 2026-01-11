import Link from "next/link";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="border-t border-line/70 bg-paper/80">
      <Container className="py-10">
        <div className="grid gap-8 md:grid-cols-3 md:items-start">
          {/* Brand */}
          <div>
            <div className="text-sm font-semibold text-ink">Soleado Moments</div>
            <p className="mt-2 text-sm text-ink/80">
              Boutique, photo-friendly soft play hire with themed balls and optional personalisation.
            </p>
            <p className="mt-3 text-xs text-ink/75">
              Leigh • Wigan • Bolton • Warrington • Greater Manchester
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <Link className="text-ink/80 hover:text-ink" href="/#packages">Packages</Link>
            <Link className="text-ink/80 hover:text-ink" href="/#gallery">Gallery</Link>
            <Link className="text-ink/80 hover:text-ink" href="/#how">How it works</Link>
            <Link className="text-ink/80 hover:text-ink" href="/#faq">FAQ</Link>

            <Link className="text-ink/80 hover:text-ink" href="/soft-play-hire/leigh">Leigh</Link>
            <Link className="text-ink/80 hover:text-ink" href="/soft-play-hire/wigan">Wigan</Link>
            <Link className="text-ink/80 hover:text-ink" href="/soft-play-hire/bolton">Bolton</Link>
            <Link className="text-ink/80 hover:text-ink" href="/soft-play-hire/warrington">Warrington</Link>
          </div>

          {/* CTA / Contact */}
          <div className="rounded-4xl border border-brand/25 bg-brand/10 p-6 shadow-soft">
            <div className="text-sm font-semibold text-ink">Check availability</div>
            <p className="mt-2 text-sm text-ink/75">
              Send your date, postcode/area, package and theme. We’ll reply with availability and delivery details.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href="/#enquiry"
                className="inline-flex items-center justify-center rounded-2xl bg-ink px-4 py-2 text-sm font-medium text-paper shadow-soft transition hover:-translate-y-px hover:shadow-float"
              >
                Get a quote
              </a>
              <a
                href="/#enquiry"
                className="inline-flex items-center justify-center rounded-2xl border border-line bg-paper px-4 py-2 text-sm text-ink/85 shadow-soft transition hover:-translate-y-px hover:shadow-float"
              >
                Check availability
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-line/70 pt-6 text-xs text-ink/75 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Soleado Moments.</p>
          <p>Built by Abel &amp; Co.</p>
        </div>
      </Container>
    </footer>
  );
}
