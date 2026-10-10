"use client";

import dynamic from "next/dynamic";
import { startTransition, useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { isLowPerformanceDevice } from "@/lib/performance";

const VoidScene = dynamic(() => import("@/components/portfolio/void-scene"), { ssr: false });

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(listener: () => void) {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener("change", listener);
  return () => query.removeEventListener("change", listener);
}

function useReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false,
  );
}

/**
 * Global 3D backdrop. It is portalled to <html> so it sits outside the zoomed <body>
 * and always matches the real viewport.
 */
export function VoidBackground() {
  const [host, setHost] = useState<HTMLElement | null>(null);
  const [lite, setLite] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const node = document.createElement("div");
    node.dataset.voidBackgroundRoot = "";
    document.documentElement.appendChild(node);
    startTransition(() => {
      setLite(isLowPerformanceDevice());
      setHost(node);
    });

    return () => node.remove();
  }, []);

  if (!host) return null;

  return createPortal(
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 select-none bg-[#0a0a0a]"
    >
      <VoidScene lite={lite} reducedMotion={reducedMotion} />
    </div>,
    host,
  );
}
