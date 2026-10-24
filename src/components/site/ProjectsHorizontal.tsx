import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
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
  const viewportRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const [hovered, setHovered] = useState(false);

  const [shift, setShift] = useState(0);
  const shiftRef = useRef(0);
  shiftRef.current = shift;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const horizontalProgress = useMotionValue(0);
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (!autoScroll || !viewportRef.current) return;
    viewportRef.current.scrollLeft = clamp(progress, 0, 1) * shiftRef.current;
  });

  const dotLeft = useTransform(
    horizontalProgress,
    (v) => `${clamp(v, 0, 1) * 100}%`,
  );

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      setShift(Math.max(0, track.scrollWidth - (viewportRef.current?.clientWidth ?? window.innerWidth)));
    };
    measure();
    const t = window.setTimeout(measure, 600);
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("resize", measure);
      window.clearTimeout(t);
    };
  }, []);

  const changeAutoScroll = (enabled: boolean) => {
    setAutoScroll(enabled);
    if (!enabled) return;
    const section = sectionRef.current;
    if (section) {
      window.scrollTo({ top: window.scrollY + section.getBoundingClientRect().top, behavior: "instant" });
    }
    if (viewportRef.current) viewportRef.current.scrollLeft = 0;
    horizontalProgress.set(0);
  };

  const navigate = (direction: number) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    viewport.scrollBy({ left: direction * viewport.clientWidth * 0.8, behavior: reducedMotion ? "instant" : "smooth" });
  };

  // Native horizontal scrolling also supports pointer dragging.
  const dragging = useRef(false);
  const startX = useRef(0);
  const startDrag = useRef(0);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch" || e.button !== 0) return;
    dragging.current = true;
    startX.current = e.clientX;
    startDrag.current = e.currentTarget.scrollLeft;
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    e.currentTarget.scrollLeft = startDrag.current - (e.clientX - startX.current);
  };
  const endDrag = () => {
    dragging.current = false;
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative bg-background ${autoScroll ? "h-[190svh]" : "h-screen"}`}
    >
      <div className={`${autoScroll ? "sticky top-0" : "relative"} flex h-screen flex-col justify-center overflow-hidden`}>
        {/* Section header */}
        <div className="flex items-end justify-between px-5 pb-5 md:px-8">
          <h2 className="font-display text-2xl font-light tracking-wide text-foreground md:text-3xl">
            Our Projects
          </h2>
          <div className="flex items-center gap-4">
            <label htmlFor="projects-autoscroll" className="flex cursor-pointer items-center gap-2 text-xs text-muted-foreground">
              Auto scroll
              <Switch id="projects-autoscroll" checked={autoScroll} onCheckedChange={changeAutoScroll} aria-label="Auto scroll" />
              <span className="w-5 text-foreground">{autoScroll ? "On" : "Off"}</span>
            </label>
            <span className="text-[11px] tracking-[0.2em] text-muted-foreground">( 09 )</span>
          </div>
        </div>

        {/* Horizontal track — driven by vertical scroll, also draggable */}
        <div className="relative">
        <div
          ref={viewportRef}
          role="region"
          aria-label="Project gallery"
          data-lenis-prevent
          onScroll={(e) => horizontalProgress.set(shift > 0 ? e.currentTarget.scrollLeft / shift : 0)}
          className={`projects-viewport cursor-grab touch-pan-x select-none overflow-x-auto active:cursor-grabbing ${autoScroll ? "" : "projects-scrollbar-hidden"}`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          <div
            ref={trackRef}
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
          </div>
        </div>
        {!autoScroll && <div
          aria-hidden={!hovered}
          className={`pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between px-4 transition-opacity duration-300 motion-reduce:transition-none md:px-6 ${hovered ? "opacity-100" : "opacity-0"}`}
        >
          <Button size="icon" aria-label="Previous projects" title="Previous projects" tabIndex={hovered ? 0 : -1} onClick={() => navigate(-1)} className={`size-11 rounded-full bg-primary text-primary-foreground shadow-none hover:bg-primary/90 ${hovered ? "pointer-events-auto" : "pointer-events-none"}`}><ArrowLeft /></Button>
          <Button size="icon" aria-label="Next projects" title="Next projects" tabIndex={hovered ? 0 : -1} onClick={() => navigate(1)} className={`size-11 rounded-full bg-primary text-primary-foreground shadow-none hover:bg-primary/90 ${hovered ? "pointer-events-auto" : "pointer-events-none"}`}><ArrowRight /></Button>
        </div>}
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
