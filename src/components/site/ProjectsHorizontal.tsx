import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
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

const PROJECTS: {
  name: string;
  image: string;
  imgWidth: number;
  imgHeight: number;
}[] = [
  { name: "Gangadhar Estate", image: mediaUrl(gangadharEstate), imgWidth: 1402, imgHeight: 768 },
  { name: "Krishna Sindhura Hospital", image: mediaUrl(krishnaSindhuraHospital), imgWidth: 1482, imgHeight: 768 },
  { name: "Kishore Jain KMS Infra", image: mediaUrl(kishoreJainKmsInfra), imgWidth: 1360, imgHeight: 768 },
  { name: "Dudhupudi Construction", image: mediaUrl(dudhupudiConstruction), imgWidth: 1391, imgHeight: 1131 },
  { name: "K R Constructions", image: mediaUrl(krConstructions), imgWidth: 1672, imgHeight: 941 },
  { name: "Sarika Estate", image: mediaUrl(sarikaEstate), imgWidth: 1684, imgHeight: 934 },
  { name: "Manjunatha Constructions", image: mediaUrl(manjunathaConstructions), imgWidth: 1337, imgHeight: 1176 },
  { name: "Evergreen Infra - Nunna", image: mediaUrl(evergreenInfraNunna), imgWidth: 1690, imgHeight: 931 },
  { name: "Gravity Central", image: mediaUrl(gravityCentral), imgWidth: 1694, imgHeight: 929 },
];

function ProjectCard({
  name,
  image,
  imgWidth,
  imgHeight,
}: {
  name: string;
  image: string;
  imgWidth: number;
  imgHeight: number;
}) {
  return (
    <div className="group relative h-[68svh] w-full overflow-hidden rounded-lg bg-card">
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

function ArrowButton({
  direction,
  onClick,
  disabled,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={direction === "prev" ? "Previous projects" : "Next projects"}
      onClick={onClick}
      disabled={disabled}
      className={`projects-arrow projects-arrow-${direction} ${
        disabled ? "projects-arrow-disabled" : ""
      }`}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {direction === "prev" ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 6l6 6-6 6" />}
      </svg>
    </button>
  );
}

export function ProjectsHorizontal() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section id="projects" className="projects-section relative bg-background py-6">
      <div className="flex flex-col gap-4">
        {/* Section header */}
        <div className="flex items-end justify-between px-5 md:px-8">
          <h2 className="font-display text-2xl font-light tracking-wide text-foreground md:text-3xl">
            Our Projects
          </h2>
          <span className="text-[11px] tracking-[0.2em] text-muted-foreground">
            ( 09 )
          </span>
        </div>

        {/* Swiper carousel — arrow navigation only, no scrollbar, no autoplay */}
        <div className="projects-wrapper">
          <Swiper
            modules={[Navigation]}
            onSwiper={(s) => {
              swiperRef.current = s;
            }}
            speed={600}
            autoplay={false}
            slidesPerView={1}
            spaceBetween={12}
            allowTouchMove={true}
            breakpoints={{
              768: { slidesPerView: 2, allowTouchMove: false },
              1280: { slidesPerView: 3, allowTouchMove: false },
            }}
            className="projects-swiper !px-5 md:!px-8"
          >
            {PROJECTS.map((p) => (
              <SwiperSlide key={p.name}>
                <ProjectCard {...p} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Hover-only navigation arrows */}
          <ArrowButton
            direction="prev"
            onClick={() => swiperRef.current?.slidePrev()}
            disabled={false}
          />
          <ArrowButton
            direction="next"
            onClick={() => swiperRef.current?.slideNext()}
            disabled={false}
          />
        </div>
      </div>
    </section>
  );
}
