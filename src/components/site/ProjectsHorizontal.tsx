import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
      className={`group/card relative shrink-0 cursor-pointer overflow-hidden rounded-lg bg-card ${className}`}
    >
      <img
        src={image}
        alt={name}
        loading="lazy"
        width={imgWidth}
        height={imgHeight}
        draggable={false}
        className={`h-full w-full ${imageFit === "contain" ? "object-contain" : "object-cover"} transition-transform duration-700 ease-out group-hover/card:scale-105`}
      />
      <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover/card:bg-black/25" />
      <span className="pill-label">{name}</span>
    </div>
  );
}

export function ProjectsHorizontal() {
  const [autoScroll, setAutoScroll] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const previousMode = useRef(autoScroll);

  useEffect(() => {
    const modeChanged = previousMode.current !== autoScroll;
    previousMode.current = autoScroll;
    if (modeChanged) {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (section) {
        // Keep the gallery in view when its pinned height changes. Enabling
        // starts at the original first-project layout, not halfway through it.
        window.scrollTo({
          top: window.scrollY + section.getBoundingClientRect().top,
          behavior: "instant",
        });
      }
      if (autoScroll && track) track.scrollLeft = 0;
    }
    if (!autoScroll) return;
    let frame = 0;
    const syncScroll = () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track || dragging.current) return;
      const rect = section.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      if (travel <= 0) return;
      const progress = Math.max(0, Math.min(1, -rect.top / travel));
      track.scrollLeft = progress * Math.max(0, track.scrollWidth - track.clientWidth);
    };
    const scheduleSync = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(syncScroll);
    };
    window.addEventListener("scroll", scheduleSync, { passive: true });
    window.addEventListener("resize", scheduleSync);
    scheduleSync();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleSync);
      window.removeEventListener("resize", scheduleSync);
    };
  }, [autoScroll]);

  const scrollBy = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({
      left: dir * Math.max(track.clientWidth * 0.7, 320),
      behavior: "smooth",
    });
  };

  // Pointer drag
  const dragging = useRef(false);
  const startX = useRef(0);
  const startScroll = useRef(0);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    startX.current = e.clientX;
    startScroll.current = trackRef.current?.scrollLeft ?? 0;
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current || !trackRef.current) return;
    trackRef.current.scrollLeft =
      startScroll.current - (e.clientX - startX.current);
  };
  const endDrag = () => {
    dragging.current = false;
  };

  return (
    <section ref={sectionRef} id="projects" className={`group relative bg-background ${autoScroll ? "h-[190svh]" : ""}`}>
      <div className={autoScroll ? "sticky top-0 flex h-screen flex-col justify-center py-10" : "py-10"}>
      {/* Section header */}
      <div className="flex items-end justify-between px-5 pb-5 md:px-8">
        <h2 className="font-display text-2xl font-light tracking-wide text-foreground md:text-3xl">
          Our Projects
        </h2>
        <div className="flex items-center gap-4">
          <label htmlFor="projects-auto-scroll" className="flex cursor-pointer items-center gap-2 text-xs text-muted-foreground">
            Auto scroll
            <Switch id="projects-auto-scroll" checked={autoScroll} onCheckedChange={setAutoScroll} />
            <span className="w-5 text-foreground">{autoScroll ? "On" : "Off"}</span>
          </label>
        <span className="hidden text-[11px] tracking-[0.2em] text-muted-foreground sm:inline">
          ( 09 )
        </span>
        </div>
      </div>

      <div className="relative">
        {/* Horizontal track — drag or use arrows; scrollbar hidden */}
        <div
          ref={trackRef}
          data-lenis-prevent
          className={`cursor-grab touch-pan-y select-none overflow-x-auto active:cursor-grabbing ${autoScroll ? "projects-scrollbar" : "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden"}`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          <div className="flex w-max items-stretch gap-3 pl-5 pr-8 md:pl-8">
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
            <ProjectCard
              name="Dudhupudi Construction"
              image={mediaUrl(dudhupudiConstruction)}
              imgWidth={1391}
              imgHeight={1131}
              className="h-[68svh] w-[62vw] sm:w-[42vw] lg:w-[28vw]"
            />
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
            <ProjectCard
              name="Manjunatha Constructions"
              image={mediaUrl(manjunathaConstructions)}
              imgWidth={1337}
              imgHeight={1176}
              className="h-[68svh] w-[62vw] sm:w-[42vw] lg:w-[28vw]"
            />
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
              className="group/end flex h-[68svh] w-[46vw] shrink-0 items-center justify-center rounded-lg border border-border bg-card sm:w-[30vw] lg:w-[20vw]"
            >
              <span className="flex flex-col items-center gap-3">
                <span className="font-display text-lg font-light tracking-wide text-foreground md:text-xl">
                  View all projects
                </span>
                <span className="text-[11px] tracking-[0.25em] text-muted-foreground transition-colors group-hover/end:text-foreground">
                  →
                </span>
              </span>
            </a>
          </div>
        </div>

        {/* Arrows — visible only while hovering the projects section */}
        <Button
          type="button"
          size="icon"
          aria-label="Previous projects"
          title="Previous projects"
          onClick={() => scrollBy(-1)}
          className="absolute left-4 top-1/2 z-20 h-12 w-12 -translate-y-1/2 rounded-full bg-primary text-primary-foreground opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100 focus-visible:opacity-100 hover:bg-primary/90 motion-reduce:transition-none"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          type="button"
          size="icon"
          aria-label="Next projects"
          title="Next projects"
          onClick={() => scrollBy(1)}
          className="absolute right-4 top-1/2 z-20 h-12 w-12 -translate-y-1/2 rounded-full bg-primary text-primary-foreground opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100 focus-visible:opacity-100 hover:bg-primary/90 motion-reduce:transition-none"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
      </div>
    </section>
  );
}
