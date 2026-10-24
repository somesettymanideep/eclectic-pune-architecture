import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import gangadharEstate from "@/assets/projects/gangadhar-estate.png.asset.json";
import krishnaSindhuraHospital from "@/assets/projects/krishna-sindhura-hospital.png.asset.json";
import kishoreJainKmsInfra from "@/assets/projects/kishore-jain-kms-infra.png.asset.json";
import dudhupudiConstruction from "@/assets/projects/dudhupudi-construction.png.asset.json";
import krConstructions from "@/assets/projects/kr-constructions.png.asset.json";
import sarikaEstate from "@/assets/projects/sarika-estate.png.asset.json";
import manjunathaConstructions from "@/assets/projects/manjunatha-constructions.png.asset.json";
import evergreenInfraNunna from "@/assets/projects/evergreen-infra-nunna.png.asset.json";
import gravityCentral from "@/assets/projects/gravity-central.png.asset.json";
import { mediaUrl } from "@/lib/media-url";

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

function ProjectCard({
  name,
  image,
  className = "",
  imgWidth,
  imgHeight,
  imageFit = "cover",
}: {
  name: string;
  image: string;
  className?: string;
  imgWidth: number;
  imgHeight: number;
  imageFit?: "cover" | "contain";
}) {
  return (
    <div
      className={`group relative shrink-0 cursor-pointer overflow-hidden rounded-lg bg-card ${className}`}
    >
      <img
        src={image}
        alt={name}
        loading="lazy"
        width={imgWidth}
        height={imgHeight}
        draggable={false}
        className={`h-full w-full ${imageFit === "contain" ? "object-contain" : "object-cover"} transition-transform duration-700 ease-out group-hover:scale-105`}
      />
      <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/25" />
      <span className="pill-label">{name}</span>
    </div>
  );
}

export function ProjectsHorizontal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [shift, setShift] = useState(0);
  const shiftRef = useRef(0);
  shiftRef.current = shift;

  // Auto scroll: on = pinned, vertical-scroll-driven track; off = free drag + arrows
  const [autoScroll, setAutoScroll] = useState(true);
  const autoScrollRef = useRef(true);
  autoScrollRef.current = autoScroll;
  const autoMode = useMotionValue(1);
  useEffect(() => {
    autoMode.set(autoScroll ? 1 : 0);
  }, [autoScroll, autoMode]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const dragX = useMotionValue(0);
  const baseX = useTransform(scrollYProgress, [0, 1], [0, -shift]);
  const x = useTransform(() =>
    clamp(
      baseX.get() * autoMode.get() + dragX.get(),
      -shiftRef.current,
      0,
    ),
  );

  const dotLeft = useTransform(x, (v) => {
    const max = Math.max(1, shiftRef.current);
    return `${clamp(-v / max, 0, 1) * 100}%`;
  });

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      setShift(Math.max(0, track.scrollWidth - window.innerWidth + 24));
    };
    measure();
    const t = window.setTimeout(measure, 600);
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("resize", measure);
      window.clearTimeout(t);
    };
  }, []);

  // Auto scroll toggle — off restores the original first-project layout on re-enable
  const toggleAutoScroll = () => {
    if (autoScrollRef.current) {
      dragX.set(x.get());
      setAutoScroll(false);
      return;
    }
    dragX.set(0);
    const el = sectionRef.current;
    if (el) {
      const rect = el.getBoundingClientRect();
      if (rect.top < -40) {
        window.scrollTo({
          top: rect.top + window.scrollY,
          behavior: "instant" as ScrollBehavior,
        });
      }
    }
    setAutoScroll(true);
  };

  // Arrow navigation — nudges the track when auto scroll is off
  const nudge = (dir: 1 | -1) => {
    animate(
      dragX,
      clamp(
        dragX.get() + dir * window.innerWidth * 0.6,
        -shiftRef.current,
        0,
      ),
      { duration: 0.6, ease: [0.32, 0.72, 0, 1] },
    );
  };

  // Pointer drag with momentum nudge
  const dragging = useRef(false);
  const startX = useRef(0);
  const startDrag = useRef(0);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    startX.current = e.clientX;
    startDrag.current = dragX.get();
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    dragX.set(startDrag.current + (e.clientX - startX.current));
  };
  const endDrag = () => {
    dragging.current = false;
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className={`relative bg-background ${
        autoScroll ? "h-[190svh]" : "h-screen"
      }`}
    >
      <div
        className={`group flex h-screen flex-col justify-center overflow-hidden ${
          autoScroll ? "sticky top-0" : ""
        }`}
      >
        {/* Section header */}
        <div className="flex items-end justify-between px-5 pb-5 md:px-8">
          <h2 className="font-display text-2xl font-light tracking-wide text-foreground md:text-3xl">
            Our Projects
          </h2>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={toggleAutoScroll}
              aria-pressed={autoScroll}
              className="flex items-center gap-2 rounded-full border border-border px-3.5 py-1.5 text-[10px] tracking-[0.2em] text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
            >
              <span
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  autoScroll ? "bg-foreground" : "bg-border"
                }`}
              />
              AUTO SCROLL {autoScroll ? "ON" : "OFF"}
            </button>
            <span className="text-[11px] tracking-[0.2em] text-muted-foreground">
              ( 09 )
            </span>
          </div>
        </div>

        {/* Horizontal track — driven by vertical scroll, also draggable */}
        <div
          className="cursor-grab touch-pan-y select-none active:cursor-grabbing"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex w-max items-stretch gap-3 pl-5 pr-8 md:pl-8"
          >
            <ProjectCard
              name="Gangadhar Estate"
              image={mediaUrl(gangadharEstate)}
              imgWidth={1402}
              imgHeight={768}
              className="h-[68svh] w-[62vw] sm:w-[42vw] lg:w-[28vw]"
            />
            <div className="flex h-[68svh] w-[86vw] shrink-0 flex-col gap-3 sm:w-[58vw] lg:w-[44vw]">
            <ProjectCard
              name="Krishna Sindhura Hospital"
              image={mediaUrl(krishnaSindhuraHospital)}
              imgWidth={1482}
              imgHeight={768}
              className="w-full min-h-0 flex-1"
            />
            <ProjectCard
              name="Kishore Jain KMS Infra"
              image={mediaUrl(kishoreJainKmsInfra)}
              imgWidth={1360}
              imgHeight={768}
              className="w-full min-h-0 flex-1"
            />
            </div>
            {/* Tall card — Dudhupudi Construction */}
            <ProjectCard
              name="Dudhupudi Construction"
              image={mediaUrl(dudhupudiConstruction)}
              imgWidth={1391}
              imgHeight={1131}
              className="h-[68svh] w-[62vw] sm:w-[42vw] lg:w-[28vw]"
            />
            {/* Stacked pair — K R Constructions / Sarika Estate */}
            <div className="flex h-[68svh] w-[86vw] shrink-0 flex-col gap-3 sm:w-[58vw] lg:w-[44vw]">
              <ProjectCard
                name="K R Constructions"
                image={mediaUrl(krConstructions)}
                imgWidth={1672}
                imgHeight={941}
                className="w-full min-h-0 flex-1"
              />
              <ProjectCard
                name="Sarika Estate"
                image={mediaUrl(sarikaEstate)}
                imgWidth={1684}
                imgHeight={934}
                className="w-full min-h-0 flex-1"
              />
            </div>
            {/* Tall card — Manjunatha Constructions */}
            <ProjectCard
              name="Manjunatha Constructions"
              image={mediaUrl(manjunathaConstructions)}
              imgWidth={1337}
              imgHeight={1176}
              className="h-[68svh] w-[62vw] sm:w-[42vw] lg:w-[28vw]"
            />
            {/* Stacked pair — Evergreen Infra Nunna / Gravity Central */}
            <div className="flex h-[68svh] w-[86vw] shrink-0 flex-col gap-3 sm:w-[58vw] lg:w-[44vw]">
              <ProjectCard
                name="Evergreen Infra - Nunna"
                image={mediaUrl(evergreenInfraNunna)}
                imgWidth={1690}
                imgHeight={931}
                className="w-full min-h-0 flex-1"
              />
              <ProjectCard
                name="Gravity Central"
                image={mediaUrl(gravityCentral)}
                imgWidth={1694}
                imgHeight={929}
                className="w-full min-h-0 flex-1"
              />
            </div>
            {/* End tile */}
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="group flex h-[68svh] w-[46vw] shrink-0 items-center justify-center rounded-lg border border-border bg-card sm:w-[30vw] lg:w-[20vw]"
            >
              <span className="flex flex-col items-center gap-3">
                <span className="font-display text-lg font-light tracking-wide text-foreground md:text-xl">
                  View all projects
                </span>
                <span className="text-[11px] tracking-[0.25em] text-muted-foreground transition-colors group-hover:text-foreground">
                  →
                </span>
              </span>
            </a>
          </motion.div>
        </div>

        {/* Navigation arrows — fade in on hover when auto scroll is off */}
        <div
          className={`absolute left-4 top-1/2 z-20 -translate-y-1/2 transition-opacity duration-300 md:left-8 ${
            autoScroll
              ? "pointer-events-none opacity-0"
              : "opacity-0 group-hover:pointer-events-auto group-hover:opacity-100"
          }`}
        >
          <button
            type="button"
            onClick={() => nudge(1)}
            aria-label="Previous projects"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-foreground text-background shadow-lg transition-transform hover:scale-105 active:scale-95 md:h-12 md:w-12"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M19 12H5" />
              <path d="m12 19-7-7 7-7" />
            </svg>
          </button>
        </div>
        <div
          className={`absolute right-4 top-1/2 z-20 -translate-y-1/2 transition-opacity duration-300 md:right-8 ${
            autoScroll
              ? "pointer-events-none opacity-0"
              : "opacity-0 group-hover:pointer-events-auto group-hover:opacity-100"
          }`}
        >
          <button
            type="button"
            onClick={() => nudge(-1)}
            aria-label="Next projects"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-foreground text-background shadow-lg transition-transform hover:scale-105 active:scale-95 md:h-12 md:w-12"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Progress indicator — dot + line, as in reference */}
        <div className="flex items-center gap-4 px-5 pt-7 md:px-8">
          <div className="relative h-px w-56 max-w-[60vw] bg-border md:w-72">
            <motion.span
              style={{ left: dotLeft }}
              className="absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground"
            />
          </div>
          <span className="hidden text-[10px] tracking-[0.2em] text-muted-foreground md:block">
            DRAG OR SCROLL
          </span>
        </div>
      </div>
    </section>
  );
}
