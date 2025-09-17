import { describe, it, expect, vi } from "vitest";

vi.mock("next/font/google", () => ({
  Antonio: () => ({ variable: "--font-antonio" }),
  Roboto: () => ({ variable: "--font-roboto" }),
}));

import { metadata } from "@/app/layout";

function isTitleObject(
  input: unknown
): input is { default: string; template?: string } {
  return (
    typeof input === "object" &&
    input !== null &&
    "default" in (input as Record<string, unknown>)
  );
}

type IconEntry = { url?: string; type?: string };
type IconsObject = { icon?: IconEntry | IconEntry[] };

describe("metadata (titre + favicon)", () => {
  it("définit un titre par défaut et un template pro", () => {
    expect(metadata.title).toBeTruthy();
    if (isTitleObject(metadata.title)) {
      expect(metadata.title.default).toBe("Boys & Toys");
      expect(metadata.title.template).toBe("%s | Boys & Toys");
    }
  });

  it("déclare une icône PNG et un manifest", () => {
    const iconsVal = metadata.icons;
    let iconList: IconEntry[] = [];
    if (
      iconsVal &&
      typeof iconsVal === "object" &&
      "icon" in (iconsVal as Record<string, unknown>)
    ) {
      const raw = (iconsVal as IconsObject).icon;
      iconList = Array.isArray(raw) ? raw : raw ? [raw] : [];
    }
    expect(iconList.length).toBeGreaterThan(0);
    const hasPngLogo = iconList.some(
      (i: IconEntry) => i?.url === "/Logo.png" && i?.type === "image/png"
    );
    expect(hasPngLogo).toBe(true);

    expect(metadata.manifest).toBe("/site.webmanifest");
  });
});
