"use client";

import { motion, type Transition, type Variants } from "framer-motion";
import { useSyncExternalStore, type ReactNode } from "react";

export type ScrollDirection = "up" | "down";

let scrollDirection: ScrollDirection = "down";
const directionListeners = new Set<() => void>();

export function setScrollDirection(direction: ScrollDirection) {
  if (scrollDirection === direction) return;
  scrollDirection = direction;
  directionListeners.forEach((listener) => listener());
}

function subscribeToScrollDirection(listener: () => void) {
  directionListeners.add(listener);
  return () => directionListeners.delete(listener);
}

function getScrollDirection() {
  return scrollDirection;
}

export function useScrollDirection() {
  return useSyncExternalStore(
    subscribeToScrollDirection,
    getScrollDirection,
    () => "down",
  );
}

export const springTransition: Transition = {
  type: "tween",
  duration: 1.15,
  ease: [0.16, 1, 0.3, 1],
};

/** A low threshold keeps reveals responsive during fast scrolling; leaving view resets them. */
export const springViewport = {
  once: false,
  amount: 0.01,
} as const;

const sectionInitial = (direction: ScrollDirection) => ({
  opacity: 0,
  y: direction === "up" ? -90 : 90,
  scale: 0.96,
  rotateX: direction === "up" ? -6 : 6,
});

export const springSectionVariants: Variants = {
  initial: (direction: ScrollDirection = "down") => sectionInitial(direction),
  initialUp: { ...sectionInitial("up"), transition: { duration: 0 } },
  initialDown: { ...sectionInitial("down"), transition: { duration: 0 } },
  animate: { opacity: 1, x: 0, y: 0, scale: 1, rotateX: 0, rotateY: 0, transition: springTransition },
};

const cardInitial = (direction: ScrollDirection) => ({
  opacity: 0,
  x: direction === "up" ? 64 : -64,
  y: 20,
  scale: 0.96,
  rotateY: direction === "up" ? -6 : 6,
});

export const springCardVariants: Variants = {
  initial: (direction: ScrollDirection = "down") => cardInitial(direction),
  initialUp: { ...cardInitial("up"), transition: { duration: 0 } },
  initialDown: { ...cardInitial("down"), transition: { duration: 0 } },
  animate: { opacity: 1, x: 0, y: 0, scale: 1, rotateX: 0, rotateY: 0, transition: springTransition },
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
  const direction = useScrollDirection();

  return (
    <motion.div
      variants={springCardVariants}
      custom={direction}
      initial="initial"
      animate={direction === "up" ? "initialUp" : "initialDown"}
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
