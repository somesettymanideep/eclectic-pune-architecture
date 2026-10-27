import { motion } from "framer-motion";
import gangadharEstate from "@/assets/projects/gangadhar-estate.png.asset.json";
import krishnaSindhuraHospital from "@/assets/projects/krishna-sindhura-hospital.png.asset.json";
import kishoreJainKmsInfra from "@/assets/projects/kishore-jain-kms-infra.png.asset.json";
import dudhupudiConstruction from "@/assets/projects/dudhupudi-construction.png.asset.json";
import { mediaUrl } from "@/lib/media-url";

const PROJECTS = [
  {
    name: "Gangadhar Estate",
    image: gangadharEstate,
    imgWidth: 1402,
    imgHeight: 768,
  },
  {
    name: "Krishna Sindhura Hospital",
    image: krishnaSindhuraHospital,
    imgWidth: 1482,
    imgHeight: 768,
  },
  {
    name: "Kishore Jain KMS Infra",
    image: kishoreJainKmsInfra,
    imgWidth: 1360,
    imgHeight: 768,
  },
  {
    name: "Dudhupudi Construction",
    image: dudhupudiConstruction,
    imgWidth: 1391,
    imgHeight: 1131,
  },
];

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
      className={`group relative cursor-pointer overflow-hidden rounded-lg bg-card ${className}`}
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

export function ProjectsHorizontal() {
  return (
    <section
      id="projects"
      className="bg-background px-5 py-20 md:px-8 md:py-24"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="flex items-end justify-between pb-6 md:pb-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-2xl font-light tracking-wide text-foreground md:text-3xl"
          >
            Our Projects
          </motion.h2>
          <span className="text-[11px] tracking-[0.2em] text-muted-foreground">
            ( 04 )
          </span>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <ProjectCard
                name={project.name}
                image={mediaUrl(project.image)}
                imgWidth={project.imgWidth}
                imgHeight={project.imgHeight}
                className="aspect-[16/10] w-full"
              />
            </motion.div>
          ))}
        </div>

        {/* View more projects button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex justify-center md:mt-14"
        >
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="group inline-flex items-center gap-3 rounded-full border border-border bg-card/60 px-6 py-3 text-xs uppercase tracking-[0.2em] text-foreground backdrop-blur-sm transition-all duration-300 hover:border-foreground/50 hover:bg-foreground hover:text-background md:px-8 md:py-3.5 md:text-sm"
          >
            <span>View More Projects</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
