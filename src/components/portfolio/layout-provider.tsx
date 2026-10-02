"use client";

import { AnimatePresence, motion } from "framer-motion";
import Lenis from "lenis";
import { Bot, Braces, Bug, Cloud, Code2, Cpu, Database, GitBranch, Server, ShieldCheck, SquareTerminal, Workflow } from "lucide-react";
import { usePathname } from "next/navigation";
import { type ComponentType, useEffect } from "react";
import { CursorGlow } from "@/components/portfolio/cursor-glow";
import { setScrollDirection } from "@/components/portfolio/spring-reveal";
import { pageMeta, navRoutes } from "@/lib/transitions";
import { usePortfolioStore } from "@/store/portfolio-store";

function FloatingNav() {
  const pathname = usePathname();
  const activeSection = usePortfolioStore((s) => s.activeSection);
  const setActiveSection = usePortfolioStore((s) => s.setActiveSection);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);

    if (pathname !== "/") {
      window.location.assign(sectionId === "home" ? "/" : `/#${sectionId}`);
      return;
    }

    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: "smooth", block: "start" });

    if (sectionId === "home") {
      window.history.replaceState(null, "", "/");
    } else {
      window.history.replaceState(null, "", `#${sectionId}`);
    }
  };

  return (
    <nav className="fixed bottom-4 left-1/2 z-50 w-[min(96vw,1040px)] -translate-x-1/2 rounded-full border border-white/15 bg-black/60 p-[6px] shadow-[0_18px_70px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
      <ul className="grid grid-cols-4 gap-1 sm:grid-cols-8">
        {navRoutes.map(({ id, label }) => {
          const active = activeSection === id;
          return (
            <li key={id} className="min-w-0">
              <button
                type="button"
                onClick={() => scrollToSection(id)}
                aria-current={active ? "true" : undefined}
                className="relative flex w-full items-center justify-center overflow-hidden whitespace-nowrap rounded-full px-1 py-[8px] text-center text-[9px] font-semibold tracking-[0.08em] text-cyan-100/90 transition-colors hover:text-white sm:text-[10px] lg:text-[11px]"
              >
                {active ? (
                  <motion.span
                    layoutId="active-orb"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-300/35 via-white/10 to-fuchsia-400/35 shadow-[0_0_22px_rgba(0,229,255,0.28)]"
                    transition={{ type: "spring", stiffness: 420, damping: 34, mass: 0.7 }}
                  />
                ) : null}
                <span className="relative z-10">{label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function SceneGlow() {
  const pathname = usePathname();
  const activeSection = usePortfolioStore((s) => s.activeSection);
  const sectionPath = activeSection === "home" ? "/" : `/${activeSection}`;
  const meta = pageMeta[pathname === "/" ? sectionPath : pathname] ?? pageMeta["/"];
  const floatingIcons: Array<{
    icon: ComponentType<{ className?: string; strokeWidth?: number }>;
    left?: string;
    right?: string;
    top?: string;
    bottom?: string;
    size: string;
  }> = [
    { icon: Code2, left: "3vw", top: "16vh", size: "h-9 w-9" },
    { icon: Database, left: "12vw", top: "28vh", size: "h-8 w-8" },
    { icon: GitBranch, left: "5vw", top: "43vh", size: "h-8 w-8" },
    { icon: SquareTerminal, left: "14vw", top: "58vh", size: "h-10 w-10" },
    { icon: Workflow, left: "4vw", bottom: "17vh", size: "h-9 w-9" },
    { icon: ShieldCheck, left: "15vw", bottom: "7vh", size: "h-8 w-8" },
    { icon: Braces, left: "8vw", bottom: "34vh", size: "h-10 w-10" },
    { icon: Bug, left: "16vw", top: "10vh", size: "h-8 w-8" },
    { icon: Bot, right: "5vw", top: "11vh", size: "h-10 w-10" },
    { icon: Cpu, right: "14vw", top: "22vh", size: "h-8 w-8" },
    { icon: Cloud, right: "4vw", top: "38vh", size: "h-9 w-9" },
    { icon: Server, right: "15vw", top: "54vh", size: "h-9 w-9" },
    { icon: Bug, right: "3vw", bottom: "30vh", size: "h-8 w-8" },
    { icon: Braces, right: "13vw", bottom: "18vh", size: "h-10 w-10" },
    { icon: Database, right: "6vw", bottom: "7vh", size: "h-8 w-8" },
    { icon: Workflow, right: "16vw", bottom: "42vh", size: "h-9 w-9" },
  ];

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(0,229,255,0.14),transparent_24%),radial-gradient(circle_at_82%_18%,rgba(255,77,157,0.12),transparent_22%),radial-gradient(circle_at_78%_78%,rgba(110,68,255,0.16),transparent_28%)]" />
      <motion.div
        className="absolute -left-40 -top-20 h-[34rem] w-[34rem] rounded-full blur-[140px]"
        animate={{ background: meta.glowPrimary }}
        transition={{ duration: 1.4, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-0 top-1/3 h-[28rem] w-[28rem] rounded-full blur-[120px]"
        animate={{ background: meta.glowSecondary }}
        transition={{ duration: 1.4, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(160deg,#03030A,#070B18_40%,#020204)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />
      {floatingIcons.map(({ icon: Icon, size, ...position }, index) => (
        <motion.div
          key={`${position.left ?? position.right}-${position.top ?? position.bottom}`}
          className="absolute hidden rounded-2xl border border-cyan-100/10 bg-cyan-100/[0.025] p-4 text-cyan-100/24 shadow-[0_18px_60px_rgba(0,229,255,0.06)] backdrop-blur-sm md:block"
          style={position}
          animate={{ y: [-12, 14, -12], x: [0, index % 2 === 0 ? 8 : -8, 0], rotate: [-2, 2, -2], opacity: [0.2, 0.36, 0.2] }}
          transition={{ duration: 6 + index * 0.6, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        >
          <Icon className={size} strokeWidth={1.35} />
        </motion.div>
      ))}
    </div>
  );
}

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const booting = usePortfolioStore((s) => s.booting);
  const setBooting = usePortfolioStore((s) => s.setBooting);
  useEffect(() => {
    let directionAnchor = window.scrollY;

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const distance = scrollY - directionAnchor;
      if (Math.abs(distance) < 6) return;

      setScrollDirection(distance > 0 ? "down" : "up");
      directionAnchor = scrollY;
    };

    window.addEventListener("scroll", updateScrollDirection, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollDirection);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.4,
      lerp: 0.1,
      anchors: true,
      autoRaf: true,
      autoToggle: true,
      respectReducedMotion: true,
    });
    const timer = window.setTimeout(() => setBooting(false), 2400);
    return () => {
      clearTimeout(timer);
      lenis.destroy();
    };
  }, [setBooting]);

  return (
    <>
      <SceneGlow />
      <CursorGlow />

      <AnimatePresence>
        {booting ? (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black"
              layoutId="loader-universe-title"
            exit={{ opacity: 0, transition: { duration: 0.65 } }}
          >
            <motion.p
              className="text-xs tracking-[0.65em] text-cyan-300"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              WELCOME TO MY DIGITAL UNIVERSE
            </motion.p>
            <motion.p
              className="mt-3 text-[10px] tracking-[0.4em] text-cyan-100/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              GOPINATH S · PORTFOLIO
            </motion.p>
            <motion.div
              className="mt-8 h-px w-72 overflow-hidden rounded-full bg-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-400 to-fuchsia-500"
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 2.0, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {!booting ? (
          <motion.div
            layoutId="loader-universe-title"
            className="fixed left-1/2 top-4 z-40 -translate-x-1/2 rounded-full border border-cyan-200/15 bg-black/45 px-5 py-2 text-center text-[10px] font-semibold tracking-[0.38em] text-cyan-200/75 shadow-[0_12px_50px_rgba(0,229,255,0.12)] backdrop-blur-xl sm:text-xs"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            WELCOME TO MY DIGITAL UNIVERSE
          </motion.div>
        ) : null}
      </AnimatePresence>

      <FloatingNav />
      {children}
    </>
  );
}
