import Link from "next/link";

type SocialItem = {
  label: string;
  href: string;
  kind: "instagram" | "facebook";
};

function Icon({ kind }: { kind: SocialItem["kind"] }) {
  const common = "h-4 w-4";

  if (kind === "instagram") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M7.5 2.75h9A4.75 4.75 0 0 1 21.25 7.5v9A4.75 4.75 0 0 1 16.5 21.25h-9A4.75 4.75 0 0 1 2.75 16.5v-9A4.75 4.75 0 0 1 7.5 2.75Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M12 16.25A4.25 4.25 0 1 0 12 7.75a4.25 4.25 0 0 0 0 8.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M17.5 6.8h.01"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M14 8.5V7.2c0-.9.6-1.7 1.8-1.7h1.7V2.9h-2.2C12.8 2.9 11 4.5 11 7.2v1.3H9v3h2V21h3v-9.5h2.4l.6-3H14Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function SocialLinks({
  instagram,
  facebook,
  size = "md",
  className = "",
}: {
  instagram: string;
  facebook: string;
  size?: "sm" | "md";
  className?: string;
}) {
  const items: SocialItem[] = [
    { label: "Instagram", href: instagram, kind: "instagram" },
    { label: "Facebook", href: facebook, kind: "facebook" },
  ];

  const base =
    "inline-flex items-center gap-2 rounded-2xl border bg-paper/70 shadow-soft transition hover:-translate-y-px hover:shadow-float";
  const pad = size === "sm" ? "px-3 py-2 text-xs" : "px-3.5 py-2.5 text-sm";
  const colors = "border-line text-ink/85 hover:text-ink";

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {items.map((x) => (
        <Link
          key={x.label}
          href={x.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={x.label}
          className={`${base} ${pad} ${colors}`}
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-brand/20 bg-brand/10 text-ink">
            <Icon kind={x.kind} />
          </span>
          <span className="font-medium">{x.label}</span>
        </Link>
      ))}
    </div>
  );
}
