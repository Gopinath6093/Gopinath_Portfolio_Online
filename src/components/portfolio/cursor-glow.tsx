"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export function CursorGlow() {
  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);
  const x = useSpring(rawX, { stiffness: 90, damping: 22 });
  const y = useSpring(rawY, { stiffness: 90, damping: 22 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      rawX.set(e.clientX - 150);
      rawY.set(e.clientY - 150);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [rawX, rawY]);

  return (
    <motion.div
      className="pointer-events-none fixed z-0 h-[300px] w-[300px] rounded-full bg-cyan-400/8 blur-[80px]"
      style={{ x, y }}
    />
  );
}
