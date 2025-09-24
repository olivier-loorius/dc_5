"use client";
import { useEffect } from "react";

export default function ScrollShadow() {
  useEffect(() => {
    const h = document.getElementById("app-header");
    if (!h) return;
    const apply = () => {
      h.dataset.scrolled = String(window.scrollY > 8);
      const height = h.getBoundingClientRect().height;
      document.documentElement.style.setProperty(
        "--app-header-height",
        `${height}px`
      );
    };
    const rafApply = () => requestAnimationFrame(apply);
    // Initial sync (après paint et après éventuel chargement de polices)
    rafApply();
    // @ts-expect-error - document.fonts peut être indisponible selon l'environnement
    if (document.fonts?.ready) {
      // @ts-expect-error - typage lib DOM incomplet pour .ready
      document.fonts.ready.then(rafApply).catch(() => {});
    }
    const onScroll = () => rafApply();
    const onResize = () => rafApply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("orientationchange", onResize, { passive: true });
    // Observe changements de layout du header (wraps, etc.)
    const ro = new ResizeObserver(() => rafApply());
    ro.observe(h);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      ro.disconnect();
    };
  }, []);
  return null;
}
