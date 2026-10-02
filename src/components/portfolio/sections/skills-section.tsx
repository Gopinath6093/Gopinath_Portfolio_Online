"use client";

import { motion } from "framer-motion";
import { springCardVariants, springTransition, springViewport, useScrollDirection } from "@/components/portfolio/spring-reveal";
import { portfolioData } from "@/data/portfolio-data";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const container = {
  animate: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};

const item = {
  initial: { opacity: 0, scale: 0.9, filter: "blur(6px)" },
  animate: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.5, ease } },
};

const domainColors: Record<string, string> = {
  Testing: "from-cyan-400/20 to-cyan-400/5",
  Automation: "from-fuchsia-400/20 to-fuchsia-400/5",
  "Quality Assurance": "from-purple-400/20 to-purple-400/5",
  Agile: "from-blue-400/20 to-blue-400/5",
  "Product Thinking": "from-pink-400/20 to-pink-400/5",
  Leadership: "from-amber-400/20 to-amber-400/5",
  "Technical Tools": "from-green-400/20 to-green-400/5",
};

const domainBorder: Record<string, string> = {
  Testing: "border-cyan-300/25",
  Automation: "border-fuchsia-300/25",
  "Quality Assurance": "border-purple-300/25",
  Agile: "border-blue-300/25",
  "Product Thinking": "border-pink-300/25",
  Leadership: "border-amber-300/25",
  "Technical Tools": "border-green-300/25",
};

function SkillCluster({
  cluster,
  index,
}: {
  cluster: (typeof portfolioData.skillClusters)[0];
  index: number;
}) {
  const scrollDirection = useScrollDirection();
  const gradient = domainColors[cluster.domain] ?? "from-white/10 to-white/2";
  const border = domainBorder[cluster.domain] ?? "border-white/15";

  return (
    <motion.article
      variants={springCardVariants}
      custom={scrollDirection}
      initial="initial"
      animate={scrollDirection === "up" ? "initialUp" : "initialDown"}
      whileInView="animate"
      viewport={springViewport}
      transition={{ ...springTransition, delay: index * 0.06 }}
      whileHover={{ y: -4, scale: 1.02 }}
      style={{ perspective: 1000 }}
      className={`rounded-[1.6rem] border bg-gradient-to-b p-5 backdrop-blur-xl ${gradient} ${border}`}
    >
      <h3 className="text-[11px] font-bold tracking-[0.28em] text-cyan-100/90 uppercase">
        {cluster.domain}
      </h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {cluster.skills.map((skill) => (
          <motion.span
            key={skill}
            whileHover={{ scale: 1.08 }}
            className="cursor-default rounded-full border border-white/15 bg-black/40 px-3 py-1 text-xs text-cyan-50/90 transition-colors hover:border-cyan-400/40 hover:text-white"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.article>
  );
}

export function SkillsSection() {
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
          03 · Skills
        </motion.p>
        <motion.h1
          variants={item}
          className="mt-2 bg-gradient-to-r from-white to-white/50 bg-clip-text text-4xl font-black tracking-tight text-transparent sm:text-5xl"
        >
          Neural Constellation
        </motion.h1>
        <motion.p variants={item} className="mt-3 max-w-xl text-sm text-cyan-100/75">
          Eight domains of expertise — each node connected to a larger system of quality and impact.
        </motion.p>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {portfolioData.skillClusters.map((cluster, i) => (
          <SkillCluster key={cluster.domain} cluster={cluster} index={i} />
        ))}

        {/* Central connector card */}
        <motion.div
          variants={springCardVariants}
          custom={scrollDirection}
          initial="initial"
          animate={scrollDirection === "up" ? "initialUp" : "initialDown"}
          whileInView="animate"
          viewport={springViewport}
          className="col-span-full rounded-[1.6rem] border border-white/12 bg-gradient-to-r from-cyan-400/10 via-fuchsia-400/10 to-cyan-400/10 p-6 text-center backdrop-blur-xl"
        >
          <p className="text-sm text-cyan-50/90">
            All domains converge to deliver one outcome:{" "}
            <span className="font-bold text-white">confident, high-quality product releases.</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

