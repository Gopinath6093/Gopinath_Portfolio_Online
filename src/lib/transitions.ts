import type { TargetAndTransition } from "framer-motion";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];
const exitEase: [number, number, number, number] = [0.55, 0, 0.45, 1];

export type PageMeta = {
  label: string;
  glowPrimary: string;
  glowSecondary: string;
  accentLabel: string;
  variants: {
    initial: TargetAndTransition;
    animate: TargetAndTransition;
    exit: TargetAndTransition;
  };
};

/** Per-route cinematic enter + exit variants. Each page feels like a distinct scene. */
export const pageMeta: Record<string, PageMeta> = {
  "/": {
    label: "HOME",
    accentLabel: "00",
    glowPrimary: "rgba(0,229,255,0.22)",
    glowSecondary: "rgba(0,100,180,0.14)",
    variants: {
      initial: { opacity: 0, scale: 0.95, filter: "blur(14px)" },
      animate: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.75, ease } },
      exit: { opacity: 0, scale: 1.04, filter: "blur(10px)", transition: { duration: 0.32, ease: exitEase } },
    },
  },
  "/about": {
    label: "ABOUT",
    accentLabel: "01",
    glowPrimary: "rgba(110,68,255,0.24)",
    glowSecondary: "rgba(60,20,160,0.16)",
    variants: {
      initial: { opacity: 0, y: 80, filter: "blur(10px)" },
      animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.68, ease } },
      exit: { opacity: 0, y: -50, transition: { duration: 0.28, ease: exitEase } },
    },
  },
  "/experience": {
    label: "JOURNEY",
    accentLabel: "02",
    glowPrimary: "rgba(130,68,255,0.28)",
    glowSecondary: "rgba(180,50,255,0.14)",
    variants: {
      initial: { opacity: 0, x: 110, filter: "blur(8px)" },
      animate: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.68, ease } },
      exit: { opacity: 0, x: -80, transition: { duration: 0.28, ease: exitEase } },
    },
  },
  "/skills": {
    label: "SKILLS",
    accentLabel: "03",
    glowPrimary: "rgba(0,255,190,0.18)",
    glowSecondary: "rgba(0,210,130,0.12)",
    variants: {
      initial: { opacity: 0, scale: 1.15, filter: "blur(20px)" },
      animate: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.72, ease } },
      exit: { opacity: 0, scale: 0.9, filter: "blur(12px)", transition: { duration: 0.28, ease: exitEase } },
    },
  },
  "/projects": {
    label: "PROJECTS",
    accentLabel: "04",
    glowPrimary: "rgba(255,77,157,0.22)",
    glowSecondary: "rgba(200,30,100,0.14)",
    variants: {
      initial: { opacity: 0, x: -110, filter: "blur(8px)" },
      animate: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.68, ease } },
      exit: { opacity: 0, x: 80, transition: { duration: 0.28, ease: exitEase } },
    },
  },
  "/education": {
    label: "EDU",
    accentLabel: "05",
    glowPrimary: "rgba(0,120,255,0.22)",
    glowSecondary: "rgba(50,60,210,0.14)",
    variants: {
      initial: { opacity: 0, y: -80, filter: "blur(10px)" },
      animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.68, ease } },
      exit: { opacity: 0, y: 60, transition: { duration: 0.28, ease: exitEase } },
    },
  },
  "/achievements": {
    label: "WINS",
    accentLabel: "06",
    glowPrimary: "rgba(255,200,50,0.18)",
    glowSecondary: "rgba(255,140,0,0.12)",
    variants: {
      initial: { opacity: 0, scale: 0.82, rotateX: 18 },
      animate: { opacity: 1, scale: 1, rotateX: 0, transition: { duration: 0.75, ease } },
      exit: { opacity: 0, scale: 1.1, transition: { duration: 0.28, ease: exitEase } },
    },
  },
  "/contact": {
    label: "CONTACT",
    accentLabel: "07",
    glowPrimary: "rgba(255,77,157,0.28)",
    glowSecondary: "rgba(180,0,120,0.18)",
    variants: {
      initial: { opacity: 0, scale: 1.08, filter: "blur(16px)" },
      animate: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.7, ease } },
      exit: { opacity: 0, scale: 0.94, filter: "blur(10px)", transition: { duration: 0.28, ease: exitEase } },
    },
  },
};

export const navRoutes = [
  { id: "home", href: "/", label: "HOME" },
  { id: "about", href: "/about", label: "ABOUT" },
  { id: "experience", href: "/experience", label: "JOURNEY" },
  { id: "skills", href: "/skills", label: "SKILLS" },
  { id: "projects", href: "/projects", label: "PROJECTS" },
  { id: "education", href: "/education", label: "EDUCATION" },
  { id: "achievements", href: "/achievements", label: "ACHIEVEMENTS" },
  { id: "contact", href: "/contact", label: "CONTACT" },
] as const;

