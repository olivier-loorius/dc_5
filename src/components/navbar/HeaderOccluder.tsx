"use client";
import { useEffect } from "react";

export default function HeaderOccluder() {
  useEffect(() => {
    const h = document.getElementById("app-header");
    const el = document.getElementById("header-occluder");
    if (!h || !el) return;
    const apply = () => {
      el.style.height = `${h.offsetHeight}px`;
    };
    apply();
    const onResize = () => apply();
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return (
    <div
      id="header-occluder"
      aria-hidden
      className="fixed top-0 left-0 right-0 z-40 app-bg pointer-events-none"
      style={{ height: "0px" }}
    />
  );
}
