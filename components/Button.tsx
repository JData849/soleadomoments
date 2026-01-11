"use client";

import Link from "next/link";
import React from "react";

type ButtonVariant = "primary" | "ghost";

type CommonProps = {
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
};

type AnchorProps = CommonProps & {
  href: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  target?: string;
  rel?: string;
};

type NativeButtonProps = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

export type ButtonProps = AnchorProps | NativeButtonProps;

function cx(...parts: Array<string | undefined | false | null>) {
  return parts.filter(Boolean).join(" ");
}

function isExternalHref(href: string) {
  return (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("sms:") ||
    href.startsWith("wa.me") ||
    href.startsWith("https://wa.me")
  );
}

export function Button(props: ButtonProps) {
  const variant = props.variant ?? "primary";

  const base =
    "inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-medium shadow-soft transition " +
    "hover:-translate-y-px hover:shadow-float focus:outline-none focus:ring-2 focus:ring-brand/25";

  const styles =
    variant === "ghost"
      ? "border border-line bg-paper text-ink"
      : "bg-ink text-paper";

  // LINK MODE
  if ("href" in props) {
    const { href, className, children, onClick, target, rel } = props;

    // Hash link smooth scroll (with offset for sticky header)
    if (href.startsWith("#")) {
      return (
        <a
          href={href}
          className={cx(base, styles, className)}
          onClick={(e) => {
            onClick?.(e);
            if (e.defaultPrevented) return;

            e.preventDefault();

            const id = href.slice(1);
            const el = document.getElementById(id);
            if (!el) return;

            const headerOffset = 80; // tweak if needed (your navbar is ~64px)
            const y = el.getBoundingClientRect().top + window.scrollY - headerOffset;

            window.history.pushState(null, "", href);
            window.scrollTo({ top: y, behavior: "smooth" });
          }}
        >
          {children}
        </a>
      );
    }

    // External link
    if (isExternalHref(href)) {
      return (
        <a
          href={href}
          className={cx(base, styles, className)}
          target={target}
          rel={rel ?? (target === "_blank" ? "noopener noreferrer" : undefined)}
          onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
        >
          {children}
        </a>
      );
    }

    // Internal route link
    return (
      <Link href={href} className={cx(base, styles, className)}>
        {children}
      </Link>
    );
  }

  // BUTTON MODE
  const { className, children, ...rest } = props;
  return (
    <button className={cx(base, styles, className)} {...rest}>
      {children}
    </button>
  );
}
