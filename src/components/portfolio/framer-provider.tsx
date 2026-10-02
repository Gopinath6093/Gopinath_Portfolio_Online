"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { pageMeta } from "@/lib/transitions";

/**
 * Wraps each page in a keyed motion.div so AnimatePresence can play
 * per-route enter + exit animations on every client navigation.
 */
export function FramerProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const meta = pageMeta[pathname] ?? pageMeta["/"];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={meta.variants.initial}
        animate={meta.variants.animate}
        exit={meta.variants.exit}
        style={{ perspective: "1200px" }}
        className="flex min-h-screen flex-col pb-28 pt-8"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
