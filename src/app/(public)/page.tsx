"use client";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations();
  return (
    <main>
      <h1>{t("hello")}</h1>
      <button>{t("contact")}</button>
    </main>
  );
}
