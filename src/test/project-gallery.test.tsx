import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ProjectsHorizontal } from "@/components/site/ProjectsHorizontal";

afterEach(cleanup);

describe("Project gallery navigation rules", () => {
  it("defaults Auto scroll to on and hides arrows even on section hover", () => {
    render(<ProjectsHorizontal />);
    expect(screen.getByRole("switch", { name: "Auto scroll" })).toBeChecked();
    const section = screen.getByRole("heading", { name: "Our Projects" }).closest("section");
    if (!section) throw new Error("Projects section missing");
    fireEvent.mouseEnter(section);
    expect(screen.queryByRole("button", { name: "Next projects" })).not.toBeInTheDocument();
  });

  it("shows manual arrows only while the Projects section is hovered", () => {
    render(<ProjectsHorizontal />);
    fireEvent.click(screen.getByRole("switch", { name: "Auto scroll" }));
    expect(screen.getByRole("switch", { name: "Auto scroll" })).not.toBeChecked();
    expect(screen.queryByRole("button", { name: "Next projects" })).not.toBeInTheDocument();
    const section = screen.getByRole("heading", { name: "Our Projects" }).closest("section");
    if (!section) throw new Error("Projects section missing");
    fireEvent.mouseEnter(section);
    expect(screen.getByRole("button", { name: "Previous projects" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Next projects" })).toBeInTheDocument();
    fireEvent.mouseLeave(section);
    expect(screen.queryByRole("button", { name: "Next projects" })).not.toBeInTheDocument();
  });

  it("returns to the first project and removes arrows when Auto scroll is re-enabled", () => {
    render(<ProjectsHorizontal />);
    const toggle = screen.getByRole("switch", { name: "Auto scroll" });
    fireEvent.click(toggle);
    const viewport = screen.getByRole("region", { name: "Project gallery" });
    viewport.scrollLeft = 500;
    fireEvent.click(toggle);
    expect(viewport.scrollLeft).toBe(0);
    expect(toggle).toBeChecked();
    expect(screen.queryByRole("button", { name: "Next projects", hidden: true })).not.toBeInTheDocument();
  });
});