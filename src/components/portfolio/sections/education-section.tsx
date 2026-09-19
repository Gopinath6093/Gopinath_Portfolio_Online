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

function EducationNode({
  edu,
  index,
}: {
  edu: (typeof portfolioData.education)[0];
  index: number;
}) {
  return (
    <motion.article
      variants={springCardVariants}
      initial="initial"
      whileInView="animate"
      viewport={springViewport}
      transition={{ ...springTransition, delay: index * 0.09 }}
      style={{ perspective: 1000 }}
      className="relative overflow-hidden rounded-[1.8rem] border border-blue-300/25 bg-white/10 p-7 backdrop-blur-xl"
    >
      {/* Glow node */}
      <motion.div
        className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-blue-500/20 blur-[40px]"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="flex items-start gap-4">
        <motion.div
          className="flex-none"
          animate={{ boxShadow: ["0 0 8px rgba(0,120,255,0.4)", "0 0 20px rgba(0,120,255,0.7)", "0 0 8px rgba(0,120,255,0.4)"] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-blue-300/40 bg-blue-500/20 text-sm font-black text-blue-200">
            {String(index + 1).padStart(2, "0")}
          </div>
        </motion.div>

        <div className="flex-1">
          <h3 className="text-xl font-bold text-white">{edu.degree}</h3>
          <p className="mt-1 text-sm font-medium text-blue-200">{edu.institution}</p>
          <p className="mt-1 text-xs tracking-[0.2em] text-cyan-100/60">{edu.period}</p>

          <ul className="mt-4 space-y-2">
            {edu.highlights.map((h) => (
              <li
                key={h}
                className="flex items-start gap-2 rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-cyan-50/85"
              >
                <span className="mt-0.5 flex-none text-blue-400">◈</span>
                {h}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.article>
  );
}

export function EducationSection() {
  return (
    <div className="mx-auto w-[min(1100px,92vw)]">
      <motion.div
        variants={container}
        initial="initial"
        animate="animate"
        className="mb-10"
      >
        <motion.p variants={item} className="text-[11px] uppercase tracking-[0.5em] text-cyan-300/80">
          05 · Education
        </motion.p>
        <motion.h1
          variants={item}
          className="mt-2 bg-gradient-to-r from-white to-white/50 bg-clip-text text-4xl font-black tracking-tight text-transparent sm:text-5xl"
        >
          Knowledge Universe
        </motion.h1>
        <motion.p variants={item} className="mt-3 max-w-xl text-sm text-cyan-100/75">
          The academic foundations that shaped systematic thinking and technical depth.
        </motion.p>
      </motion.div>

      <div className="space-y-5">
        {portfolioData.education.map((edu, i) => (
          <EducationNode key={edu.institution} edu={edu} index={i} />
        ))}
      </div>

      {/* Certifications hint */}
      <motion.div
        variants={springCardVariants}
        initial="initial"
        whileInView="animate"
        viewport={springViewport}
        className="mt-6 rounded-2xl border border-white/12 bg-white/10 p-5 text-center backdrop-blur-xl"
      >
        <p className="text-[11px] uppercase tracking-[0.4em] text-cyan-300/80">
          Continuous Learning
        </p>
        <p className="mt-2 text-sm text-cyan-50/80">
          Actively pursuing certifications in product management and advanced automation engineering.
        </p>
      </motion.div>
    </div>
  );
}

