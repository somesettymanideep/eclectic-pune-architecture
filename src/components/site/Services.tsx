import { motion } from "framer-motion";
import architectural from "@/assets/services/architectural-design.jpg";
import interior from "@/assets/services/interior-design.jpg";
import landscape from "@/assets/services/landscape-design.jpg";
import structural from "@/assets/services/structural-design.jpg";
import projectManagement from "@/assets/services/project-management.jpg";
import bim from "@/assets/services/bim-services.jpg";

const SERVICES = [
  { title: ["Architectural", "Design"], image: architectural },
  { title: ["Interior", "Design"], image: interior },
  { title: ["Landscape", "Design"], image: landscape },
  { title: ["Structural", "Design"], image: structural },
  { title: ["Project", "Management"], image: projectManagement },
  { title: ["BIM", "Services"], image: bim },
];

export function Services() {
  return (
    <section
      id="services"
      className="bg-background px-5 pb-20 pt-6 md:px-8 md:pb-24"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-5 flex items-center gap-4"
        >
          <span className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            Our Services
          </span>
          <span className="h-px w-16 bg-border md:w-28" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 font-display text-2xl font-light leading-tight tracking-wide text-foreground md:text-3xl lg:text-4xl"
        >
          Crafting Spaces
          <br />
          for a <span className="text-bronze">Better Tomorrow</span>
        </motion.h2>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {SERVICES.map((service, i) => (
            <motion.article
              key={service.title.join(" ")}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative aspect-[2/3] cursor-pointer overflow-hidden rounded-lg border border-border/60 bg-card"
            >
              <img
                src={service.image}
                alt={`${service.title.join(" ")} services`}
                loading="lazy"
                width={768}
                height={1024}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3 md:p-4">
                <h3 className="font-display text-sm font-light leading-snug text-foreground md:text-base">
                  {service.title[0]}
                  <br />
                  {service.title[1]}
                </h3>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="mt-2 inline-flex items-center gap-1.5 text-[11px] tracking-wide text-muted-foreground transition-colors hover:text-foreground"
                >
                  Read More
                  <svg
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                    className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2.5 8h11M9.5 4l4 4-4 4" />
                  </svg>
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
