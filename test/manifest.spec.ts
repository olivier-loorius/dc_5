import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

describe("site.webmanifest", () => {
  it("est un JSON valide et référence des icônes", () => {
    const file = path.join(process.cwd(), "public", "site.webmanifest");
    expect(fs.existsSync(file)).toBe(true);
    const raw = fs.readFileSync(file, "utf8");
    const json = JSON.parse(raw);
    expect(json.name).toBeTruthy();
    expect(Array.isArray(json.icons)).toBe(true);
    expect(json.icons.length).toBeGreaterThan(0);
  });

  it("contient les champs clés (name, theme_color, start_url) et des tailles standard", () => {
    const file = path.join(process.cwd(), "public", "site.webmanifest");
    const raw = fs.readFileSync(file, "utf8");
    const json = JSON.parse(raw);

    expect(json.name).toBe("Boys & Toys");
    expect(json.start_url).toBe("/");
    expect(json.theme_color).toBe("#0b0b0b");

    const sizes = (json.icons || []).map((i: any) => i?.sizes);
    expect(sizes).toContain("192x192");
    expect(sizes).toContain("512x512");
  });
});
