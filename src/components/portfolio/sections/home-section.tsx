"use client";

import { motion } from "framer-motion";
import { HeroHologram } from "@/components/portfolio/hero-hologram";
import { MagneticButton } from "@/components/portfolio/magnetic-button";
import { portfolioData } from "@/data/portfolio-data";

const stagger = {
  animate: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const fadeUp = {
  initial: { opacity: 0, y: 26 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

export function HomeSection() {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative mx-auto w-[min(1280px,94vw)] flex-1 pt-16 sm:pt-20">
      <div className="grid gap-8 lg:grid-cols-[1.22fr_0.78fr] lg:items-center xl:grid-cols-[1.28fr_0.72fr]">
        {/* Text side */}
        <motion.div
          variants={stagger}
          initial="initial"
          animate="animate"
          className="min-h-[520px] rounded-[2.25rem] border border-cyan-300/20 bg-white/10 p-8 shadow-[0_30px_100px_rgba(0,229,255,0.1)] backdrop-blur-xl sm:p-10 lg:min-h-[580px]"
        >
          <motion.p
            variants={fadeUp}
            className="text-[11px] uppercase tracking-[0.55em] text-cyan-200/80"
          >
            Quality Engineer · Product Thinker · Digital Craftsman
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mt-4 bg-gradient-to-br from-white via-cyan-100 to-white/60 bg-clip-text text-5xl font-black leading-[1.08] tracking-tight text-transparent sm:text-7xl"
          >
            {portfolioData.profile.name}
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-5 text-lg font-medium text-cyan-50/90">
            {portfolioData.profile.title}
          </motion.p>

          <motion.p variants={fadeUp} className="mt-2 text-sm text-cyan-100/65">
            {portfolioData.profile.location} · {portfolioData.profile.currentRole}
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-sm leading-relaxed text-cyan-100/80"
          >
            {portfolioData.profile.summary}
          </motion.p>

          {/* KPI strip */}
          <motion.div
            variants={fadeUp}
            className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {portfolioData.kpis.map((kpi) => (
              <div
                key={kpi.label}
                className="rounded-xl border border-white/12 bg-black/30 p-3 text-center"
              >
                <p className="text-2xl font-black text-cyan-200">{kpi.value}</p>
                <p className="mt-1 text-[9px] tracking-[0.2em] text-cyan-100/70">{kpi.label}</p>
              </div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
            <MagneticButton onClick={() => scrollToSection("experience")}>
              EXPLORE JOURNEY
            </MagneticButton>
            <MagneticButton onClick={() => scrollToSection("projects")}>
              VIEW PROJECTS
            </MagneticButton>
            <MagneticButton onClick={() => scrollToSection("contact")}>
              CONTACT ME
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Hologram side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <HeroHologram />
        </motion.div>
      </div>
    </section>
  );
}
