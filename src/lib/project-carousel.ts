export function carouselEdges(scrollLeft: number, maxScroll: number) {
  return { showLeft: scrollLeft > 10, showRight: maxScroll - scrollLeft > 10 };
}

export function adjacentProjectOffset(
  offsets: number[],
  scrollLeft: number,
  direction: -1 | 1,
  maxScroll: number,
) {
  const target = direction === 1
    ? offsets.find((offset) => offset > scrollLeft + 10) ?? maxScroll
    : [...offsets].reverse().find((offset) => offset < scrollLeft - 10) ?? 0;
  return Math.min(maxScroll, Math.max(0, target));
}