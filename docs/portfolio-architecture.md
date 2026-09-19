# Futuristic Portfolio Architecture

## 1) Design System
- Primary: #00E5FF
- Secondary: #6E44FF
- Accent: #FF4D9D
- Background: layered near-black gradients with aurora glow
- Typography:
  - Display: Sora
  - Body/UI: Space Grotesk
- Surface language:
  - high radius cards
  - glassmorphism
  - luminous border system
  - cinematic backdrop blur

## 2) Page and Scene Architecture
- Loader Scene: "Welcome to My Digital Universe"
- Home Scene: hero, hologram, primary CTA
- About Scene: philosophy and story blocks
- Experience Scene: roadmap cards and impact highlights
- Skills Scene: constellation clusters
- Projects Scene: visual case studies
- Education Scene: knowledge nodes
- Achievements Scene: trophy hall and KPI dashboard
- Contact Scene: communication center

## 3) Component Structure
- src/app/page.tsx: root route
- src/components/portfolio/portfolio-shell.tsx: boot sequence, background system, Lenis
- src/components/portfolio/portfolio-experience.tsx: all scenes and narrative flow
- src/components/portfolio/hero-hologram.tsx: Three.js avatar panel and particles
- src/components/portfolio/floating-command-nav.tsx: futuristic navigation bar
- src/components/portfolio/magnetic-button.tsx: magnetic CTA interactions
- src/store/portfolio-store.ts: UI state (boot and active scene)
- src/data/portfolio-data.ts: content and profile data model

## 4) Animation Strategy
- Framer Motion:
  - initial reveal choreography
  - section transitions
  - hover/tap interaction language
- React Three Fiber:
  - floating hologram plane
  - auto-rotating camera controls
  - volumetric particle field
- Lenis:
  - premium smooth scroll
  - touch/trackpad tuned movement

## 5) Navigation Logic
- Floating command nav anchors to scene ids
- Active scene auto-updates via IntersectionObserver
- Mouse/touch/keyboard compatible via native anchor behavior

## 6) UX Flow
- Immediate visual hook with animated loader
- Hero value proposition in first 5 seconds
- Guided story progression from identity to impact
- Credibility arc: experience -> skills -> projects -> achievements
- Conversion section closes with contact and social proof

## 7) Content Architecture
- Source of truth file: src/data/portfolio-data.ts
- LinkedIn fallback note included due anti-scraping restrictions
- Shared local images mapped to:
  - /images/profile-main.jpg
  - /images/scene-01.jpg ... /images/scene-06.jpg

## 8) Responsive Layout Rules
- Mobile-first grid behavior
- Compact command nav on small widths
- Preserved readability with high contrast body text
- Hero and scene cards collapse into single-column stacks under lg breakpoints

## 9) Theme and Accessibility
- Dark mode default with high luminance accents
- Visible focus-compatible controls and clear text contrast
- Motion still purposeful; no blocking animation for core reading flow

## 10) Production Readiness
- TypeScript strict build passing
- Next.js static prerender route success
- Lint pass success
- Performance-friendly rendering strategy:
  - lightweight geometry
  - constrained post-effects
  - optimized image usage through Next/Image
