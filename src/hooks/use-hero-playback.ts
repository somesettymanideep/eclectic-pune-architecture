import { useEffect, useRef } from "react";

/** Recover interrupted autoplay without changing or re-encoding the footage. */
export function useHeroPlayback() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let disposed = false;
    let playPending = false;
    let reloads = 0;
    let retryTimer: ReturnType<typeof setTimeout> | undefined;
    let resumeTime = 0;

    const play = () => {
      if (disposed || playPending || document.visibilityState === "hidden") return;
      // Reapply these properties after browser/device playback interruptions.
      video.muted = true;
      video.defaultMuted = true;
      playPending = true;
      void video.play().catch(() => {
        // A browser may require a gesture; the listeners below retry then.
      }).finally(() => { playPending = false; });
    };

    const recoverError = () => {
      // Don't reload ordinary buffering: that discards downloaded 4K frames.
      if (!video.error || video.error.code === 4 || reloads >= 2 || retryTimer) return;
      resumeTime = video.currentTime;
      retryTimer = setTimeout(() => {
        retryTimer = undefined;
        if (disposed) return;
        reloads += 1;
        video.load();
        play();
      }, 2000 * (reloads + 1));
    };

    const metadata = () => {
      if (resumeTime > 0 && Number.isFinite(video.duration) && resumeTime < video.duration) {
        video.currentTime = resumeTime;
      }
      resumeTime = 0;
      play();
    };
    const resume = () => { recoverError(); play(); };
    const pause = () => { if (!video.ended) play(); };
    const watchdog = setInterval(() => {
      if (video.paused && !video.ended) resume();
    }, 4000);

    video.addEventListener("canplay", play);
    video.addEventListener("loadedmetadata", metadata);
    video.addEventListener("pause", pause);
    video.addEventListener("error", recoverError);
    window.addEventListener("focus", resume);
    window.addEventListener("pageshow", resume);
    window.addEventListener("online", resume);
    document.addEventListener("visibilitychange", resume);
    document.addEventListener("pointerdown", play, { passive: true });
    document.addEventListener("keydown", play);
    play();

    return () => {
      disposed = true;
      clearInterval(watchdog);
      clearTimeout(retryTimer);
      video.removeEventListener("canplay", play);
      video.removeEventListener("loadedmetadata", metadata);
      video.removeEventListener("pause", pause);
      video.removeEventListener("error", recoverError);
      window.removeEventListener("focus", resume);
      window.removeEventListener("pageshow", resume);
      window.removeEventListener("online", resume);
      document.removeEventListener("visibilitychange", resume);
      document.removeEventListener("pointerdown", play);
      document.removeEventListener("keydown", play);
    };
  }, []);

  return videoRef;
}