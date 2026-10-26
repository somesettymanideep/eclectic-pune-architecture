import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { Footer } from "@/components/site/Footer";

beforeEach(() => {
  window.localStorage.clear();
  document.documentElement.classList.remove("light");
});
afterEach(cleanup);

describe("Footer theme switch", () => {
  it("starts in dark mode and switches between light and dark", () => {
    render(<Footer />);
    const toggle = screen.getByRole("switch", { name: "Dark theme" });
    expect(toggle).toHaveAttribute("aria-checked", "true");
    fireEvent.click(toggle);
    expect(document.documentElement.classList.contains("light")).toBe(true);
    expect(window.localStorage.getItem("sea-site-theme")).toBe("light");
    fireEvent.click(toggle);
    expect(document.documentElement.classList.contains("light")).toBe(false);
    expect(window.localStorage.getItem("sea-site-theme")).toBe("dark");
  });

  it("restores the saved light preference", () => {
    window.localStorage.setItem("sea-site-theme", "light");
    render(<Footer />);
    expect(screen.getByRole("switch", { name: "Dark theme" })).toHaveAttribute("aria-checked", "false");
    expect(document.documentElement.classList.contains("light")).toBe(true);
  });
});