"use client";

import { motion } from "framer-motion";
import { springCardVariants, springTransition, springViewport } from "@/components/portfolio/spring-reveal";
import { portfolioData } from "@/data/portfolio-data";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const container = {
  animate: { transition: { staggerChildren: 0.1, delayChildren: 0.06 } },
};

const item = {
  initial: { opacity: 0, y: 26 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
};

function ExperienceCard({
  exp,
  index,
}: {
  exp: (typeof portfolioData.experience)[0];
  index: number;
}) {
  return (
    <motion.article
      variants={springCardVariants}
      initial="initial"
      whileInView="animate"
      viewport={springViewport}
      transition={{ ...springTransition, delay: index * 0.09 }}
      whileHover={{ y: -3, boxShadow: "0 16px 50px rgba(110,68,255,0.14)" }}
      style={{ perspective: 1000 }}
      className="relative overflow-hidden rounded-[1.8rem] border border-cyan-200/20 bg-black/40 p-6 backdrop-blur-xl transition-all"
    >
      {/* Accent bar */}
      <div className="absolute left-0 top-0 h-full w-1 rounded-l-[1.8rem] bg-gradient-to-b from-cyan-400 via-fuchsia-500 to-transparent opacity-70" />

      <div className="flex flex-col gap-1 pl-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-xl font-bold text-white">{exp.role}</h3>
          <p className="mt-1 text-sm font-medium text-cyan-200">{exp.company}</p>
        </div>
        <span className="mt-1 flex-none self-start rounded-full bg-fuchsia-500/20 px-3 py-1 text-xs tracking-[0.2em] text-fuchsia-100 sm:mt-0">
          {exp.period}
        </span>
      </div>

      <p className="mt-4 pl-4 text-sm leading-relaxed text-cyan-100/85">{exp.impact}</p>

      <ul className="mt-4 grid gap-2 pl-4">
        {exp.highlights.map((h, i) => (
          <motion.li
            key={h}
            variants={springCardVariants}
            initial="initial"
            whileInView="animate"
            viewport={springViewport}
            transition={{ ...springTransition, delay: 0.12 + i * 0.07 }}
            className="flex items-start gap-2 rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-cyan-50/90"
          >
            <span className="mt-0.5 flex-none text-cyan-400">▸</span>
            {h}
          </motion.li>
        ))}
      </ul>
    </motion.article>
  );
}

export function ExperienceSection() {
  return (
    <div className="mx-auto w-[min(1100px,92vw)]">
      <motion.div
        variants={container}
        initial="initial"
        animate="animate"
        className="mb-10"
      >
        <motion.p variants={item} className="text-[11px] uppercase tracking-[0.5em] text-cyan-300/80">
          02 · Experience
        </motion.p>
        <motion.h1
          variants={item}
          className="mt-2 bg-gradient-to-r from-white to-white/50 bg-clip-text text-4xl font-black tracking-tight text-transparent sm:text-5xl"
        >
          Career Galaxy
        </motion.h1>
        <motion.p variants={item} className="mt-3 max-w-xl text-sm text-cyan-100/75">
          Every role has been a system upgrade — more impact, broader scope, deeper quality thinking.
        </motion.p>
      </motion.div>

      <div className="space-y-5">
        {portfolioData.experience.map((exp, i) => (
          <ExperienceCard key={`${exp.company}-${exp.role}`} exp={exp} index={i} />
        ))}
      </div>

      {/* Testimonials */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {portfolioData.testimonials.map((t, i) => (
          <motion.article
            key={t.author}
            variants={springCardVariants}
            initial="initial"
            whileInView="animate"
            viewport={springViewport}
            transition={{ ...springTransition, delay: i * 0.08 }}
            className="rounded-2xl border border-white/12 bg-white/10 p-5 backdrop-blur-xl"
          >
            <p className="text-sm italic leading-relaxed text-cyan-50/85">&ldquo;{t.quote}&rdquo;</p>
            <p className="mt-3 text-xs tracking-[0.2em] text-cyan-300/80">— {t.author}</p>
          </motion.article>
        ))}
      </div>
    </div>
  );
}

