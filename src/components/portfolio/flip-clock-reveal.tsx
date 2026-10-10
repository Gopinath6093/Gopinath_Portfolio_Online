"use client";

import { motion, useInView, useReducedMotion, type Transition } from "framer-motion";
import { useRef, type ReactNode } from "react";

// Damping ratio ~0.65: a single soft overshoot (~7%) before settling at 0deg.
const hingeSpring: Transition = {
  type: "spring",
  stiffness: 150,
  damping: 15,
  mass: 0.9,
};

type FlipClockRevealProps = {
  children: ReactNode;
  /** Seconds to wait after entering view; use `index * 0.1` for a one-by-one cascade. */
  delay?: number;
  /** Fold in only the first time (default) or every time the item re-enters the viewport. */
  once?: boolean;
  /** Layout classes for the wrapper itself (e.g. `h-full`). Child styling is untouched. */
  className?: string;
};

/**
 * Wrap any existing card to make it fold down like a flip-clock panel:
 * rotateX 90deg -> 0deg, hinged at the top edge, with a springy settle.
 */
export function FlipClockReveal({ children, delay = 0, once = true, className }: FlipClockRevealProps) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  // Observe the untransformed wrapper: a 90deg-rotated element has almost no visible area,
  // so observing the animated node itself would never reach the threshold.
  const inView = useInView(sentinelRef, { once, amount: 0.2, margin: "0px 0px -8% 0px" });
  const reduceMotion = useReducedMotion();
  const foldedAngle = reduceMotion ? 0 : 90;

  return (
    <div ref={sentinelRef} className={className}>
      <motion.div
        initial={false}
        animate={inView ? "open" : "folded"}
        variants={{
          folded: { rotateX: foldedAngle, opacity: 0 },
          open: {
            rotateX: 0,
            opacity: 1,
            transition: {
              rotateX: { ...hingeSpring, delay },
              opacity: { duration: 0.2, delay },
            },
          },
        }}
        style={{
          transformPerspective: 1000,
          transformOrigin: "50% 0%",
          backfaceVisibility: "hidden",
          willChange: "transform, opacity",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
