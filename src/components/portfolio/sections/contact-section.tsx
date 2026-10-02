"use client";

import { motion } from "framer-motion";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { springCardVariants, springTransition, springViewport, useScrollDirection } from "@/components/portfolio/spring-reveal";
import { portfolioData } from "@/data/portfolio-data";
import { MagneticButton } from "@/components/portfolio/magnetic-button";

const resumeUrl = "/resume/Gopinath_S_Resume.pdf";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const container = {
  animate: { transition: { staggerChildren: 0.1, delayChildren: 0.06 } },
};

const item = {
  initial: { opacity: 0, y: 26 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
};

const contactFields = [
  { label: "EMAIL", value: portfolioData.profile.email, href: `mailto:${portfolioData.profile.email}` },
  { label: "PHONE", value: portfolioData.profile.phone, href: `tel:${portfolioData.profile.phone}` },
  { label: "LINKEDIN", value: "Open Profile →", href: portfolioData.profile.linkedin },
  { label: "LOCATION", value: portfolioData.profile.location, href: null },
];

export function ContactSection() {
  const scrollDirection = useScrollDirection();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "error" | "sent" | "copied">("idle");

  const updateField = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
    setStatus("idle");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValid =
      form.name.trim() && form.message.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());

    if (!isValid) {
      setStatus("error");
      return;
    }

    const subject = form.subject.trim() || `Portfolio enquiry from ${form.name.trim()}`;
    const body = `${form.message.trim()}\n\n—\n${form.name.trim()}\n${form.email.trim()}`;
    const mailto = `mailto:${portfolioData.profile.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
    setStatus("sent");
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(portfolioData.profile.email);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="mx-auto w-[min(1100px,92vw)] max-sm:w-[calc(100%_-_48px)] max-sm:max-w-[1100px]">
      <motion.div variants={container} initial="initial" animate="animate" className="mb-10">
        <motion.p variants={item} className="text-[11px] uppercase tracking-[0.5em] text-cyan-300/80">
          07 · Contact
        </motion.p>
        <motion.h1
          variants={item}
          className="mt-2 bg-gradient-to-r from-white to-white/50 bg-clip-text text-4xl font-black tracking-tight text-transparent sm:text-5xl"
        >
          Communication Center
        </motion.h1>
        <motion.p variants={item} className="mt-3 max-w-xl text-sm text-cyan-100/75">
          Whether it&apos;s a collaboration opportunity or a conversation about quality — signal received.
        </motion.p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        {/* Contact info */}
        <motion.div variants={container} initial="initial" animate="animate" className="space-y-3" style={{ perspective: 1000 }}>
          {contactFields.map(({ label, value, href }, i) => (
            <motion.div
              key={label}
              variants={springCardVariants}
              custom={scrollDirection}
              animate={scrollDirection === "up" ? "initialUp" : "initialDown"}
              whileInView="animate"
              viewport={springViewport}
              transition={{ ...springTransition, delay: i * 0.07 }}
              whileHover={{ y: -2, x: 4 }}
              className="rounded-2xl border border-white/12 bg-white/10 p-4 backdrop-blur-xl"
            >
              <p className="text-[10px] font-bold tracking-[0.4em] text-cyan-300/80">{label}</p>
              {href ? (
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  className="mt-1 block text-sm font-medium text-white hover:text-cyan-200 transition-colors"
                >
                  {value}
                </a>
              ) : (
                <p className="mt-1 text-sm font-medium text-white">{value}</p>
              )}
            </motion.div>
          ))}

          <motion.a
            variants={item}
            href={resumeUrl}
            download
            className="flex items-center justify-center gap-2 rounded-2xl border border-cyan-300/30 bg-cyan-300/10 p-4 text-sm font-semibold tracking-[0.2em] text-cyan-100 transition-all hover:bg-cyan-300/20"
            whileHover={{ y: -2 }}
          >
            DOWNLOAD RESUME ↓
          </motion.a>
        </motion.div>

        {/* Contact form */}
        <motion.div
          variants={springCardVariants}
          custom={scrollDirection}
          initial="initial"
          animate={scrollDirection === "up" ? "initialUp" : "initialDown"}
          whileInView="animate"
          viewport={springViewport}
          style={{ perspective: 1000 }}
          className="rounded-[1.8rem] border border-fuchsia-300/20 bg-white/10 p-7 backdrop-blur-xl"
        >
          <h2 className="text-lg font-bold text-white">Send Signal</h2>
          <p className="mt-1 text-sm text-cyan-100/65">
            Opens your mail app with the message pre-filled for {portfolioData.profile.email}.
          </p>

          <form className="mt-5 grid gap-3" onSubmit={handleSubmit} noValidate>
            <motion.input
              name="name"
              type="text"
              required
              value={form.name}
              onChange={updateField}
              placeholder="Your Name"
              className="rounded-xl border border-white/20 bg-black/30 p-3 text-sm text-white placeholder-cyan-100/40 outline-none transition-all focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20"
              whileFocus={{ scale: 1.005 }}
            />
            <motion.input
              name="email"
              type="email"
              required
              value={form.email}
              onChange={updateField}
              placeholder="Your Email"
              className="rounded-xl border border-white/20 bg-black/30 p-3 text-sm text-white placeholder-cyan-100/40 outline-none transition-all focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20"
              whileFocus={{ scale: 1.005 }}
            />
            <motion.input
              name="subject"
              type="text"
              value={form.subject}
              onChange={updateField}
              placeholder="Subject"
              className="rounded-xl border border-white/20 bg-black/30 p-3 text-sm text-white placeholder-cyan-100/40 outline-none transition-all focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20"
              whileFocus={{ scale: 1.005 }}
            />

            <motion.textarea
              name="message"
              required
              value={form.message}
              onChange={updateField}
              placeholder="Your Message"
              rows={5}
              className="rounded-xl border border-white/20 bg-black/30 p-3 text-sm text-white placeholder-cyan-100/40 outline-none transition-all focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20"
              whileFocus={{ scale: 1.005 }}
            />

            <div className="mt-1 flex flex-wrap items-center gap-3">
              <MagneticButton type="submit">SEND SIGNAL</MagneticButton>
              <MagneticButton onClick={copyEmail}>
                {status === "copied" ? "EMAIL COPIED" : "COPY EMAIL"}
              </MagneticButton>
            </div>

            {status === "error" ? (
              <p className="text-xs text-rose-300">
                Please fill in your name, a valid email, and a message.
              </p>
            ) : null}
            {status === "sent" ? (
              <p className="text-xs text-cyan-200">
                Your mail app should now be open. If nothing happened, use COPY EMAIL instead.
              </p>
            ) : null}
          </form>
        </motion.div>
      </div>
    </div>
  );
}

