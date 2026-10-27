import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import gangadharEstate from "@/assets/projects/gangadhar-estate.png.asset.json";
import krishnaSindhuraHospital from "@/assets/projects/krishna-sindhura-hospital.png.asset.json";
import kishoreJainKmsInfra from "@/assets/projects/kishore-jain-kms-infra.png.asset.json";
import dudhupudiConstruction from "@/assets/projects/dudhupudi-construction.png.asset.json";
import { mediaUrl } from "@/lib/media-url";

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

// Shared container gutter so the header, the cards and the progress row align
const GUTTER = "px-6 md:px-10 lg:px-16";

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

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const dragX = useMotionValue(0);
  const baseX = useTransform(scrollYProgress, [0, 1], [0, -shift]);
  const x = useTransform(() =>
    clamp(baseX.get() + dragX.get(), -shiftRef.current, 0),
  );

  const dotLeft = useTransform(x, (v) => {
    const max = Math.max(1, shiftRef.current);
    return `${clamp(-v / max, 0, 1) * 100}%`;
  });

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      setShift(Math.max(0, track.scrollWidth - window.innerWidth));
    };
    measure();
    const t = window.setTimeout(measure, 600);
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("resize", measure);
      window.clearTimeout(t);
    };
  }, []);

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
      className="relative h-[190svh] bg-background"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden py-6 md:py-10">
        {/* Section header */}
        <div
          className={`flex items-end justify-between pb-6 ${GUTTER} md:pb-8`}
        >
          <h2 className="font-display text-2xl font-light tracking-wide text-foreground md:text-3xl">
            Our Projects
          </h2>
          <span className="text-[11px] tracking-[0.2em] text-muted-foreground">
            ( 04 )
          </span>
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
            className={`flex w-max items-stretch gap-3 ${GUTTER}`}
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
          </motion.div>
        </div>

        {/* Progress indicator — dot + line */}
        <div className={`flex items-center gap-4 pt-8 ${GUTTER}`}>
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
