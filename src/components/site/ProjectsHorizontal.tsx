import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { adjacentProjectOffset, carouselEdges } from "@/lib/project-carousel";
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
      className={`project-viewfinder group relative shrink-0 overflow-hidden rounded-lg bg-card ${className}`}
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
      <div className="absolute inset-0 bg-background/0 transition-colors duration-500 group-hover:bg-background/25" />
      <span className="pill-label">{name}</span>
    </div>
  );
}

export function ProjectsHorizontal() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ showLeft: false, showRight: true });
  const [progress, setProgress] = useState(0);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);

  const scrollToColumn = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const offsets = Array.from(track.children, (child) =>
      (child as HTMLElement).offsetLeft - (track.firstElementChild as HTMLElement).offsetLeft,
    );
    track.scrollTo({
      left: adjacentProjectOffset(offsets, track.scrollLeft, direction, track.scrollWidth - track.clientWidth),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let wheelTimer: ReturnType<typeof setTimeout> | undefined;
    const update = () => {
      const max = Math.max(0, track.scrollWidth - track.clientWidth);
      setEdges(carouselEdges(track.scrollLeft, max));
      setProgress(max ? track.scrollLeft / max : 0);
    };
    const wheel = (event: WheelEvent) => {
      if (event.ctrlKey) return;
      const delta = (Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY)
        * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? track.clientWidth : 1);
      const max = track.scrollWidth - track.clientWidth;
      if ((delta < 0 && track.scrollLeft <= 0) || (delta > 0 && track.scrollLeft >= max - 1)) return;
      event.preventDefault();
      track.dataset['scrolling'] = "true";
      track.scrollLeft += delta;
      clearTimeout(wheelTimer);
      wheelTimer = setTimeout(() => {
        delete track.dataset['scrolling'];
      }, 180);
    };
    track.addEventListener("scroll", update, { passive: true });
    track.addEventListener("wheel", wheel, { passive: false });
    const observer = new ResizeObserver(update);
    observer.observe(track);
    update();
    return () => {
      clearTimeout(wheelTimer);
      observer.disconnect();
      track.removeEventListener("scroll", update);
      track.removeEventListener("wheel", wheel);
    };
  }, []);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    drag.current = { x: event.clientX, left: event.currentTarget.scrollLeft, moved: false };
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.dataset['dragging'] = "true";
  };
  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const current = drag.current;
    if (!current) return;
    if (Math.abs(event.clientX - current.x) > 4) current.moved = true;
    event.currentTarget.scrollLeft = current.left + current.x - event.clientX;
  };
  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    drag.current = null;
    delete event.currentTarget.dataset['dragging'];
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };

  return (
    <section
      id="projects"
      className="project-gallery relative scroll-mt-24 bg-background py-10 md:py-14"
    >
      <div className="flex flex-col overflow-hidden">
        {/* Section header */}
        <div className="flex items-end justify-between px-5 pb-5 md:px-8">
          <h2 className="font-display text-2xl font-light tracking-wide text-foreground md:text-3xl">
            Our Projects
          </h2>
          <span className="text-[11px] tracking-[0.2em] text-muted-foreground">
            ( 09 )
          </span>
        </div>

        {/* Native horizontal carousel; stacked pairs remain one snap column. */}
        <div className="relative">
          <div
            ref={trackRef}
            role="region"
            aria-label="Architecture projects"
            aria-roledescription="carousel"
            tabIndex={0}
            data-lenis-prevent
            className="project-carousel relative flex items-stretch gap-3 overflow-x-auto overscroll-x-contain px-5 md:px-8 select-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onLostPointerCapture={endDrag}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
                event.preventDefault();
                scrollToColumn(event.key === "ArrowRight" ? 1 : -1);
              }
            }}
          >
            <ProjectCard
              name="Gangadhar Estate"
              image={mediaUrl(gangadharEstate)}
              imgWidth={1402}
              imgHeight={768}
              className="h-[72svh] w-[62vw] sm:w-[42vw] lg:w-[28vw]"
            />
            <div className="flex h-[72svh] w-[86vw] shrink-0 flex-col gap-3 sm:w-[58vw] lg:w-[44vw]">
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
              className="h-[72svh] w-[62vw] sm:w-[42vw] lg:w-[28vw]"
            />
            {/* Stacked pair — K R Constructions / Sarika Estate */}
            <div className="flex h-[72svh] w-[86vw] shrink-0 flex-col gap-3 sm:w-[58vw] lg:w-[44vw]">
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
              className="h-[72svh] w-[62vw] sm:w-[42vw] lg:w-[28vw]"
            />
            {/* Stacked pair — Evergreen Infra Nunna / Gravity Central */}
            <div className="flex h-[72svh] w-[86vw] shrink-0 flex-col gap-3 sm:w-[58vw] lg:w-[44vw]">
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
              className="group flex h-[72svh] w-[46vw] shrink-0 items-center justify-center rounded-lg border border-border bg-card sm:w-[30vw] lg:w-[20vw]"
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
          {edges.showLeft && (
            <Button variant="ghost" size="icon" aria-label="Previous project" title="Previous project"
              onClick={() => scrollToColumn(-1)}
              className="project-arrow absolute left-3 top-1/2 z-20 size-12 -translate-y-1/2 rounded-full border border-foreground/20 bg-background/65 text-foreground backdrop-blur-xl hover:scale-110 hover:bg-background/85 md:left-5">
              <ArrowLeft />
            </Button>
          )}
          {edges.showRight && (
            <Button variant="ghost" size="icon" aria-label="Next project" title="Next project"
              onClick={() => scrollToColumn(1)}
              className="project-arrow absolute right-3 top-1/2 z-20 size-12 -translate-y-1/2 rounded-full border border-foreground/20 bg-background/65 text-foreground backdrop-blur-xl hover:scale-110 hover:bg-background/85 md:right-5">
              <ArrowRight />
            </Button>
          )}
        </div>

        {/* Progress indicator — dot + line, as in reference */}
        <div className="flex items-center gap-4 px-5 pt-7 md:px-8">
          <div className="relative h-px w-56 max-w-[60vw] bg-border md:w-72">
            <span
              style={{ left: `${progress * 100}%` }}
              className="absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
