"use client";

import { AnimatePresence, motion } from "framer-motion";
import Lenis from "lenis";
import { useEffect } from "react";
import { PortfolioExperience } from "@/components/portfolio/portfolio-experience";
import { usePortfolioStore } from "@/store/portfolio-store";

export function PortfolioShell() {
  const booting = usePortfolioStore((state) => state.booting);
  const setBooting = usePortfolioStore((state) => state.setBooting);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      syncTouch: true,
      touchMultiplier: 1.2,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    const timer = window.setTimeout(() => setBooting(false), 2200);

    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [setBooting]);

  return (
    <>
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 -top-20 h-[34rem] w-[34rem] rounded-full bg-cyan-500/20 blur-[140px]" />
        <div className="absolute right-0 top-1/3 h-[28rem] w-[28rem] rounded-full bg-fuchsia-500/18 blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,229,255,0.12),transparent_30%),radial-gradient(circle_at_80%_40%,rgba(255,77,157,0.1),transparent_30%),linear-gradient(160deg,#03030A,#070B18_40%,#020204)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />
      </div>

      <AnimatePresence>
        {booting ? (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.7 } }}
          >
            <motion.p
              className="text-xs tracking-[0.6em] text-cyan-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              WELCOME TO MY DIGITAL UNIVERSE
            </motion.p>
            <motion.div
              className="mt-6 h-1 w-72 overflow-hidden rounded-full bg-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-400 to-fuchsia-500"
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <PortfolioExperience />
    </>
  );
}
