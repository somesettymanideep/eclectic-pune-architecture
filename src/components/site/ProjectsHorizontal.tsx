import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
}: {
  name: string;
  image: string;
  className?: string;
  imgWidth: number;
  imgHeight: number;
}) {
  return (
    <div
      className={`group cursor-viewfinder relative shrink-0 overflow-hidden rounded-lg bg-card ${className}`}
    >
      <img
        src={image}
        alt={name}
        loading="lazy"
        width={imgWidth}
        height={imgHeight}
        draggable={false}
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/25" />
      <span className="pill-label">{name}</span>
    </div>
  );
}

const TALL = "h-full w-[72vw] sm:w-[42vw] lg:w-[28vw]";
const PAIR =
  "flex h-full w-[86vw] shrink-0 flex-col gap-3 sm:w-[58vw] lg:w-[44vw]";
const SLIDE = "snap-start shrink-0";

const arrowBase =
  "absolute top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-black/70 hover:border-white/40 md:h-14 md:w-14";

export function ProjectsHorizontal() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);
  const [progress, setProgress] = useState(0);
  const [dragging, setDragging] = useState(false);

  const update = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanLeft(el.scrollLeft > 10);
    setCanRight(el.scrollLeft < max - 10);
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    // Vertical mouse wheel → horizontal scroll while there is room to move
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      const max = el.scrollWidth - el.clientWidth;
      const goingRight = e.deltaY > 0;
      if ((goingRight && el.scrollLeft >= max - 1) || (!goingRight && el.scrollLeft <= 0)) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("scroll", update);
      el.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const slides = Array.from(el.children) as HTMLElement[];
    const first = slides[0];
    const step = first ? first.offsetWidth + 12 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  // Mouse drag (touch uses native swipe)
  const drag = useRef({ active: false, x: 0, left: 0, moved: false });
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = scrollerRef.current!;
    drag.current = { active: true, x: e.clientX, left: el.scrollLeft, moved: false };
    setDragging(true);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.x;
    if (Math.abs(dx) > 3) drag.current.moved = true;
    scrollerRef.current!.scrollLeft = drag.current.left - dx;
  };
  const endDrag = () => {
    if (!drag.current.active) return;
    drag.current.active = false;
    setDragging(false);
  };

  return (
    <section id="projects" className="relative bg-background py-20 md:py-24">
      <div className="flex items-end justify-between px-5 pb-5 md:px-8">
        <h2 className="font-display text-2xl font-light tracking-wide text-foreground md:text-3xl">
          Our Projects
        </h2>
        <span className="text-[11px] tracking-[0.2em] text-muted-foreground">( 09 )</span>
      </div>

      <div className="group/carousel relative">
        <div
          ref={scrollerRef}
          data-lenis-prevent-wheel
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          className={`no-scrollbar flex h-[62svh] gap-3 overflow-x-auto overscroll-x-contain scroll-px-5 px-5 select-none md:h-[74svh] md:scroll-px-8 md:px-8 ${
            dragging ? "snap-none" : "snap-x snap-mandatory scroll-smooth"
          }`}
        >
          <div className={`${SLIDE} ${TALL}`}>
            <ProjectCard name="Gangadhar Estate" image={mediaUrl(gangadharEstate)} imgWidth={1402} imgHeight={768} className="h-full w-full" />
          </div>
          <div className={`${SLIDE} ${PAIR}`}>
            <ProjectCard name="Krishna Sindhura Hospital" image={mediaUrl(krishnaSindhuraHospital)} imgWidth={1482} imgHeight={768} className="w-full min-h-0 flex-1" />
            <ProjectCard name="Kishore Jain KMS Infra" image={mediaUrl(kishoreJainKmsInfra)} imgWidth={1360} imgHeight={768} className="w-full min-h-0 flex-1" />
          </div>
          <div className={`${SLIDE} ${TALL}`}>
            <ProjectCard name="Dudhupudi Construction" image={mediaUrl(dudhupudiConstruction)} imgWidth={1391} imgHeight={1131} className="h-full w-full" />
          </div>
          <div className={`${SLIDE} ${PAIR}`}>
            <ProjectCard name="K R Constructions" image={mediaUrl(krConstructions)} imgWidth={1672} imgHeight={941} className="w-full min-h-0 flex-1" />
            <ProjectCard name="Sarika Estate" image={mediaUrl(sarikaEstate)} imgWidth={1684} imgHeight={934} className="w-full min-h-0 flex-1" />
          </div>
          <div className={`${SLIDE} ${TALL}`}>
            <ProjectCard name="Manjunatha Constructions" image={mediaUrl(manjunathaConstructions)} imgWidth={1337} imgHeight={1176} className="h-full w-full" />
          </div>
          <div className={`${SLIDE} ${PAIR}`}>
            <ProjectCard name="Evergreen Infra - Nunna" image={mediaUrl(evergreenInfraNunna)} imgWidth={1690} imgHeight={931} className="w-full min-h-0 flex-1" />
            <ProjectCard name="Gravity Central" image={mediaUrl(gravityCentral)} imgWidth={1694} imgHeight={929} className="w-full min-h-0 flex-1" />
          </div>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className={`${SLIDE} group flex h-full w-[46vw] items-center justify-center rounded-lg border border-border bg-card sm:w-[30vw] lg:w-[20vw]`}
          >
            <span className="flex flex-col items-center gap-3">
              <span className="font-display text-lg font-light tracking-wide text-foreground md:text-xl">View all projects</span>
              <span className="text-[11px] tracking-[0.25em] text-muted-foreground transition-colors group-hover:text-foreground">→</span>
            </span>
          </a>
        </div>

        <button
          type="button"
          aria-label="Previous projects"
          onClick={() => scrollByCard(-1)}
          className={`${arrowBase} left-3 md:left-5 ${
            canLeft ? "md:pointer-events-none md:opacity-0 md:group-hover/carousel:pointer-events-auto md:group-hover/carousel:opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <ChevronLeft className="h-6 w-6" strokeWidth={1.5} />
        </button>
        <button
          type="button"
          aria-label="Next projects"
          onClick={() => scrollByCard(1)}
          className={`${arrowBase} right-3 md:right-5 ${
            canRight ? "md:pointer-events-none md:opacity-0 md:group-hover/carousel:pointer-events-auto md:group-hover/carousel:opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <ChevronRight className="h-6 w-6" strokeWidth={1.5} />
        </button>
      </div>

      <div className="flex items-center gap-4 px-5 pt-7 md:px-8">
        <div className="relative h-px w-56 max-w-[60vw] bg-border md:w-72">
          <span
            style={{ left: `${progress * 100}%` }}
            className="absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground transition-[left] duration-150"
          />
        </div>
        <span className="hidden text-[10px] tracking-[0.2em] text-muted-foreground md:block">DRAG, SWIPE OR SCROLL</span>
      </div>
    </section>
  );
}
