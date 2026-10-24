import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import heroVideo from "@/assets/videos/vija-hero.mp4.asset.json";
import heroWebm from "@/assets/videos/vija-hero.webm.asset.json";
import heroPoster from "@/assets/videos/vija-hero-poster.jpg.asset.json";
import { mediaUrl } from "@/lib/media-url";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.35, 0.8]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative h-[100svh] overflow-hidden">
      <motion.div
        style={{ y: videoY, scale: videoScale }}
        className="absolute inset-0"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={mediaUrl(heroPoster)}
          className="h-full w-full object-cover"
        >
          <source src={mediaUrl(heroWebm)} type="video/webm" />
          <source src={mediaUrl(heroVideo)} type="video/mp4" />
        </video>
      </motion.div>

      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/70"
      />

      <motion.div
        style={{ y: titleY, opacity: titleOpacity }}
        className="relative z-10 flex h-full items-center justify-center px-6"
      >
        <h1 className="text-center font-display text-4xl font-normal uppercase leading-tight tracking-[0.08em] text-foreground drop-shadow-lg sm:text-5xl md:text-6xl lg:text-[4.25rem]">
          Changing the
          <br />
          Cityscape of Pune
        </h1>
      </motion.div>

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
