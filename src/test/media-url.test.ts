import { describe, expect, it } from "vitest";
import { mediaUrl } from "@/lib/media-url";
import heroVideo from "@/assets/videos/pune-cityscape-hero.mp4.asset.json";
import seaLogo from "@/assets/sea-logo-exact.png.asset.json";

describe("Portable media URLs", () => {
  it("loads the original video from the hosted asset service rather than localhost", () => {
    expect(mediaUrl(heroVideo)).toBe(
      "https://eclectic-pune-architecture.lovable.app/__l5e/assets-v1/6166f946-8590-44b9-b4a7-753aa6c64a1d/pune-cityscape-hero.mp4",
    );
  });

  it("keeps the exact uploaded logo accessible outside Lovable", () => {
    expect(mediaUrl(seaLogo)).toBe(
      "https://eclectic-pune-architecture.lovable.app/__l5e/assets-v1/edc4fc60-7a78-4e8c-8cce-f59bd1e456b9/sea-logo.png",
    );
  });

  it("leaves bundled files and already absolute URLs unchanged", () => {
    expect(mediaUrl({ url: "/assets/photo.jpg" })).toBe("/assets/photo.jpg");
    expect(mediaUrl({ url: "https://example.com/photo.jpg" })).toBe("https://example.com/photo.jpg");
  });
});