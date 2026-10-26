import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CustomCursor } from "@/components/site/CustomCursor";

afterEach(() => { cleanup(); vi.restoreAllMocks(); });

function desktop() {
  vi.spyOn(window, "matchMedia").mockImplementation((query) => ({
    matches: query.includes("pointer: fine"), media: query, onchange: null,
    addListener: vi.fn(), removeListener: vi.fn(), addEventListener: vi.fn(),
    removeEventListener: vi.fn(), dispatchEvent: vi.fn(),
  }));
}

describe("signature cursor pointer safety", () => {
  it("leaves the native cursor available on touch devices", () => {
    render(<CustomCursor />);
    fireEvent.pointerMove(window, { clientX: 120, clientY: 200 });
    expect(document.documentElement.classList.contains("custom-cursor-active")).toBe(false);
  });

  it("restores the native cursor when the pointer enters a form input", () => {
    desktop();
    const { container } = render(<><div data-testid="surface" /><input aria-label="Name" /><CustomCursor /></>);
    const surface = container.querySelector("div");
    const input = container.querySelector("input");
    if (!surface || !input) throw new Error("Missing test surface");
    Object.defineProperty(document, "elementFromPoint", { configurable: true, value: vi.fn(() => surface) });
    fireEvent.pointerMove(surface, { clientX: 120, clientY: 200 });
    expect(document.documentElement.classList.contains("custom-cursor-active")).toBe(true);
    vi.mocked(document.elementFromPoint).mockReturnValue(input);
    fireEvent.pointerMove(input, { clientX: 130, clientY: 200 });
    expect(document.documentElement.classList.contains("custom-cursor-active")).toBe(false);
  });
});