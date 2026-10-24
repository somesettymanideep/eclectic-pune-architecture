import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ProjectsHorizontal } from "@/components/site/ProjectsHorizontal";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("Projects scroll mode", () => {
  it("starts with auto scroll on", () => {
    render(<ProjectsHorizontal />);
    expect(screen.getByRole("switch", { name: /Auto scroll/ })).toBeChecked();
  });

  it("drives horizontal position from page scroll only while enabled", () => {
    vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => {
      callback(0);
      return 1;
    });
    vi.stubGlobal("cancelAnimationFrame", vi.fn());
    const { container } = render(<ProjectsHorizontal />);
    const section = container.querySelector("section");
    const track = container.querySelector<HTMLDivElement>("[data-lenis-prevent]");
    if (!section || !track) throw new Error("Missing gallery");
    Object.defineProperties(track, {
      scrollWidth: { value: 3000 },
      clientWidth: { value: 1000 },
    });
    vi.spyOn(section, "getBoundingClientRect").mockReturnValue({
      top: -450, height: window.innerHeight + 900,
    } as DOMRect);
    fireEvent.scroll(window);
    expect(track.scrollLeft).toBe(1000);
    fireEvent.click(screen.getByRole("switch", { name: /Auto scroll/ }));
    expect(screen.getByRole("switch", { name: /Auto scroll/ })).not.toBeChecked();
    track.scrollLeft = 250;
    fireEvent.scroll(window);
    expect(track.scrollLeft).toBe(250);
    fireEvent.click(screen.getByRole("switch", { name: /Auto scroll/ }));
    expect(track.scrollLeft).toBe(1000);
  });
});