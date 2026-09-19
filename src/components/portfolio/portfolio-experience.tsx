"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { FloatingCommandNav } from "@/components/portfolio/floating-command-nav";
import { HeroHologram } from "@/components/portfolio/hero-hologram";
import { MagneticButton } from "@/components/portfolio/magnetic-button";
import { portfolioData } from "@/data/portfolio-data";
import { usePortfolioStore } from "@/store/portfolio-store";

const navItems = [
  { id: "home", label: "HOME" },
  { id: "about", label: "ABOUT" },
  { id: "experience", label: "JOURNEY" },
  { id: "skills", label: "SKILLS" },
  { id: "projects", label: "PROJECTS" },
  { id: "education", label: "EDU" },
  { id: "achievements", label: "WINS" },
  { id: "contact", label: "CONTACT" },
];

const sectionClass =
  "mx-auto w-[min(1100px,92vw)] rounded-[2rem] border border-white/12 bg-white/5 p-6 shadow-[0_20px_80px_rgba(0,229,255,0.08)] backdrop-blur-xl sm:p-10";

export function PortfolioExperience() {
  const setActiveSection = usePortfolioStore((state) => state.setActiveSection);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => Boolean(node));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.45,
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [setActiveSection]);

  return (
    <div ref={containerRef} className="relative pb-32">
      <FloatingCommandNav items={navItems} />

      <section id="home" className="relative mx-auto w-[min(1200px,94vw)] pt-10 sm:pt-20">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <motion.div
            className="reveal-card rounded-[2rem] border border-cyan-300/20 bg-white/10 p-7 backdrop-blur-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs uppercase tracking-[0.5em] text-cyan-200/90">Welcome to My Digital Universe</p>
            <h1 className="mt-4 text-4xl font-black leading-tight text-white sm:text-6xl">
              {portfolioData.profile.name}
            </h1>
            <p className="mt-4 text-lg text-cyan-50/90">{portfolioData.profile.title}</p>
            <p className="mt-2 text-sm text-cyan-100/70">
              {portfolioData.profile.location} | {portfolioData.profile.currentRole}
            </p>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-cyan-100/85">
              {portfolioData.profile.summary}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <MagneticButton onClick={() => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })}>
                EXPLORE JOURNEY
              </MagneticButton>
              <MagneticButton onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
                VIEW EXPERIENCE
              </MagneticButton>
              <MagneticButton onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
                CONTACT ME
              </MagneticButton>
            </div>
          </motion.div>
          <motion.div className="reveal-card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.1 }}>
            <HeroHologram />
          </motion.div>
        </div>
      </section>

      <section id="about" className="pt-14 sm:pt-24">
        <div className={sectionClass}>
          <h2 className="text-2xl font-bold text-white sm:text-4xl">About | Story Engine</h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-cyan-100/80">
            I blend quality engineering discipline with product strategy to build reliable, high-impact digital systems. My journey is centered on shipping faster without sacrificing confidence.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {portfolioData.philosophy.map((item) => (
              <article key={item} className="reveal-card rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-cyan-50/90">
                {item}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="pt-14 sm:pt-24">
        <div className={sectionClass}>
          <h2 className="text-2xl font-bold text-white sm:text-4xl">Experience | Career Galaxy</h2>
          <div className="mt-8 space-y-5">
            {portfolioData.experience.map((item) => (
              <article key={`${item.company}-${item.role}`} className="reveal-card relative overflow-hidden rounded-2xl border border-cyan-200/20 bg-black/35 p-5">
                <span className="absolute right-4 top-4 rounded-full bg-fuchsia-500/20 px-3 py-1 text-xs tracking-[0.2em] text-fuchsia-100">
                  {item.period}
                </span>
                <h3 className="text-xl font-semibold text-white">{item.role}</h3>
                <p className="text-sm text-cyan-100/70">{item.company}</p>
                <p className="mt-3 text-sm text-cyan-50/90">{item.impact}</p>
                <ul className="mt-4 grid gap-2 text-sm text-cyan-100/80">
                  {item.highlights.map((highlight) => (
                    <li key={highlight} className="rounded-lg border border-white/10 bg-white/10 px-3 py-2">
                      {highlight}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="pt-14 sm:pt-24">
        <div className={sectionClass}>
          <h2 className="text-2xl font-bold text-white sm:text-4xl">Skills | Neural Constellation</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {portfolioData.skillClusters.map((cluster) => (
              <article key={cluster.domain} className="reveal-card rounded-2xl border border-cyan-100/20 bg-black/35 p-4">
                <h3 className="text-sm font-semibold tracking-[0.2em] text-cyan-100">{cluster.domain}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {cluster.skills.map((skill) => (
                    <span key={skill} className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-cyan-50">
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="pt-14 sm:pt-24">
        <div className={sectionClass}>
          <h2 className="text-2xl font-bold text-white sm:text-4xl">Projects | Premium Case Studies</h2>
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {portfolioData.projects.map((project) => (
              <article key={project.name} className="reveal-card overflow-hidden rounded-2xl border border-white/15 bg-black/35">
                <div className="relative h-52">
                  <Image src={project.image} alt={project.name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-white">{project.name}</h3>
                  <p className="mt-2 text-sm text-cyan-100/85">Problem: {project.problem}</p>
                  <p className="mt-2 text-sm text-cyan-100/85">Solution: {project.solution}</p>
                  <p className="mt-2 text-sm text-cyan-100/85">Impact: {project.impact}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tools.map((tool) => (
                      <span key={tool} className="rounded-full bg-cyan-300/14 px-3 py-1 text-xs text-cyan-100">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="education" className="pt-14 sm:pt-24">
        <div className={sectionClass}>
          <h2 className="text-2xl font-bold text-white sm:text-4xl">Education | Knowledge Universe</h2>
          <div className="mt-8 grid gap-4">
            {portfolioData.education.map((item) => (
              <article key={item.institution} className="reveal-card rounded-2xl border border-fuchsia-300/20 bg-black/35 p-5">
                <h3 className="text-lg font-semibold text-white">{item.degree}</h3>
                <p className="text-sm text-cyan-100/75">{item.institution} | {item.period}</p>
                <ul className="mt-3 grid gap-2 text-sm text-cyan-50/90">
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="achievements" className="pt-14 sm:pt-24">
        <div className={sectionClass}>
          <h2 className="text-2xl font-bold text-white sm:text-4xl">Achievements | Trophy Hall</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {portfolioData.achievements.map((achievement) => (
              <article key={achievement} className="reveal-card rounded-2xl border border-cyan-200/20 bg-gradient-to-b from-white/10 to-white/2 p-5">
                <p className="text-sm text-cyan-50/90">{achievement}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {portfolioData.kpis.map((kpi) => (
              <article key={kpi.label} className="reveal-card rounded-2xl border border-white/12 bg-black/35 p-4 text-center">
                <p className="text-3xl font-black text-cyan-200">{kpi.value}</p>
                <p className="mt-2 text-xs tracking-[0.18em] text-cyan-100/80">{kpi.label}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="pt-14 sm:pt-24">
        <div className={sectionClass}>
          <h2 className="text-2xl font-bold text-white sm:text-4xl">Contact | Communication Center</h2>
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <article className="reveal-card rounded-2xl border border-white/12 bg-black/30 p-5">
              <p className="text-sm text-cyan-100/75">Email</p>
              <a href={`mailto:${portfolioData.profile.email}`} className="mt-1 block text-lg text-white">
                {portfolioData.profile.email}
              </a>
              <p className="mt-4 text-sm text-cyan-100/75">Phone</p>
              <p className="mt-1 text-lg text-white">{portfolioData.profile.phone}</p>
              <p className="mt-4 text-sm text-cyan-100/75">LinkedIn</p>
              <a href={portfolioData.profile.linkedin} target="_blank" rel="noreferrer" className="mt-1 block text-lg text-cyan-200">
                Open Profile
              </a>
            </article>
            <article className="reveal-card rounded-2xl border border-white/12 bg-black/30 p-5">
              <p className="text-sm text-cyan-100/80">Message Command</p>
              <form className="mt-4 grid gap-3">
                <input className="rounded-xl border border-white/20 bg-white/10 p-3 text-sm text-white outline-none" placeholder="Your Name" />
                <input className="rounded-xl border border-white/20 bg-white/10 p-3 text-sm text-white outline-none" placeholder="Your Email" />
                <textarea className="min-h-28 rounded-xl border border-white/20 bg-white/10 p-3 text-sm text-white outline-none" placeholder="Your Message" />
                <MagneticButton className="w-fit">SEND SIGNAL</MagneticButton>
              </form>
            </article>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 w-[min(1200px,94vw)] pb-12 text-center text-xs tracking-[0.18em] text-cyan-100/60">
        BUILT AS AN IMMERSIVE PRODUCT EXPERIENCE | NEXT.JS + THREE.JS + FRAMER MOTION + GSAP
      </section>
    </div>
  );
}
