"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { springCardVariants, springTransition, springViewport, useScrollDirection } from "@/components/portfolio/spring-reveal";
import { portfolioData } from "@/data/portfolio-data";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const container = {
  animate: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } },
};

const item = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
};

const timelineEvents = [
  { year: "2023-MAY", event: "I was offered On-Campus & Started my QA career - Non-functional Test Engineer" },
  { year: "2023-OCT", event: "Moved into Amazon India for a Quality role under a Robotics Device team" },
  { year: "2024-OCT", event: "Transitioned into Alexa Team internally in Amazon for a Quality role" },
  { year: "2025-OCT", event: "Career switched into Agilysys for a Quality role in the Book & Guest app team" },
  { year: "2026", event: "Driving QA + UI & API Automation + Product alignment for enterprise delivery" },
];

function TimelineNode({ year, event, index }: { year: string; event: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-60px" });
  const scrollDirection = useScrollDirection();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: scrollDirection === "up" ? 50 : -50, scale: 0.9 }}
      animate={inView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: scrollDirection === "up" ? 50 : -50, scale: 0.9 }}
      transition={{ ...springTransition, delay: index * 0.08 }}
      className="relative flex gap-4"
    >
      <div className="flex flex-col items-center">
        <motion.div
          className="mt-1 h-3 w-3 flex-none rounded-full border-2 border-cyan-300 bg-black"
          animate={inView ? { boxShadow: "0 0 10px 2px rgba(0,229,255,0.6)" } : {}}
          transition={{ delay: index * 0.07 + 0.3 }}
        />
        {index < timelineEvents.length - 1 && (
          <div className="mt-1 w-px flex-1 bg-gradient-to-b from-cyan-400/40 to-transparent" />
        )}
      </div>
      <div className="pb-6">
        <span className="text-[11px] font-semibold tracking-[0.3em] text-cyan-300">{year}</span>
        <p className="mt-1 text-sm text-cyan-50/85">{event}</p>
      </div>
    </motion.div>
  );
}

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollDirection = useScrollDirection();

  return (
    <div className="mx-auto w-[min(1100px,92vw)] max-sm:w-[calc(100%_-_48px)] max-sm:max-w-[1100px]">
      {/* Page header */}
      <motion.div
        variants={container}
        initial="initial"
        animate="animate"
        className="mb-10"
      >
        <motion.p variants={item} className="text-[11px] uppercase tracking-[0.5em] text-cyan-300/80">
          01 · About
        </motion.p>
        <motion.h1
          variants={item}
          className="mt-2 bg-gradient-to-r from-white to-white/50 bg-clip-text text-4xl font-black tracking-tight text-transparent sm:text-5xl"
        >
          Story Engine
        </motion.h1>
      </motion.div>

      {/* Who I am */}
      <motion.div
        variants={container}
        initial="initial"
        animate="animate"
        className="grid gap-6 lg:grid-cols-[1fr_1fr]"
        style={{ perspective: 1000 }}
      >
        <motion.article
          variants={springCardVariants}
          custom={scrollDirection}
          animate={scrollDirection === "up" ? "initialUp" : "initialDown"}
          whileInView="animate"
          viewport={springViewport}
          className="rounded-[1.8rem] border border-cyan-300/20 bg-white/10 p-7 backdrop-blur-xl"
        >
          <h2 className="text-xl font-bold text-white">Who I Am</h2>
          <p className="mt-4 text-sm leading-relaxed text-cyan-100/80">
            I am a Quality Assurance Engineer who bridges the gap between technical precision and
            product strategy. With deeper expertise in automation, test architecture, and release
            confidence — I help teams ship faster without compromising on quality.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-cyan-100/75">
            My approach combines systematic thinking with product empathy. I believe quality is a
            competitive advantage, not a final gate. I embed quality thinking at every stage of
            the product lifecycle.
          </p>
        </motion.article>

        <motion.article
          variants={springCardVariants}
          custom={scrollDirection}
          animate={scrollDirection === "up" ? "initialUp" : "initialDown"}
          whileInView="animate"
          viewport={springViewport}
          className="rounded-[1.8rem] border border-fuchsia-300/20 bg-white/10 p-7 backdrop-blur-xl"
        >
          <h2 className="text-xl font-bold text-white">My Vision</h2>
          <p className="mt-4 text-sm leading-relaxed text-cyan-100/80">
            I envision a world where quality is inseparable from the product — where every
            engineer thinks like a quality champion and every release is a confident, data-driven
            decision.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-cyan-100/75">
            Building that culture, one team at a time, is the mission that drives my work daily.
          </p>
        </motion.article>
      </motion.div>

      {/* Philosophy */}
      <motion.div
        variants={container}
        initial="initial"
        animate="animate"
        className="mt-6 grid gap-4 sm:grid-cols-3"
        style={{ perspective: 1000 }}
      >
        {portfolioData.philosophy.map((p, i) => (
          <motion.article
            key={p}
            variants={springCardVariants}
            custom={scrollDirection}
            animate={scrollDirection === "up" ? "initialUp" : "initialDown"}
            whileInView="animate"
            viewport={springViewport}
            transition={{ ...springTransition, delay: i * 0.08 }}
            whileHover={{ y: -4, boxShadow: "0 10px 40px rgba(0,229,255,0.12)" }}
            className="rounded-2xl border border-white/12 bg-black/40 p-5 text-sm text-cyan-50/90"
          >
            <span className="text-xs font-bold tracking-[0.3em] text-cyan-300/70">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="mt-2">{p}</p>
          </motion.article>
        ))}
      </motion.div>

      {/* Timeline */}
      <motion.div
        variants={springCardVariants}
        custom={scrollDirection}
        initial="initial"
        animate={scrollDirection === "up" ? "initialUp" : "initialDown"}
        whileInView="animate"
        viewport={springViewport}
        className="mt-10 rounded-[1.8rem] border border-white/12 bg-white/10 p-7 backdrop-blur-xl"
      >
        <h2 className="mb-6 text-xl font-bold text-white">Career Timeline</h2>
        <div ref={sectionRef}>
          {timelineEvents.map((ev, i) => (
            <TimelineNode key={ev.year} year={ev.year} event={ev.event} index={i} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

