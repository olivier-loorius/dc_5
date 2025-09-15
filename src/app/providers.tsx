"use client";
import { NextIntlClientProvider } from "next-intl";
import fr from "../messages/fr.json";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextIntlClientProvider locale="fr" timeZone="Europe/Paris" messages={fr}>
      {children}
    </NextIntlClientProvider>
  );
}
