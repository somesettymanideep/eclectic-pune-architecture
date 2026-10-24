import { motion } from "framer-motion";

const PARAGRAPHS = [
  "Studio for Eclectic Architecture is a dynamic firm offering various design solutions. Our core services encompass architecture, interiors, and landscape, ensuring a comprehensive approach to every project we undertake.",
  "We specialize in creating unique designs for residential homes, commercial spaces, villas, apartments, layouts, and resorts, providing tailored solutions that reflect functionality and aesthetic appeal.",
];

export function About() {
  return (
    <section id="about" className="bg-background px-5 py-20 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1fr_1.2fr] md:gap-16">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-4xl font-light leading-tight tracking-wide text-foreground md:text-5xl lg:text-6xl"
        >
          Studio for
          <br />
          Eclectic
          <br />
          Architecture
        </motion.h2>

        <div className="space-y-5 md:pt-2">
          {PARAGRAPHS.map((text, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="max-w-xl text-[13px] leading-relaxed text-muted-foreground lg:text-[19px] lg:leading-relaxed lg:text-foreground"
            >
              {text}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
