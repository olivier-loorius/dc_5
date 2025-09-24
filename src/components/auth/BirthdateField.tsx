"use client";
import { useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";

type BirthdateFieldProps = {
  id: string;
  name: string; // le champ réel soumis (format JJ/MM/AAAA) via input hidden
  defaultValue?: string; // optionnel, au format JJ/MM/AAAA
};

function toIsoFromFr(value?: string): string {
  if (!value) return "";
  const parts = value.replace(/[.\-\s]/g, "/").split("/");
  if (parts.length !== 3) return "";
  const [dd, mm, yyyy] = parts;
  if (!/^\d{2}$/.test(dd) || !/^\d{2}$/.test(mm) || !/^\d{4}$/.test(yyyy))
    return "";
  return `${yyyy}-${mm}-${dd}`;
}

function toFrFromIso(value?: string): string {
  if (!value) return "";
  const parts = value.split("-");
  if (parts.length !== 3) return "";
  const [yyyy, mm, dd] = parts;
  if (!/^\d{4}$/.test(yyyy) || !/^\d{2}$/.test(mm) || !/^\d{2}$/.test(dd))
    return "";
  return `${dd}/${mm}/${yyyy}`;
}

export function BirthdateField({
  id,
  name,
  defaultValue,
}: BirthdateFieldProps) {
  const initialIso = useMemo(() => toIsoFromFr(defaultValue), [defaultValue]);
  const [iso, setIso] = useState<string>(initialIso);
  const fr = toFrFromIso(iso);
  const adultMaxIso = useMemo(() => {
    const today = new Date();
    const max = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate() - 1
    );
    const yyyy = max.getFullYear();
    const mm = String(max.getMonth() + 1).padStart(2, "0");
    const dd = String(max.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }, []);

  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#e19a28]">
        <FontAwesomeIcon icon={faCalendarDays} className="h-5 w-5" />
      </span>
      {/* Champ UI natif avec calendrier */}
      <input
        id={id}
        type="date"
        min="1900-01-01"
        max={adultMaxIso}
        value={iso}
        onChange={(e) => setIso(e.target.value)}
        className="bg-input/30 border-input text-foreground placeholder:opacity-60 rounded-md border pl-10 pr-3 py-2 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 w-full"
      />
      {/* Champ réel soumis (JJ/MM/AAAA) pour la validation serveur */}
      <input type="hidden" name={name} value={fr} />
    </div>
  );
}
