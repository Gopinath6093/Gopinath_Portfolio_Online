"use client";

import { AnimatePresence, motion } from "framer-motion";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import { startTransition, useEffect, useRef, useState } from "react";
import { VoidBackground } from "@/components/portfolio/void-background";
import { setScrollDirection } from "@/components/portfolio/spring-reveal";
import { MOBILE_LAYOUT_QUERY, SCROLL_ROOT_ID, getScrollY } from "@/lib/scroll-root";
import { useLowPerformanceDevice } from "@/lib/performance";
import { navRoutes } from "@/lib/transitions";
import { usePortfolioStore } from "@/store/portfolio-store";

function FloatingNav() {
  const pathname = usePathname();
  const activeSection = usePortfolioStore((s) => s.activeSection);
  const setActiveSection = usePortfolioStore((s) => s.setActiveSection);
  const navRef = useRef<HTMLElement>(null);
  const [portalHost, setPortalHost] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const host = document.createElement("div");
    host.dataset.portfolioNavRoot = "";
    document.documentElement.appendChild(host);
    startTransition(() => setPortalHost(host));

    return () => host.remove();
  }, []);

  useEffect(() => {
    const visualViewport = window.visualViewport;
    const mobileViewport = window.matchMedia(MOBILE_LAYOUT_QUERY);
    const isCompactViewport = () => {
      const visibleWidth = visualViewport?.width ?? document.documentElement.clientWidth;
      const visibleHeight = visualViewport?.height ?? window.innerHeight;
      return mobileViewport.matches || visibleWidth < 768 || (visibleWidth <= 1200 && visibleHeight <= 500);
    };
    let previousVisibleWidth = Number.NaN;
    let previousVisibleLeft = Number.NaN;

    const updatePosition = () => {
      const nav = navRef.current;
      if (!nav) return;
      const visibleWidth = visualViewport?.width ?? document.documentElement.clientWidth;
      const visibleLeft = visualViewport?.offsetLeft ?? 0;
      const compactViewport = isCompactViewport();
      document.documentElement.dataset.mobileFrame = String(compactViewport);
      nav.dataset.compactViewport = String(visibleWidth < 640);

      if (compactViewport) {
          // Anchored natively to the bottom so it follows the browser toolbar without waiting on JS.
          nav.style.left = "20px";
          nav.style.right = "20px";
          nav.style.width = "auto";
          nav.style.top = "auto";
          nav.style.bottom = "20px";
          previousVisibleWidth = Number.NaN;
          previousVisibleLeft = Number.NaN;
          return;
      }

      if (visibleWidth === previousVisibleWidth && visibleLeft === previousVisibleLeft) return;

      previousVisibleWidth = visibleWidth;
      previousVisibleLeft = visibleLeft;
      const navWidth = Math.min(1040, Math.max(0, visibleWidth - 40));
      const navLeft = visibleLeft + (visibleWidth - navWidth) / 2;
      const visibleBottom = visualViewport
        ? visualViewport.offsetTop + visualViewport.height
        : window.innerHeight;

      nav.style.left = `${navLeft}px`;
      nav.style.right = "auto";
      nav.style.width = `${navWidth}px`;
      nav.style.bottom = "auto";
      nav.style.top = `${visibleBottom - nav.offsetHeight - 24}px`;
    };

    const updateMobileViewport = () => {
      const compactViewport = isCompactViewport();
      document.documentElement.dataset.mobileFrame = String(compactViewport);
      if (!compactViewport) return;

      const viewportLeft = visualViewport?.offsetLeft ?? 0;
      const viewportTop = visualViewport?.offsetTop ?? 0;
      const viewportWidth = visualViewport?.width ?? window.innerWidth;
      const viewportHeight = visualViewport?.height ?? window.innerHeight;
      const root = document.documentElement.style;

      root.setProperty("--mobile-viewport-left", `${viewportLeft}px`);
      root.setProperty("--mobile-viewport-top", `${viewportTop}px`);
      root.setProperty("--mobile-viewport-width", `${viewportWidth}px`);
      root.setProperty("--mobile-viewport-height", `${viewportHeight}px`);
    };

    let viewportUpdateRequest = 0;
    const scheduleMobileViewportUpdate = () => {
      if (!isCompactViewport()) return;
      if (document.visibilityState === "hidden") {
        if (viewportUpdateRequest) window.cancelAnimationFrame(viewportUpdateRequest);
        viewportUpdateRequest = 0;
        updateMobileViewport();
        return;
      }
      if (viewportUpdateRequest) return;
      viewportUpdateRequest = window.requestAnimationFrame(() => {
        viewportUpdateRequest = 0;
        updateMobileViewport();
      });
    };
    const updateOnVisibilityChange = () => {
      if (viewportUpdateRequest) window.cancelAnimationFrame(viewportUpdateRequest);
      viewportUpdateRequest = 0;
      scheduleMobileViewportUpdate();
    };

    const currentOrientation = () => window.innerWidth >= window.innerHeight ? "landscape" : "portrait";
    let previousOrientation = currentOrientation();
    const updateAfterOrientationChange = () => {
      const nextOrientation = currentOrientation();
      if (nextOrientation === previousOrientation) return;

      previousOrientation = nextOrientation;
      scheduleMobileViewportUpdate();
    };
    const updateResponsivePosition = () => {
      updatePosition();
      updateAfterOrientationChange();
      scheduleMobileViewportUpdate();
    };

    updatePosition();
    updateMobileViewport();
    window.addEventListener("resize", updateResponsivePosition);
    window.addEventListener("scroll", scheduleMobileViewportUpdate, { passive: true });
    window.addEventListener("orientationchange", updateAfterOrientationChange);
    document.addEventListener("visibilitychange", updateOnVisibilityChange);
    visualViewport?.addEventListener("resize", updateResponsivePosition);
    visualViewport?.addEventListener("scroll", updateResponsivePosition);
    mobileViewport.addEventListener("change", updateResponsivePosition);

    return () => {
      window.cancelAnimationFrame(viewportUpdateRequest);
      window.removeEventListener("resize", updateResponsivePosition);
      window.removeEventListener("scroll", scheduleMobileViewportUpdate);
      window.removeEventListener("orientationchange", updateAfterOrientationChange);
      document.removeEventListener("visibilitychange", updateOnVisibilityChange);
      visualViewport?.removeEventListener("resize", updateResponsivePosition);
      visualViewport?.removeEventListener("scroll", updateResponsivePosition);
      mobileViewport.removeEventListener("change", updateResponsivePosition);
    };
  }, [portalHost]);

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

  if (!portalHost) return null;

  return createPortal(
    <nav
      ref={navRef}
      aria-label="Portfolio sections"
      className="fixed z-50 rounded-full border border-white/15 bg-black/90 p-[6px] shadow-[0_18px_70px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
    >
      <ul className="grid grid-cols-4 gap-1 sm:grid-cols-8">
        {navRoutes.map(({ id, label }) => {
          const active = activeSection === id;
          const compactLabel = id === "education" ? "EDU" : id === "achievements" ? "WINS" : label;
          return (
            <li key={id} className="min-w-0">
              <button
                type="button"
                onClick={() => scrollToSection(id)}
                aria-label={label}
                aria-current={active ? "true" : undefined}
                className="relative flex w-full items-center justify-center overflow-hidden whitespace-nowrap rounded-full px-1 py-[8px] text-center text-[9px] font-semibold tracking-[0.08em] text-cyan-100/90 transition-colors hover:text-white sm:text-[10px] lg:text-[11px]"
              >
                {active ? (
                  <motion.span
                    layoutId="active-orb"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-300/35 via-white/10 to-fuchsia-400/35 shadow-[0_0_22px_rgba(229,9,20,0.28)]"
                    transition={{ type: "spring", stiffness: 420, damping: 34, mass: 0.7 }}
                  />
                ) : null}
                <span className="relative z-10">
                  <span className="sm:hidden">{compactLabel}</span>
                  <span className="hidden sm:inline">{label}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>,
    portalHost,
  );
}

function EdgeBlurVeil() {
  const [portalHost, setPortalHost] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const host = document.createElement("div");
    host.dataset.edgeBlurVeilRoot = "";
    document.documentElement.appendChild(host);
    startTransition(() => setPortalHost(host));

    return () => host.remove();
  }, []);

  if (!portalHost) return null;

  return createPortal(
    <div
      className="edge-blur-veil"
      aria-hidden="true"
      style={{
        backdropFilter: "blur(12px) saturate(120%)",
        WebkitBackdropFilter: "blur(12px) saturate(120%)",
      }}
    />,
    portalHost,
  );
}

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const booting = usePortfolioStore((s) => s.booting);
  const setBooting = usePortfolioStore((s) => s.setBooting);
  const lowPerformanceDevice = useLowPerformanceDevice();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    const scrollRoot = document.getElementById(SCROLL_ROOT_ID);
    scrollRoot?.scrollTo({ top: 0, left: 0, behavior: "auto" });

    let directionAnchor = getScrollY();
    let rafId = 0;

    const updateScrollDirection = () => {
      const scrollY = getScrollY();
      const distance = scrollY - directionAnchor;
      if (Math.abs(distance) < 6) return;

      setScrollDirection(distance > 0 ? "down" : "up");
      directionAnchor = scrollY;
    };

    const requestScrollDirectionUpdate = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        updateScrollDirection();
      });
    };

    // Capture phase also receives scroll events from the mobile scroll container.
    window.addEventListener("scroll", requestScrollDirectionUpdate, { passive: true, capture: true });
    return () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener("scroll", requestScrollDirectionUpdate, { capture: true });
    };
  }, []);

  useEffect(() => {
    const lenis = lowPerformanceDevice || window.matchMedia(MOBILE_LAYOUT_QUERY).matches
      ? null
      : new Lenis({
          smoothWheel: true,
          syncTouch: false,
          wheelMultiplier: 0.8,
          lerp: 0.08,
          anchors: true,
          autoRaf: true,
          autoToggle: true,
          respectReducedMotion: true,
        });
    const timer = window.setTimeout(() => setBooting(false), 2400);
    return () => {
      clearTimeout(timer);
      lenis?.destroy();
    };
  }, [setBooting, lowPerformanceDevice]);

  return (
    <>
      <VoidBackground />
      <EdgeBlurVeil />

      <AnimatePresence>
        {booting ? (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black"
            data-mobile-viewport-layer
            layoutId="loader-universe-title"
            exit={{ opacity: 0, transition: { duration: 0.65 } }}
          >
            <motion.p
              className="whitespace-nowrap text-xs tracking-[0.65em] text-cyan-300 max-sm:tracking-[0.14em]"
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
            className="fixed left-1/2 top-4 z-40 -translate-x-1/2 whitespace-nowrap rounded-full border border-cyan-200/15 bg-black/45 px-5 py-2 text-center text-[10px] font-semibold tracking-[0.38em] text-cyan-200/75 shadow-[0_12px_50px_rgba(229,9,20,0.12)] backdrop-blur-xl max-sm:px-3 max-sm:text-[8px] max-sm:tracking-[0.14em] sm:text-xs"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            WELCOME TO MY DIGITAL UNIVERSE
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div id={SCROLL_ROOT_ID} className="scroll-root">
        {children}
      </div>
      <FloatingNav />
    </>
  );
}
