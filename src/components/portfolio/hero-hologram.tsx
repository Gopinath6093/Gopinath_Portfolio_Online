"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useLowPerformanceDevice } from "@/lib/performance";

const heroImages = [
  {
    src: "/images/Gopi_Image.png",
    label: "PROFILE SIGNAL",
    caption: "Gopinath S",
  },
  {
    src: "/images/Gopi_Image01.png",
    label: "PORTFOLIO FRAME",
    caption: "Workplace perspective",
  },
  {
    src: "/images/Gopi_Image02.png",
    label: "QUALITY MINDSET",
    caption: "Engineering with clarity",
  },
  {
    src: "/images/Gopi_Image03.png",
    label: "PROFESSIONAL MODE",
    caption: "Focused delivery presence",
  },
  {
    src: "/images/Gopi_Image04.png",
    label: "CREATIVE SIGNAL",
    caption: "Digital craft and style",
  },
  {
    src: "/images/Gopi_Image05.png",
    label: "FIELD NOTES",
    caption: "Calm focus beyond the desk",
  },
  {
    src: "/images/Gopi_Image06.png",
    label: "FINAL FRAME",
    caption: "Rotational showcase complete",
  },
] as const;

const slideVariants = {
  initial: { opacity: 0, scale: 1.04, rotate: 0.4, filter: "blur(8px) saturate(0.8)" },
  animate: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    filter: "blur(0px) saturate(1.06)",
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.99,
    rotate: -0.3,
    filter: "blur(6px) saturate(0.9)",
    transition: { duration: 0.42, ease: [0.55, 0, 0.45, 1] },
  },
} as const;

export function HeroHologram() {
  const [activeIndex, setActiveIndex] = useState(0);
  const lowPerformanceDevice = useLowPerformanceDevice();
  const activeImage = heroImages[activeIndex];

  useEffect(() => {
    if (lowPerformanceDevice) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % heroImages.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, [lowPerformanceDevice]);

  if (lowPerformanceDevice) {
    const image = heroImages[0];

    return (
      <div className="relative h-[400px] w-full overflow-hidden rounded-[2rem] border border-cyan-200/20 bg-black/55 shadow-[0_24px_60px_rgba(0,229,255,0.12)] sm:h-[460px]">
        <Image
          src={image.src}
          alt={image.caption}
          fill
          priority
          sizes="(max-width: 1024px) 94vw, 38vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.12),rgba(0,0,0,0.78))]" />
        <div className="absolute inset-x-5 top-5 rounded-full border border-white/12 bg-black/45 px-4 py-3 backdrop-blur-md">
          <span className="text-[10px] font-bold uppercase tracking-[0.34em] text-cyan-100/85">
            {image.label}
          </span>
        </div>
        <div className="absolute bottom-5 left-5 right-5 rounded-[1.2rem] border border-white/12 bg-black/50 p-4 backdrop-blur-md">
          <p className="text-xs uppercase tracking-[0.28em] text-cyan-200/80">image.sequence.01</p>
          <p className="mt-2 text-xl font-black text-white sm:text-2xl">{image.caption}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative h-[440px] w-full overflow-hidden rounded-[2rem] border border-cyan-200/20 bg-black/55 shadow-[0_30px_100px_rgba(0,229,255,0.16)] backdrop-blur-xl sm:h-[520px]">
      <div className="absolute inset-0 rounded-[2rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.12),transparent_26%,rgba(0,229,255,0.08)_52%,transparent)]" />
      <div className="absolute inset-[10px] overflow-hidden rounded-[1.55rem] border border-white/10 bg-black">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeImage.src}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute inset-0"
          >
            <Image
              src={activeImage.src}
              alt={activeImage.caption}
              fill
              priority={activeIndex === 0}
              sizes="(max-width: 1024px) 94vw, 38vw"
              className="object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,transparent_0,transparent_40%,rgba(0,0,0,0.18)_65%,rgba(0,0,0,0.76)_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),transparent_34%,rgba(0,0,0,0.78))]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.16] mix-blend-screen bg-[linear-gradient(rgba(255,255,255,0.75)_1px,transparent_1px)] bg-[size:100%_7px]" />
      </div>

      <div className="absolute left-5 right-5 top-5 flex items-center justify-between gap-3 rounded-full border border-white/12 bg-black/45 px-4 py-3 backdrop-blur-md">
        <span className="text-[10px] font-bold uppercase tracking-[0.34em] text-cyan-100/85">
          {activeImage.label}
        </span>
        <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(0,229,255,0.9)]" />
      </div>

      <div className="absolute bottom-5 left-5 right-5 rounded-[1.2rem] border border-white/12 bg-black/50 p-4 backdrop-blur-md">
        <p className="text-xs uppercase tracking-[0.28em] text-cyan-200/80">
          image.sequence.{String(activeIndex + 1).padStart(2, "0")}
        </p>
        <p className="mt-2 text-xl font-black text-white sm:text-2xl">{activeImage.caption}</p>
        <div className="mt-4 grid grid-cols-7 gap-2" aria-label="Hero image progress">
          {heroImages.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setActiveIndex(index)}
              className="h-1.5 rounded-full bg-white/15 transition-colors hover:bg-cyan-200/60"
              aria-label={`Show ${image.label}`}
              aria-current={activeIndex === index ? "true" : undefined}
            >
              <motion.span
                className="block h-full rounded-full bg-cyan-300"
                initial={false}
                animate={{ width: activeIndex === index ? "100%" : "0%" }}
                transition={{ duration: activeIndex === index ? 3.4 : 0.22, ease: "linear" }}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/10 transition group-hover:ring-cyan-200/30" />
    </div>
  );
}
