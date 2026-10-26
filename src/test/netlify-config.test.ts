import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("Netlify deployment configuration", () => {
  const config = readFileSync(new URL("../../netlify.toml", import.meta.url), "utf8");

  it("publishes the Netlify adapter's dist folder", () => {
    expect(config).toMatch(/^\s*publish\s*=\s*"dist"\s*$/m);
  });

  it("selects the Netlify server adapter", () => {
    expect(config).toMatch(/^\s*NITRO_PRESET\s*=\s*"netlify"\s*$/m);
  });
});