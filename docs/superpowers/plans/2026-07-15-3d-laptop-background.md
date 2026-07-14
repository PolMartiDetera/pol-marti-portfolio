# 3D Scroll-Driven Laptop Background

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate the 3D CSS scroll-driven laptop flip animation as a fixed background element that evolves as the user scrolls through the portfolio, with all existing content sections floating on top.

**Architecture:** The laptop is a `position: fixed` element behind all content. CSS scroll-driven animations use `animation-timeline: scroll(root)` to tie the 6-phase animation (jump → spin → flip → open → straighten → zoom) to page scroll progress. Content sections overlay with semi-transparent/solid backgrounds for readability. The laptop screen transitions from showing "Pol-Martí" logo to a contact page mockup.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, pure CSS scroll-driven animations (no JS for animation), existing shadcn/ui components.

---

## Global Constraints

- Framework: Next.js 16 with App Router (`output: "export"`, `basePath: "/pol-marti-portfolio"`)
- Styling: Tailwind CSS 4 with shadcn/ui theme variables (dark mode default)
- Fonts: Syne (heading), Space Grotesk (body), JetBrains Mono (mono)
- Icons: `@phosphor-icons/react`
- Animation: Pure CSS scroll-driven animations — no GSAP or JS animation libraries
- All existing sections maintained: About, Robòtica, Python, Micro:bit, Onshape, Contacte
- Language: Catalan (ca)

---

## File Structure

| File | Action | Responsibility |
|------|--------|---------------|
| `src/components/laptop-background.tsx` | **Create** | React component rendering the 3D laptop HTML structure |
| `src/app/globals.css` | **Modify** | Add laptop CSS animations, cuboid styles, scroll-driven keyframes |
| `src/app/page.tsx` | **Modify** | Import LaptopBackground, restructure layout, update section backgrounds |
| `src/components/layout/section-wrapper.tsx` | **Modify** | Add z-index and backdrop for content overlay |

---

## Task 1: Create LaptopBackground Component

**Files:**
- Create: `src/components/laptop-background.tsx`

**Interfaces:**
- Consumes: nothing (standalone component)
- Produces: `<LaptopBackground />` React component with the 3D laptop HTML structure

- [ ] **Step 1: Create the component file**

Create `src/components/laptop-background.tsx` with the following content. This component renders the 3D laptop HTML structure adapted from the original animation. The SVG bear logos are replaced with the "Pol-Martí" text/initials. The component is purely presentational — all animation is driven by CSS.

```tsx
"use client"

export function LaptopBackground() {
  return (
    <div className="laptop-bg" aria-hidden="true">
      <div className="laptop-scene-zoom">
        <div className="laptop-scene">
          <div className="laptop-scene-rock">
            <div className="laptop-scene-spin">
              <div className="laptop-scene-shadow">
                <div className="laptop-scene-jump">
                  <div className="laptop-scene-flip">
                    <div className="laptop">
                      {/* Top shell (screen) */}
                      <div className="laptop-shell laptop-shell--top">
                        <div className="laptop-screen-content">
                          <span className="laptop-screen-text">PM</span>
                        </div>
                        <div className="cuboid cuboid--screen">
                          <div className="cuboid__side" />
                          <div className="cuboid__side" />
                          <div className="cuboid__side" />
                          <div className="cuboid__side" />
                          <div className="cuboid__side">
                            <div className="laptop-screen-inner">
                              <span className="laptop-screen-text">PM</span>
                            </div>
                          </div>
                          <div className="cuboid__side" />
                        </div>
                      </div>
                      {/* Bottom shell (keyboard) */}
                      <div className="laptop-shell laptop-shell--bottom">
                        <div className="cuboid cuboid--keyboard">
                          <div className="cuboid__side" />
                          <div className="cuboid__side" />
                          <div className="cuboid__side" />
                          <div className="cuboid__side" />
                          <div className="cuboid__side" />
                          <div className="cuboid__side" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify component compiles**

Run: `npx next build --no-lint` (or just check that the file is syntactically valid TypeScript)
Expected: No type errors in the new component.

---

## Task 2: Add Laptop CSS Animations to globals.css

**Files:**
- Modify: `src/app/globals.css`

**Interfaces:**
- Consumes: the class names from `LaptopBackground` component
- Produces: CSS animations and styles for the laptop, cuboid, and scroll-driven keyframes

- [ ] **Step 1: Add laptop background base styles**

Append the following CSS to `src/app/globals.css`. This sets up the fixed background container and the 3D scene hierarchy.

```css
/* ===== 3D Laptop Background ===== */
.laptop-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
  perspective: 800px;
}

.laptop-bg *,
.laptop-bg *:before,
.laptop-bg *:after {
  transform-style: preserve-3d;
  box-sizing: border-box;
}

.laptop-scene-zoom {
  animation: laptop-zoom both linear;
  animation-timeline: scroll(root);
  animation-range: 75vh 120vh;
}

.laptop-scene {
  transform: rotateX(-24deg) rotateY(-32deg) rotateX(90deg) translate3d(0, 0, -20vmin);
  animation: laptop-scale-to-view both linear;
  animation-timeline: scroll(root);
  animation-range: 55vh 85vh;
}

.laptop-scene-rock {
  transform-origin: 0 50%;
}

.laptop-scene-spin {
  animation: laptop-spin both ease-in-out;
  animation-timeline: scroll(root);
  animation-range: 10vh 35vh;
}

.laptop-scene-shadow {
  position: relative;
}

.laptop-scene-shadow:after {
  background: hsl(0 0% 0% / 0.5);
  content: "";
  position: absolute;
  inset: 5%;
  filter: blur(10px);
  animation: laptop-shadow-in-out both linear;
  animation-timeline: scroll(root);
  animation-range: 10vh 35vh;
}

.laptop-scene-jump {
  animation: laptop-jump both ease-in-out;
  animation-timeline: scroll(root);
  animation-range: 10vh 35vh;
}

.laptop-scene-flip {
  animation: laptop-flip both ease-in-out;
  animation-timeline: scroll(root);
  animation-range: 15vh 40vh;
}
```

- [ ] **Step 2: Add laptop component styles**

Append the laptop body, shells, and screen styles:

```css
/* Laptop body */
.laptop {
  width: 30vmin;
  aspect-ratio: 16 / 12;
  position: relative;
  transform: translate3d(0, 0, 2vmin);
}

/* Shells */
.laptop-shell {
  position: absolute;
  inset: 0;
}

.laptop-shell--top {
  --depth: 2;
  --color: hsl(0 0% 80%);
  background: hsl(0 0% 2%);
  transform-origin: 50% 0;
  animation: laptop-open-top both linear;
  animation-timeline: scroll(root);
  animation-range: 35vh 60vh;
}

.laptop-shell--top:after {
  content: "";
  position: absolute;
  inset: 0;
  border: 1vmin solid hsl(0 0% 10%);
}

.laptop-shell--bottom {
  --depth: 2;
  --color: hsl(0 0% 80%);
  background: hsl(0 0% 50%);
  transform-origin: 50% 0;
  animation: laptop-open-bottom both linear;
  animation-timeline: scroll(root);
  animation-range: 35vh 60vh;
}

/* Screen content */
.laptop-screen-content {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  z-index: 1;
}

.laptop-screen-inner {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
}

.laptop-screen-text {
  font-family: var(--font-heading), sans-serif;
  font-size: 5vmin;
  font-weight: 800;
  color: white;
  letter-spacing: 0.05em;
  transform: rotateX(0deg);
}

/* Cuboid for screen depth */
.cuboid--screen {
  transform: translate3d(0, 0, calc(1vmin + 1px));
}

.cuboid--keyboard {
  transform: translate3d(0, 0, calc(-1vmin - 1px));
}
```

- [ ] **Step 3: Add cuboid base styles**

Append the cuboid boilerplate (from the original animation):

```css
/* Cuboid boilerplate */
.cuboid {
  width: 100%;
  height: 100%;
  position: relative;
}

.cuboid__side {
  background: var(--color);
  filter: brightness(var(--b, 1));
  position: absolute;
}

.cuboid__side:nth-of-type(1) {
  --b: 1.1;
  height: calc(var(--depth, 20) * 1vmin);
  width: 100%;
  top: 0;
  transform: translate(0, -50%) rotateX(90deg);
}

.cuboid__side:nth-of-type(2) {
  --b: 0.9;
  height: 100%;
  width: calc(var(--depth, 20) * 1vmin);
  top: 50%;
  right: 0;
  transform: translate(50%, -50%) rotateY(90deg);
}

.cuboid__side:nth-of-type(3) {
  --b: 0.5;
  width: 100%;
  height: calc(var(--depth, 20) * 1vmin);
  bottom: 0;
  transform: translate(0%, 50%) rotateX(90deg);
}

.cuboid__side:nth-of-type(4) {
  --b: 1;
  height: 100%;
  width: calc(var(--depth, 20) * 1vmin);
  left: 0;
  top: 50%;
  transform: translate(-50%, -50%) rotateY(90deg);
}

.cuboid__side:nth-of-type(5) {
  --b: 0.8;
  height: 100%;
  width: 100%;
  transform: translate3d(0, 0, calc(var(--depth, 20) * 0.5vmin));
  top: 0;
  left: 0;
}

.cuboid__side:nth-of-type(6) {
  --b: 1.2;
  height: 100%;
  width: 100%;
  transform: translate3d(0, 0, calc(var(--depth, 20) * -0.5vmin)) rotateY(180deg);
  top: 0;
  left: 0;
}
```

- [ ] **Step 4: Add keyframe animations**

Append all the keyframe definitions:

```css
/* ===== Keyframe Animations ===== */

@keyframes laptop-jump {
  50% {
    transform: translate3d(0, 0, 40vmin);
  }
}

@keyframes laptop-spin {
  to {
    transform: rotateZ(-360deg);
  }
}

@keyframes laptop-flip {
  0%, 20% {
    transform: rotateX(0deg);
  }
  80%, 100% {
    transform: rotateX(360deg);
  }
}

@keyframes laptop-open-top {
  0%, 30% {
    transform: rotateX(0deg);
  }
  40% {
    transform: rotateX(120deg);
  }
  75%, 100% {
    transform: rotateX(90deg);
  }
}

@keyframes laptop-open-bottom {
  0%, 45% {
    transform: rotateX(0deg);
  }
  65% {
    transform: rotateX(50deg);
  }
  100% {
    transform: rotateX(0deg);
  }
}

@keyframes laptop-shadow-in-out {
  0%, 5%, 95%, 100% {
    opacity: 1;
  }
  35%, 65% {
    opacity: 0;
  }
}

@keyframes laptop-scale-to-view {
  0% {
    transform: rotateX(-24deg) rotateY(-32deg) rotateX(90deg) translate3d(0, 0, -20vmin);
  }
  to {
    transform: rotateX(0) rotateY(0) rotateX(90deg) translate3d(0, 0, -12vmin);
  }
}

@keyframes laptop-zoom {
  0% {
    scale: 1;
  }
  to {
    scale: 9;
  }
}
```

- [ ] **Step 5: Verify CSS compiles**

Run: `npm run build` or `npx next build --no-lint`
Expected: Build succeeds with the new CSS.

---

## Task 3: Integrate LaptopBackground into Page Layout

**Files:**
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `<LaptopBackground />` from `@/components/laptop-background`
- Produces: Updated page layout with laptop as fixed background, sections floating on top

- [ ] **Step 1: Import LaptopBackground**

Add the import at the top of `src/app/page.tsx`:

```tsx
import { LaptopBackground } from "@/components/laptop-background"
```

- [ ] **Step 2: Add LaptopBackground to the JSX**

Insert `<LaptopBackground />` inside the `<>` fragment, right before `<Nav />`:

```tsx
return (
  <>
    <LaptopBackground />
    <Nav />
    <main className="flex-1 relative z-10">
      {/* ... existing sections ... */}
    </main>
    <Footer />
  </>
)
```

- [ ] **Step 3: Remove the DotGrid background effect**

Remove the existing DotGrid background div (lines 231-243 in the current page.tsx). The laptop replaces it as the primary background element.

- [ ] **Step 4: Update section backgrounds for readability**

Update the Hero section to have a semi-transparent dark background so text is readable over the laptop:

Change the Hero section class from:
```tsx
<section id="inicio" className="min-h-[100dvh] flex items-center relative overflow-hidden z-10">
```
To:
```tsx
<section id="inicio" className="min-h-[100dvh] flex items-center relative overflow-hidden z-10 bg-zinc-950/80 backdrop-blur-sm">
```

Update the About section (`SectionWrapper` with `className="bg-zinc-900 relative z-10"`) — keep as-is (already has solid background).

Update the Robotics section (`SectionWrapper` with `className="relative z-10"`) — add semi-transparent background:
```tsx
<SectionWrapper id="robotics" className="bg-zinc-950/70 backdrop-blur-sm relative z-10">
```

Update the Python section — keep `bg-zinc-900` (already solid).

Update the Micro:bit section — add semi-transparent background:
```tsx
<SectionWrapper id="microbit" className="bg-zinc-950/70 backdrop-blur-sm relative z-10">
```

Update the Onshape section — keep `bg-zinc-900` (already solid).

Update the Contact section — add semi-transparent background:
```tsx
<SectionWrapper id="contact" className="bg-zinc-950/70 backdrop-blur-sm relative z-10">
```

- [ ] **Step 5: Verify page renders**

Run: `npm run build` or `npx next build --no-lint`
Expected: Build succeeds.

---

## Task 4: Verify and Tune

**Files:**
- Modify: `src/app/globals.css` (animation range tuning if needed)
- Modify: `src/app/page.tsx` (layout adjustments if needed)

**Interfaces:**
- Consumes: all previous tasks
- Produces: working portfolio with laptop background animation

- [ ] **Step 1: Start dev server and test**

Run: `npm run dev`
Expected: Portfolio loads, laptop appears in background, scroll triggers the 6-phase animation.

- [ ] **Step 2: Verify all sections are accessible**

Scroll through the entire page and confirm:
- Hero section is readable over the laptop
- About section has solid background
- Robotics section is readable
- Python terminal works
- Micro:bit simulator works
- Onshape 3D viewers work
- Contact section is readable
- Nav works (all links scroll to correct sections)

- [ ] **Step 3: Adjust animation ranges if needed**

If the laptop animation finishes too early or too late, adjust the `animation-range` values in `globals.css` to match the total page scroll height. The current ranges assume a page height of roughly 7-8 viewport heights.

- [ ] **Step 4: Final build verification**

Run: `npm run build`
Expected: Clean build with no errors.

- [ ] **Step 5: Commit changes**

```bash
git add -A
git commit -m "feat: add 3D scroll-driven laptop as fixed background

- LaptopBackground component with 3D cuboid CSS structure
- Scroll-driven animations (jump, spin, flip, open, straighten, zoom)
- Content sections float on top with semi-transparent backgrounds
- Laptop screen shows 'PM' initials, transitions on scroll"
```
