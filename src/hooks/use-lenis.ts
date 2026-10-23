import { useEffect } from "react";

/**
 * Enables Lenis smooth scrolling site-wide. Dynamically imported so SSR
 * never evaluates the library, and cleaned up on unmount.
 */
export function useLenis() {
  useEffect(() => {
    let instance: { destroy: () => void } | null = null;
    let cancelled = false;

    import("lenis")
      .then(({ default: Lenis }) => {
        if (cancelled) return;
        instance = new Lenis({
          lerp: 0.09,
          wheelMultiplier: 1,
          autoRaf: true,
        });
      })
      .catch(() => {
        /* smooth scroll is a progressive enhancement */
      });

    return () => {
      cancelled = true;
      instance?.destroy();
    };
  }, []);
}
