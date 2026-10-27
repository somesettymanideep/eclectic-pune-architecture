import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import heroVideo from "@/assets/videos/vija-hero.mp4.asset.json";
import heroWebm from "@/assets/videos/vija-hero.webm.asset.json";
import heroPoster from "@/assets/videos/vija-hero-poster.jpg.asset.json";
import { mediaUrl } from "@/lib/media-url";
import { useHeroPlayback } from "@/hooks/use-hero-playback";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useHeroPlayback();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.35, 0.8]);

  return (
    <section ref={ref} className="relative h-[100svh] overflow-hidden">
      <motion.div
        style={{ y: videoY, scale: videoScale }}
        className="absolute inset-0"
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={mediaUrl(heroPoster)}
          className="h-full w-full object-cover"
        >
          <source src={mediaUrl(heroVideo)} type="video/mp4" />
          <source src={mediaUrl(heroWebm)} type="video/webm" />
        </video>
      </motion.div>

      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/70"
      />


      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-foreground/40 p-1.5">
          <motion.span
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1 rounded-full bg-foreground/80"
          />
        </div>
      </motion.div>
    </section>
  );
}
