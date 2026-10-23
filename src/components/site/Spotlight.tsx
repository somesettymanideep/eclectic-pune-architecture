import { motion } from "framer-motion";
import inclusive from "@/assets/spotlight/inclusive-architecture.jpg";
import collaboration from "@/assets/spotlight/collaboration.jpg";
import coreValues from "@/assets/spotlight/core-values.jpg";

const CARDS = [
  { title: "Inclusive Architecture", image: inclusive },
  { title: "Collaboration to achieve Sterling success", image: collaboration },
  { title: "Deep diving into our core values", image: coreValues },
];

export function Spotlight() {
  return (
    <section
      id="spotlight"
      className="bg-background px-5 pb-20 pt-4 md:px-8 md:pb-24"
    >
      <div className="mx-auto max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 font-display text-2xl font-light tracking-wide text-foreground md:text-3xl"
        >
          Monthly Spotlight
        </motion.h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-3">
          {CARDS.map((card, i) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group cursor-pointer"
            >
              <div className="overflow-hidden rounded-lg bg-card">
                <img
                  src={card.image}
                  alt={card.title}
                  loading="lazy"
                  width={1024}
                  height={1152}
                  className="aspect-[10/11] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <h3 className="mt-4 max-w-xs text-sm font-normal leading-snug text-foreground">
                {card.title}
              </h3>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="mt-2 inline-block text-[11px] tracking-wide text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
              >
                Read More
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
