import { motion } from "framer-motion";
import {
  ArrowRight,
  Box,
  ClipboardList,
  DraftingCompass,
  Layers,
  Sofa,
  TreePine,
  type LucideIcon,
} from "lucide-react";

type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const SERVICES: Service[] = [
  {
    title: "ARCHITECTURAL DESIGN",
    description:
      "We create innovative, sustainable and functional architectural designs tailored to your vision.",
    icon: DraftingCompass,
  },
  {
    title: "INTERIOR DESIGN",
    description:
      "Transforming interiors with elegant, modern and personalized design solutions for every space.",
    icon: Sofa,
  },
  {
    title: "LANDSCAPE DESIGN",
    description:
      "Crafting beautiful outdoor environments that blend nature with contemporary aesthetics.",
    icon: TreePine,
  },
  {
    title: "STRUCTURAL DESIGN",
    description:
      "Ensuring strength and stability with expert structural planning and engineering precision.",
    icon: Layers,
  },
  {
    title: "PROJECT MANAGEMENT",
    description:
      "End-to-end project execution with quality, time and cost efficiency guaranteed.",
    icon: ClipboardList,
  },
  {
    title: "BIM SERVICES",
    description:
      "Delivering advanced BIM modeling for accurate, collaborative and clash-free construction.",
    icon: Box,
  },
];

export function Services() {
  return (
    <section
      id="services"
      className="bg-services-bg px-5 py-16 md:px-8 md:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold">
            What We Do Best
          </p>
          <h2 className="mt-3 font-services text-3xl font-semibold uppercase tracking-[0.08em] text-services-foreground md:text-5xl">
            Our Services
          </h2>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mt-14 md:gap-8 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: (i % 3) * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group flex flex-col items-center rounded-2xl border border-gold/20 bg-services-card px-8 py-10 text-center shadow-[0_2px_20px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)]"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 transition-colors duration-300 group-hover:bg-gold/10">
                <service.icon
                  className="h-7 w-7 text-gold"
                  strokeWidth={1.25}
                />
              </div>
              <h3 className="mt-6 font-services text-sm font-bold uppercase tracking-[0.14em] text-services-foreground">
                {service.title}
              </h3>
              <p className="mt-3 line-clamp-2 text-[13px] leading-relaxed text-services-muted">
                {service.description}
              </p>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="mt-6 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold transition-all duration-300 hover:gap-3"
              >
                Read More
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
