"use client";

import { animate, motion, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { springCardVariants, springTransition, springViewport, useScrollDirection } from "@/components/portfolio/spring-reveal";
import { portfolioData } from "@/data/portfolio-data";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const container = {
  animate: { transition: { staggerChildren: 0.1, delayChildren: 0.06 } },
};

const item = {
  initial: { opacity: 0, y: 26 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
};

function AnimatedCounter({ value }: { value: string }) {
  const numericStr = value.replace(/[^\d.]/g, "");
  const suffix = value.replace(/[\d.]/g, "").trim();
  const numeric = parseFloat(numericStr) || 0;
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const controls = animate(0, numeric, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate: (latest) => {
        if (ref.current) {
          ref.current.textContent = `${Math.round(latest)}${suffix}`;
        }
      },
    });
    return () => controls.stop();
  }, [inView, numeric, suffix]);

  return (
    <span ref={ref}>
      0{suffix}
    </span>
  );
}

export function AchievementsSection() {
  const scrollDirection = useScrollDirection();

  return (
    <div className="mx-auto w-[min(1100px,92vw)]">
      <motion.div
        variants={container}
        initial="initial"
        animate="animate"
        className="mb-10"
      >
        <motion.p variants={item} className="text-[11px] uppercase tracking-[0.5em] text-cyan-300/80">
          06 · Achievements
        </motion.p>
        <motion.h1
          variants={item}
          className="mt-2 bg-gradient-to-r from-white to-white/50 bg-clip-text text-4xl font-black tracking-tight text-transparent sm:text-5xl"
        >
          Trophy Hall
        </motion.h1>
        <motion.p variants={item} className="mt-3 max-w-xl text-sm text-cyan-100/75">
          Recognition earned through measurable impact, consistent delivery, and leadership that multiplies.
        </motion.p>
      </motion.div>

      {/* KPI dashboard */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {portfolioData.kpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            variants={springCardVariants}
            custom={scrollDirection}
            initial="initial"
            animate={scrollDirection === "up" ? "initialUp" : "initialDown"}
            whileInView="animate"
            viewport={springViewport}
            transition={{ ...springTransition, delay: i * 0.08 }}
            whileHover={{ y: -5, boxShadow: "0 20px 60px rgba(255,200,50,0.12)" }}
            style={{ perspective: 1000 }}
            className="rounded-[1.6rem] border border-amber-200/20 bg-gradient-to-b from-amber-400/12 to-black/20 p-5 text-center backdrop-blur-xl"
          >
            <p className="text-4xl font-black text-amber-200">
              <AnimatedCounter value={kpi.value} />
            </p>
            <p className="mt-2 text-[10px] tracking-[0.22em] text-cyan-100/75">{kpi.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Trophy cards */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {portfolioData.achievements.map((achievement, i) => (
          <motion.article
            key={achievement}
            variants={springCardVariants}
            custom={scrollDirection}
            initial="initial"
            animate={scrollDirection === "up" ? "initialUp" : "initialDown"}
            whileInView="animate"
            viewport={springViewport}
            transition={{ ...springTransition, delay: i * 0.08 }}
            whileHover={{ y: -3, boxShadow: "0 14px 40px rgba(255,200,50,0.1)" }}
            style={{ perspective: 1000 }}
            className="flex items-center gap-4 rounded-2xl border border-amber-200/20 bg-gradient-to-r from-amber-400/10 to-black/20 p-5 backdrop-blur-xl"
          >
            <motion.span
              animate={{ rotate: [0, 8, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
              className="flex-none text-2xl"
            >
              🏆
            </motion.span>
            <p className="text-sm text-cyan-50/90">{achievement}</p>
          </motion.article>
        ))}
      </div>

      {/* Testimonials */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {portfolioData.testimonials.map((t, i) => (
          <motion.article
            key={t.author}
            variants={springCardVariants}
            custom={scrollDirection}
            initial="initial"
            animate={scrollDirection === "up" ? "initialUp" : "initialDown"}
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

