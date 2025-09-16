import { describe, it, expect, vi } from "vitest";

vi.mock("next/font/google", () => ({
  Antonio: () => ({ variable: "--font-antonio" }),
  Roboto: () => ({ variable: "--font-roboto" }),
}));

import { metadata } from "@/app/layout";

describe("metadata (titre + favicon)", () => {
  it("définit un titre par défaut et un template pro", () => {
    expect(metadata.title).toBeTruthy();
    if (typeof metadata.title === "object" && metadata.title !== null) {
      expect((metadata.title as any).default).toBe("Boys & Toys");
      expect((metadata.title as any).template).toBe("%s | Boys & Toys");
    }
  });

  it("déclare une icône PNG et un manifest", () => {
    const icons: any = metadata.icons as any;
    expect(icons).toBeTruthy();
    const iconList = Array.isArray(icons.icon) ? icons.icon : [];
    expect(iconList.length).toBeGreaterThan(0);
    const hasPngLogo = iconList.some(
      (i: any) => i?.url === "/Logo.png" && i?.type === "image/png"
    );
    expect(hasPngLogo).toBe(true);

    expect((metadata as any).manifest).toBe("/site.webmanifest");
  });
});
