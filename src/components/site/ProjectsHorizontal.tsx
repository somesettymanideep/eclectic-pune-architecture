import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import gangadharEstate from "@/assets/projects/gangadhar-estate.png.asset.json";
import krishnaSindhuraHospital from "@/assets/projects/krishna-sindhura-hospital.png.asset.json";
import kishoreJainKmsInfra from "@/assets/projects/kishore-jain-kms-infra.png.asset.json";
import dudhupudiConstruction from "@/assets/projects/dudhupudi-construction.png.asset.json";
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

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, (v) => -v * shift);

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      setShift(Math.max(0, track.scrollWidth - window.innerWidth));
    };
    measure();
    const t = window.setTimeout(measure, 600);
    window.addEventListener("resize", measure);

    const ro = new ResizeObserver(measure);
    if (trackRef.current) {
      ro.observe(trackRef.current);
    }

    return () => {
      window.removeEventListener("resize", measure);
      window.clearTimeout(t);
      ro.disconnect();
    };
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative h-[190svh] bg-background"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pb-4 pt-20 md:pb-6 md:pt-24">
        {/* Section header */}
        <div
          className={`flex items-end justify-between pb-6 `}
        >
          <h2 className="font-display text-2xl font-light tracking-wide text-foreground md:text-3xl">
            Our Projects
          </h2>
          <span className="text-[11px] tracking-[0.2em] text-muted-foreground">
            ( 04 )
          </span>
        </div>

        {/* Horizontal track — driven by vertical scroll */}
        <div className="select-none">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex w-max items-stretch gap-3 px-5 md:px-8"
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
      </div>
    </section>
  );
}
