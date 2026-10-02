"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { springSectionVariants, useScrollDirection } from "@/components/portfolio/spring-reveal";
import { AchievementsSection } from "@/components/portfolio/sections/achievements-section";
import { AboutSection } from "@/components/portfolio/sections/about-section";
import { ContactSection } from "@/components/portfolio/sections/contact-section";
import { EducationSection } from "@/components/portfolio/sections/education-section";
import { ExperienceSection } from "@/components/portfolio/sections/experience-section";
import { HomeSection } from "@/components/portfolio/sections/home-section";
import { ProjectsSection } from "@/components/portfolio/sections/projects-section";
import { SkillsSection } from "@/components/portfolio/sections/skills-section";
import { usePortfolioStore } from "@/store/portfolio-store";

const sections = [
  { id: "home", component: HomeSection },
  { id: "about", component: AboutSection },
  { id: "experience", component: ExperienceSection },
  { id: "skills", component: SkillsSection },
  { id: "projects", component: ProjectsSection },
  { id: "education", component: EducationSection },
  { id: "achievements", component: AchievementsSection },
  { id: "contact", component: ContactSection },
] as const;

export function SinglePagePortfolio() {
  const setActiveSection = usePortfolioStore((state) => state.setActiveSection);
  const scrollDirection = useScrollDirection();

  useEffect(() => {
    const sectionNodes = sections
      .map(({ id }) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node));

    let rafId = 0;

    const updateActiveSection = () => {
      const viewportAnchor = window.innerHeight * 0.42;
      const activeNode = sectionNodes.find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= viewportAnchor && rect.bottom > viewportAnchor;
      });

      if (activeNode) {
        setActiveSection(activeNode.id);
        return;
      }

      const nearestNode = sectionNodes
        .map((section) => ({
          section,
          distance: Math.abs(section.getBoundingClientRect().top - viewportAnchor),
        }))
        .sort((a, b) => a.distance - b.distance)[0]?.section;

      if (nearestNode) {
        setActiveSection(nearestNode.id);
      }
    };

    const requestActiveSectionUpdate = () => {
      window.cancelAnimationFrame(rafId);
      rafId = window.requestAnimationFrame(updateActiveSection);
    };

    const hash = window.location.hash.replace("#", "");
    if (hash) {
      window.requestAnimationFrame(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }

    requestActiveSectionUpdate();
    window.addEventListener("scroll", requestActiveSectionUpdate, { passive: true });
    window.addEventListener("resize", requestActiveSectionUpdate);
    window.addEventListener("hashchange", requestActiveSectionUpdate);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", requestActiveSectionUpdate);
      window.removeEventListener("resize", requestActiveSectionUpdate);
      window.removeEventListener("hashchange", requestActiveSectionUpdate);
    };
  }, [setActiveSection]);

  return (
    <main className="relative pb-32">
      <div className="pointer-events-none fixed inset-x-0 top-0 z-20 h-28 bg-gradient-to-b from-[#03040b] via-[#03040b]/78 to-transparent" />
      {sections.map(({ id, component: Component }, index) => (
        <motion.section
          key={id}
          id={id}
          variants={springSectionVariants}
          custom={scrollDirection}
          initial="initial"
          animate={scrollDirection === "up" ? "initialUp" : "initialDown"}
          whileInView="animate"
          viewport={{ once: false, amount: 0.02 }}
          style={{ perspective: 1200, transformStyle: "preserve-3d" }}
          className="relative min-h-screen scroll-mt-24 px-0 py-14 sm:py-20"
        >
          <div className="pointer-events-none absolute left-1/2 top-0 h-px w-[min(1100px,92vw)] -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-300/25 to-transparent" />
          <div className="pointer-events-none absolute right-[4vw] top-20 hidden font-mono text-[10px] tracking-[0.5em] text-cyan-100/15 lg:block">
            {String(index + 1).padStart(2, "0")}/{String(sections.length).padStart(2, "0")}
          </div>
          <Component />
        </motion.section>
      ))}
    </main>
  );
}
