import { motion } from "framer-motion";

const PARAGRAPHS = [
  "Founded in 2006 by Pritika Manjrekar, Moco Design Studio has been creating the cityscape of Pune. Our impact ranges from IT parks, corporate campuses, high-end residential communities to educational institutions to name a few.",
  "A team of architects, designers and strategists have an authentically collaborative approach towards architecture. The Design Studio is empowered by a diverse and rich network of consultants and vendor partners.",
  "With a focus on Design Excellence and Efficiency Moco Design Studio is committed to catalyzing impact through architecture.",
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
          Moco Design
          <br />
          Studio
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
              className="max-w-xl text-[13px] leading-relaxed text-muted-foreground"
            >
              {text}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
