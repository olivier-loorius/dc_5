import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

describe("assets publics critiques", () => {
  it("Logo.png existe et est un PNG", () => {
    const file = path.join(process.cwd(), "public", "Logo.png");
    expect(fs.existsSync(file)).toBe(true);
    const buf = fs.readFileSync(file);
    // Signature PNG: 89 50 4E 47 0D 0A 1A 0A
    const pngMagic = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
    for (let i = 0; i < pngMagic.length; i++) {
      expect(buf[i]).toBe(pngMagic[i]);
    }
  });
});
