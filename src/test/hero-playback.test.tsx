import { act, cleanup, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useHeroPlayback } from "@/hooks/use-hero-playback";

function Player() {
  const ref = useHeroPlayback();
  return <video ref={ref} />;
}

beforeEach(() => {
  vi.useFakeTimers();
  vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue();
  vi.spyOn(HTMLMediaElement.prototype, "load").mockImplementation(() => {});
});
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.useRealTimers(); });

describe("Hero playback recovery", () => {
  it("retries interrupted playback when the window regains focus", async () => {
    render(<Player />);
    await act(async () => {});
    const play = vi.mocked(HTMLMediaElement.prototype.play);
    play.mockClear();
    await act(async () => { window.dispatchEvent(new Event("focus")); });
    expect(play).toHaveBeenCalledTimes(1);
  });

  it("retries after autoplay rejection on a user gesture", async () => {
    const play = vi.mocked(HTMLMediaElement.prototype.play);
    play.mockRejectedValueOnce(new DOMException("Blocked", "NotAllowedError"));
    const { container } = render(<Player />);
    await act(async () => {});
    await act(async () => { document.dispatchEvent(new Event("pointerdown")); });
    expect(play).toHaveBeenCalledTimes(2);
    expect(container.querySelector("video")?.muted).toBe(true);
  });

  it("does not discard downloaded frames during ordinary buffering", async () => {
    const { container } = render(<Player />);
    const video = container.querySelector("video");
    if (!video) throw new Error("Video missing");
    await act(async () => {
      video.dispatchEvent(new Event("waiting"));
      video.dispatchEvent(new Event("stalled"));
      vi.advanceTimersByTime(20000);
    });
    expect(HTMLMediaElement.prototype.load).not.toHaveBeenCalled();
  });

  it("bounds network-error reloads and restores playback position", async () => {
    const { container } = render(<Player />);
    const video = container.querySelector("video");
    if (!video) throw new Error("Video missing");
    Object.defineProperty(video, "error", { configurable: true, value: { code: 2 } });
    Object.defineProperty(video, "duration", { configurable: true, value: 47.6 });
    video.currentTime = 12;
    await act(async () => {
      video.dispatchEvent(new Event("error"));
      vi.advanceTimersByTime(2000);
    });
    video.currentTime = 0;
    await act(async () => { video.dispatchEvent(new Event("loadedmetadata")); });
    expect(video.currentTime).toBe(12);
    await act(async () => {
      video.dispatchEvent(new Event("error"));
      vi.advanceTimersByTime(4000);
      video.dispatchEvent(new Event("error"));
      vi.advanceTimersByTime(20000);
    });
    expect(HTMLMediaElement.prototype.load).toHaveBeenCalledTimes(2);
  });
});