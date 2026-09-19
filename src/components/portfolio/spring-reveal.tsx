"use client";

import { motion, type Transition, type Variants } from "framer-motion";
import type { ReactNode } from "react";

export const springTransition: Transition = {
  type: "spring",
  stiffness: 190,
  damping: 20,
  mass: 0.9,
};

/** Cards reveal once and stay visible, with a low threshold so fast scrolling still triggers them. */
export const springViewport = {
  once: true,
  amount: 0.05,
  margin: "0px 0px -5% 0px",
} as const;

export const springSectionVariants: Variants = {
  initial: { opacity: 0, y: 120, scale: 0.9, rotateX: 10 },
  animate: { opacity: 1, y: 0, scale: 1, rotateX: 0, transition: springTransition },
};

export const springCardVariants: Variants = {
  initial: { opacity: 0, y: 60, scale: 0.86, rotateX: 12 },
  animate: { opacity: 1, y: 0, scale: 1, rotateX: 0, transition: springTransition },
};

/** Card wrapper that springs into place each time it scrolls into view. */
export function SpringCard({
  children,
  index = 0,
  className,
}: {
  children: ReactNode;
  index?: number;
  className?: string;
}) {
  return (
    <motion.div
      variants={springCardVariants}
      initial="initial"
      whileInView="animate"
      viewport={springViewport}
      transition={{ ...springTransition, delay: index * 0.08 }}
      style={{ perspective: 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
