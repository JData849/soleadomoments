// hooks/useGsap.ts
"use client";

import { useLayoutEffect } from "react";
import { gsap } from "@/lib/gsap";

export function useGsap(
  scope: React.RefObject<HTMLElement | null>,
  fn: (api: { ctx: gsap.Context; reducedMotion: boolean }) => void
) {
  useLayoutEffect(() => {
    const el = scope.current;
    if (!el) return;

    const reducedMotion =
      !!window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // GSAP passes the context into the callback as `self`
    const ctx = gsap.context((self) => {
      fn({ ctx: self, reducedMotion });
    }, el);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
