import { describe, expect, it } from "vitest";
import { adjacentProjectOffset, carouselEdges } from "@/lib/project-carousel";

describe("Project carousel navigation", () => {
  it("hides the left arrow until scrollLeft exceeds 10px and hides it again at the start", () => {
    expect(carouselEdges(0, 900)).toEqual({ showLeft: false, showRight: true });
    expect(carouselEdges(10, 900).showLeft).toBe(false);
    expect(carouselEdges(11, 900).showLeft).toBe(true);
    expect(carouselEdges(0, 900).showLeft).toBe(false);
  });
  it("advances by one project column including its gap, then returns to the previous column", () => {
    expect(adjacentProjectOffset([0, 370, 946], 0, 1, 1300)).toBe(370);
    expect(adjacentProjectOffset([0, 370, 946], 370, 1, 1300)).toBe(946);
    expect(adjacentProjectOffset([0, 370, 946], 946, -1, 1300)).toBe(370);
  });
  it("keeps navigation within the track bounds and hides the right arrow at the end", () => {
    expect(adjacentProjectOffset([0, 370, 946], 370, 1, 700)).toBe(700);
    expect(adjacentProjectOffset([0, 370], 0, -1, 700)).toBe(0);
    expect(carouselEdges(700, 700)).toEqual({ showLeft: true, showRight: false });
  });
});