# Plan: Bold Editorial CV for Pol-Martí de Tera

## Project Overview
- **Target**: CS student entering Ingeniería Informática at LaSalle
- **Direction**: Bold & Editorial (magazine/agency feel)
- **Language**: Spanish-first with ES/EN toggle
- **Format**: Single-file vanilla HTML/CSS/JS

## Design System

### Typography
- **Font**: Outfit (Google Fonts) — weights 400, 500, 600, 700, 900
- **Display headers**: Outfit 900, clamp(48px, 8vw, 96px), line-height 0.95, letter-spacing -0.04em
- **Section headers**: ALL CAPS, Outfit 700, 14px, letter-spacing 0.08em, terracotta accent underline
- **Body**: Outfit 400/500, 16px, line-height 1.65
- **Labels**: Outfit 600, 12px, uppercase, letter-spacing 0.06em

### Color Tokens (OKLCH)
- `--bg`: oklch(98.5% 0.003 45) — warm off-white
- `--fg`: oklch(15% 0.01 45) — near-black
- `--muted`: oklch(45% 0.01 45) — muted text
- `--accent`: oklch(52% 0.18 35) — terracotta
- `--accent-soft`: oklch(92% 0.08 35) — soft terracotta for backgrounds
- `--border`: oklch(85% 0.01 45) — subtle borders
- `--surface`: oklch(100% 0 0) — pure white cards

### Layout
- **Container**: max-width 1100px, centered
- **Section rhythm**: Alternating density — Hero (full viewport), About (breathing), Skills (tight), Projects (bento grid), Education (breathing), Experience (tight), Contact (breathing)
- **Bento grid**: CSS Grid with named areas, 3D project gets 2/3 width, Micro:bit gets 1/3

### Motion
- **Entrance**: Staggered fade-up (16px travel, 0.4s, cubic-bezier(0.2, 0, 0, 1))
- **Scroll reveal**: IntersectionObserver, 15% threshold, one-shot
- **Hover lifts**: Buttons (-2px), project cards (-4px), skill chips (-1px)
- **Reduced motion**: All transforms/animations disabled via prefers-reduced-motion

## Sections

### 1. Hero (full viewport)
- Name: "POL-MARTÍ DE TERA" (massive, 900 weight)
- Title: "ESTUDIANTE DE INGENIERÍA INFORMÁTICA" (smaller, muted)
- Tagline: "Apasionado por cómo funciona el futuro. Trabajo duro, iniciativa." (editorial body)
- CTA: "Ver proyectos" → scrolls to Projects
- Language toggle in top-right

### 2. About
- Short paragraph expanding on the tagline
- Left-aligned, generous measure (65ch max)

### 3. Skills
- Categories: Lenguajes, Frameworks, Herramientas, Diseño 3D
- Pill-style chips with hover lift
- Tight grid layout

### 4. Projects (Bento Grid - PRIORITY SECTION)
- **Featured (2/3 width)**: 3D Mechanical Design — Onshape CAD portfolio (Funel, Gear-Cover, Part-Studio series, Reflector)
- **Secondary (1/3 width)**: Micro:bit Flappy Bird — Embedded game development
- Each card: image placeholder, title, one-line description, tech tags, link placeholder

### 5. Education
- LaSalle — Grado en Ingeniería Informática (2024–2028)
- Clean, minimal card

### 6. Experience
- Placeholder for internships/freelance — "Próximamente" state

### 6. Contact
- Email, GitHub, LinkedIn — simple row with hover accent underline

## Bilingual System
- Content object with `es` and `en` keys for all translatable strings
- Toggle button in nav (ES/EN)
- Persists to localStorage
- Default: `es`
- Non-translatable: name, tech terms, project names, proper nouns

## Accessibility
- Skip-to-content link
- Focus-visible outlines (2px terracotta)
- Semantic HTML5 (header, main, section, footer)
- ARIA labels on toggle
- lang="es" on html, updates on toggle

## Technical Stack
- Single `cv-landing-page.html` file
- Outfit font via `<link rel="preconnect">` + `<link>` (non-blocking)
- CSS custom properties for all tokens
- Vanilla JS for toggle, scroll reveal, smooth scroll
- No frameworks, no build step

## Provenance

Formalized by Open Design from candidate e7300568-396c-4c39-b3df-58ace6c1ef98.
