"use client";
import { useEffect } from "react";

export default function ScrollShadow() {
  useEffect(() => {
    const h = document.getElementById("app-header");
    if (!h) return;
    const onScroll = () => {
      h.dataset.scrolled = String(window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return null;
}
