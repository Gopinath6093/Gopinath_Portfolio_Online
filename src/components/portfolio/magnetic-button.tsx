"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { type ReactNode } from "react";

type MagneticButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
};

export function MagneticButton({
  children,
  onClick,
  className = "",
  type = "button",
}: MagneticButtonProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 180, damping: 14 });
  const springY = useSpring(y, { stiffness: 180, damping: 14 });

  return (
    <motion.button
      type={type}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const offsetX = event.clientX - (rect.left + rect.width / 2);
        const offsetY = event.clientY - (rect.top + rect.height / 2);
        x.set(offsetX * 0.2);
        y.set(offsetY * 0.2);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      style={{ x: springX, y: springY }}
      onClick={onClick}
      className={`rounded-full border border-cyan-300/30 bg-cyan-300/10 px-6 py-3 text-sm font-semibold tracking-[0.2em] text-cyan-100 backdrop-blur-md transition-colors hover:border-cyan-300/60 hover:bg-cyan-300/20 ${className}`}
    >
      {children}
    </motion.button>
  );
}
