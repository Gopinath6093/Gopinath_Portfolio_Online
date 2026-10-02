"use client";

import Image from "next/image";
import { motion } from "framer-motion";
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

function ProjectCard({
  project,
  index,
}: {
  project: (typeof portfolioData.projects)[0];
  index: number;
}) {
  const scrollDirection = useScrollDirection();

  return (
    <motion.article
      variants={springCardVariants}
      custom={scrollDirection}
      initial="initial"
      animate={scrollDirection === "up" ? "initialUp" : "initialDown"}
      whileInView="animate"
      viewport={springViewport}
      transition={{ ...springTransition, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      style={{ perspective: 1000 }}
      className="group overflow-hidden rounded-[1.8rem] border border-white/15 bg-black/40 backdrop-blur-xl hover:border-pink-300/30"
    >
      <div className="relative h-52 overflow-hidden">
        <Image
          src={project.image}
          alt={project.name}
          fill
          sizes="(max-width: 1024px) 92vw, 520px"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-white">{project.name}</h3>

        <div className="mt-4 space-y-3">
          {[
            { label: "Problem", text: project.problem },
            { label: "Solution", text: project.solution },
            { label: "Impact", text: project.impact },
          ].map(({ label, text }) => (
            <div key={label}>
              <span className="text-[10px] font-bold tracking-[0.3em] text-cyan-300/80 uppercase">
                {label}
              </span>
              <p className="mt-1 text-sm text-cyan-50/85">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tools.map((tool) => (
            <span
              key={tool}
              className="rounded-full bg-cyan-300/12 px-3 py-1 text-xs text-cyan-100"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export function ProjectsSection() {
  return (
    <div className="mx-auto w-[min(1100px,92vw)]">
      <motion.div
        variants={container}
        initial="initial"
        animate="animate"
        className="mb-10"
      >
        <motion.p variants={item} className="text-[11px] uppercase tracking-[0.5em] text-cyan-300/80">
          04 · Projects
        </motion.p>
        <motion.h1
          variants={item}
          className="mt-2 bg-gradient-to-r from-white to-white/50 bg-clip-text text-4xl font-black tracking-tight text-transparent sm:text-5xl"
        >
          Premium Case Studies
        </motion.h1>
        <motion.p variants={item} className="mt-3 max-w-xl text-sm text-cyan-100/75">
          Each project is a story of a real problem solved with engineering rigour and product clarity.
        </motion.p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2">
        {portfolioData.projects.map((project, i) => (
          <ProjectCard key={project.name} project={project} index={i} />
        ))}
      </div>
    </div>
  );
}

