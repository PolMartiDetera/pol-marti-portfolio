# 8fdd7dcf-2f71-4656-90d4-58bb60e9f8bd implementation handoff

This archive is the source of truth for turning the design into production code. Start from `cv-landing-page.html`, then preserve the visual system, responsive behavior, and interactions found in the exported files.

## Implementation target
- Build production UI from the exported design, not a loose reinterpretation.
- Preserve typography scale, spacing rhythm, color tokens, border radii, shadows, motion timing, and component states.
- Replace static placeholders only when the target app has real data or functional equivalents.
- Keep generated product UI free of Open Design chrome, preview labels, or design-process annotations.
- Treat this handoff as a visual contract: if implementation choices conflict, match the exported pixels and behavior first, then refactor internals.

## Source map
- Primary entry: `cv-landing-page.html`
- HTML screens detected: 2
- Stylesheets detected: 0
- Script/component files detected: 0
- Supporting assets detected: 183

## Responsive contract
Validate the implementation across this 2025–2026 viewport matrix:
- Mobile compact: 360×800
- Mobile standard: 390×844
- Mobile large: 430×932
- Foldable / small tablet: 600×960
- Tablet portrait: 820×1180
- Tablet landscape: 1024×768
- Laptop: 1366×768
- Desktop: 1440×900
- Wide desktop: 1920×1080

For responsive web exports, treat these as a modern breakpoint system for one adaptive web experience, not three fixed screenshots. Do not split responsive web into unrelated native app screens unless the project explicitly includes native targets. Use semantic layout thresholds, fluid `clamp()` type/spacing, and container queries where component width matters more than viewport width. Preserve any CSS media queries, container queries, fluid `clamp()` scales, and layout changes already present in the exported files.

## Design fidelity contract
- Extract reusable tokens before writing components: background, surface, foreground, muted text, border, accent, radius, shadow, spacing, type scale, and motion duration/easing.
- Map product screens, in-app modules/components, optional landing page, and optional OS widget surfaces before coding. Keep these surfaces separate in the target architecture.
- Match layout geometry: max-widths, gutters, grid columns, card proportions, sticky/fixed elements, and viewport-specific navigation.
- Preserve real copy, labels, and data shown in the export. Do not replace specific text with generic marketing filler.
- Preserve interactive affordances: hover, focus, pressed, disabled, loading, validation, copy/share, tab/accordion, modal/sheet, and keyboard states where present.
- Preserve accessibility semantics when converting: headings stay hierarchical, controls remain buttons/links/inputs, focus states stay visible.
- Do not keep prototype-only annotations, frame labels, or Open Design chrome in the production UI.

## CJX-ready UX contract
- Use `DESIGN-MANIFEST.json` as the machine-readable map for screens, app modules, OS widgets, landing pages, tokens, interactions, and viewport checks.
- Screen-file-first: when multiple user-facing surfaces exist, implement each HTML screen as its own route/file. Treat `index.html` as a launcher/overview when the manifest marks it that way, not as a combined final UI.
- If `landing.html`, app screens, platform screens, or OS widget files exist, preserve those boundaries in the target app instead of merging them into one page.
- A single self-contained `cv-landing-page.html` is acceptable only when the export truly contains one user-facing screen and its CSS/JS are structured enough to extract tokens, components, states, and behavior.
- If separate `css/` or `js/` files exist, treat them as source of truth for token/component/interactions before porting to React, Vue, SwiftUI, Compose, or another target stack.
- In-app modules/components are product UI blocks inside the app. OS widgets are home-screen/lock-screen/quick-access surfaces outside the app. Do not merge those concepts.

## Color and brand contract
- Use the exported design tokens and product/domain context as the color source of truth.
- Do not introduce warm beige / cream / peach / pink / orange-brown background washes unless they are already explicit brand/reference colors in the export.
- A stylesheet or design/token file was detected; inspect it for canonical color variables before choosing framework theme tokens.

## Implementation sequence for AI coding tools
1. Open `cv-landing-page.html` and `DESIGN-MANIFEST.json`; identify every screen file, launcher/overview file, app module, and interaction before coding.
2. If multiple HTML screens exist, map them to separate routes/surfaces first; do not merge `landing.html`, product app screens, platform screens, or OS widgets into one route.
3. Extract a token table from CSS/root styles and inline styles before building framework components.
4. Build product screens and domain-specific in-app modules from largest layout regions down to controls; avoid starting with isolated atoms that lose spatial intent.
5. Port responsive behavior across the modern viewport matrix and test each semantic breakpoint before cleanup.
6. Port interactions and states, then replace static placeholders only with real app data or functional equivalents.
7. Keep optional landing page and OS widget surfaces as separate surfaces if present.
8. Compare final screenshots against the export at 360×800, 390×844, 430×932, 820×1180, 1024×768, 1366×768, 1440×900, and 1920×1080 before declaring done.

## Entry points
- `cv-landing-page.html`
- `graph-viz.html`

## Styles
- None detected

## Scripts/components
- None detected

## Assets and supporting files
- `accent-test-hero.png`
- `cv-hero-3px.png`
- `cv-hero-shadow.png`
- `cv-hero-textstroke.png`
- `cv-hero.png`
- `desktop-check.png`
- `desktop-fullpage.png`
- `Funel---Funel.gltf`
- `Gear-Cover.gltf`
- `genera-font/Befonts-License.txt`
- `genera-font/Genera-AltLight.ttf`
- `genera-font/Genera-SemiBold.ttf`
- `microbit-flappy-bird.hex`
- `mobile-fullpage.png`
- `mobile-viewport.png`
- `netlify.toml`
- `Part-Studio-1_1_.gltf`
- `Part-Studio-1_2_.gltf`
- `Part-Studio-1_3_.gltf`
- `Part-Studio-1_4_.gltf`
- `Part-Studio-1_5_.gltf`
- `Part-Studio-1_6_.gltf`
- `Part-Studio-1.gltf`
- `plan.md`
- `plugin-source/plan-bold-editorial-cv-for-pol-mart-de-tera-mrupl5eu/open-design.json`
- `plugin-source/plan-bold-editorial-cv-for-pol-mart-de-tera-mrupl5eu/references/provenance.json`
- `plugin-source/plan-bold-editorial-cv-for-pol-mart-de-tera-mrupl5eu/references/source-1-plan.md`
- `plugin-source/plan-bold-editorial-cv-for-pol-mart-de-tera-mrupl5eu/SKILL.md`
- `plugin-source/plan-bold-editorial-cv-for-pol-mart-de-tera-mrxar15s/open-design.json`
- `plugin-source/plan-bold-editorial-cv-for-pol-mart-de-tera-mrxar15s/references/provenance.json`
- `plugin-source/plan-bold-editorial-cv-for-pol-mart-de-tera-mrxar15s/references/source-1-plan.md`
- `plugin-source/plan-bold-editorial-cv-for-pol-mart-de-tera-mrxar15s/references/source-2-source-1-plan.md`
- `plugin-source/plan-bold-editorial-cv-for-pol-mart-de-tera-mrxar15s/references/source-3-SKILL.md`
- `plugin-source/plan-bold-editorial-cv-for-pol-mart-de-tera-mrxar15s/SKILL.md`
- `plugin-source/plan-bold-editorial-cv-for-pol-mart-de-tera-mrz6svlh/open-design.json`
- `plugin-source/plan-bold-editorial-cv-for-pol-mart-de-tera-mrz6svlh/references/provenance.json`
- `plugin-source/plan-bold-editorial-cv-for-pol-mart-de-tera-mrz6svlh/references/source-1-plan.md`
- `plugin-source/plan-bold-editorial-cv-for-pol-mart-de-tera-mrz6svlh/references/source-2-source-1-plan.md`
- `plugin-source/plan-bold-editorial-cv-for-pol-mart-de-tera-mrz6svlh/references/source-3-SKILL.md`
- `plugin-source/plan-bold-editorial-cv-for-pol-mart-de-tera-mrz6svlh/references/source-4-source-3-SKILL.md`
- `plugin-source/plan-bold-editorial-cv-for-pol-mart-de-tera-mrz6svlh/references/source-5-source-2-source-1-plan.md`
- `plugin-source/plan-bold-editorial-cv-for-pol-mart-de-tera-mrz6svlh/references/source-6-source-1-plan.md`
- `plugin-source/plan-bold-editorial-cv-for-pol-mart-de-tera-mrz6svlh/references/source-7-SKILL.md`
- `plugin-source/plan-bold-editorial-cv-for-pol-mart-de-tera-mrz6svlh/SKILL.md`
- `profile.png`
- `python-card-right-title.png`
- `ramsey-font-2/Befonts-License.txt`
- `ramsey-font-2/RamseyTest-Black-BF64069d9d2fa95.otf`
- `ramsey-font-2/RamseyTest-BlackCondensed-BF64069da37f7a2.otf`
- `ramsey-font-2/RamseyTest-BlackCondensedItalic-BF64069d9ad0c68.otf`
- `ramsey-font-2/RamseyTest-BlackExtended-BF64069d9c3dba1.otf`
- `ramsey-font-2/RamseyTest-BlackExtendedItalic-BF64069da4018fc.otf`
- `ramsey-font-2/RamseyTest-BlackItalic-BF64069d9c59d9b.otf`
- `ramsey-font-2/RamseyTest-Bold-BF64069da4425b5.otf`
- `ramsey-font-2/RamseyTest-BoldCondensed-BF64069d9c74786.otf`
- `ramsey-font-2/RamseyTest-BoldCondensedItalic-BF64069d9c9b9f0.otf`
- `ramsey-font-2/RamseyTest-BoldExtended-BF64069d9c45411.otf`
- `ramsey-font-2/RamseyTest-BoldExtendedItalic-BF64069d9cb6248.otf`
- `ramsey-font-2/RamseyTest-BoldItalic-BF64069da4b62d8.otf`
- `ramsey-font-2/RamseyTest-ExtraBold-BF64069d9cd7fa7.otf`
- `ramsey-font-2/RamseyTest-ExtraBoldCondensed-BF64069da4c445e.otf`
- `ramsey-font-2/RamseyTest-ExtraBoldCondensedItalic-BF64069d9cc52d9.otf`
- `ramsey-font-2/RamseyTest-ExtraBoldExtended-BF64069d9ebef7c.otf`
- `ramsey-font-2/RamseyTest-ExtraBoldExtendedItalic-BF64069d9cd9353.otf`
- `ramsey-font-2/RamseyTest-ExtraBoldItalic-BF64069d9d59766.otf`
- `ramsey-font-2/RamseyTest-ExtraLight-BF64069d9c44a2a.otf`
- `ramsey-font-2/RamseyTest-ExtraLightCondensed-BF64069da498e1b.otf`
- `ramsey-font-2/RamseyTest-ExtraLightCondensedItalic-BF64069d9da3ec2.otf`
- `ramsey-font-2/RamseyTest-ExtraLightExtended-BF64069d9f0c658.otf`
- `ramsey-font-2/RamseyTest-ExtraLightExtendedItalic-BF64069d9fb2fc6.otf`
- `ramsey-font-2/RamseyTest-ExtraLightItalic-BF64069d9f64bad.otf`
- `ramsey-font-2/RamseyTest-Light-BF64069d9f56777.otf`
- `ramsey-font-2/RamseyTest-LightCondensed-BF64069d9f5263f.otf`
- `ramsey-font-2/RamseyTest-LightCondensedItalic-BF64069d9f26822.otf`
- `ramsey-font-2/RamseyTest-LightExtended-BF64069d9f7b283.otf`
- `ramsey-font-2/RamseyTest-LightExtendedItalic-BF64069da45e50d.otf`
- `ramsey-font-2/RamseyTest-LightItalic-BF64069d9ff349f.otf`
- `ramsey-font-2/RamseyTest-Medium-BF64069d9fb1410.otf`
- `ramsey-font-2/RamseyTest-MediumCondensed-BF64069da02eec0.otf`
- `ramsey-font-2/RamseyTest-MediumCondensedItalic-BF64069da3760bc.otf`
- `ramsey-font-2/RamseyTest-MediumExtended-BF64069da02acb9.otf`
- `ramsey-font-2/RamseyTest-MediumExtendedItalic-BF64069da50858e.otf`
- `ramsey-font-2/RamseyTest-MediumItalic-BF64069da10ab49.otf`
- `ramsey-font-2/RamseyTest-Regular-BF64069da0dc0d6.otf`
- `ramsey-font-2/RamseyTest-RegularCondensed-BF64069da061f63.otf`
- `ramsey-font-2/RamseyTest-RegularCondensedItalic-BF64069da0ddde1.otf`
- `ramsey-font-2/RamseyTest-RegularExtended-BF64069da542fc9.otf`
- `ramsey-font-2/RamseyTest-RegularExtendedItalic-BF64069da187f1e.otf`
- `ramsey-font-2/RamseyTest-RegularItalic-BF64069da65e00e.otf`
- `ramsey-font-2/RamseyTest-SemiBold-BF64069da3465d1.otf`
- `ramsey-font-2/RamseyTest-SemiBoldCondensed-BF64069da53b0b8.otf`
- `ramsey-font-2/RamseyTest-SemiBoldCondensedItalic-BF64069da640e04.otf`
- `ramsey-font-2/RamseyTest-SemiBoldExtended-BF64069da3eca55.otf`
- `ramsey-font-2/RamseyTest-SemiBoldExtendedItalic-BF64069da2680be.otf`
- `ramsey-font-2/RamseyTest-SemiBoldItalic-BF64069da66c80d.otf`
- `ramsey-font-2/RamseyTest-Thin-BF64069da62ed20.otf`
- `ramsey-font-2/RamseyTest-ThinCondensed-BF64069da6ac88d.otf`
- `ramsey-font-2/RamseyTest-ThinCondensedItalic-BF64069da27a3f5.otf`
- `ramsey-font-2/RamseyTest-ThinExtended-BF64069da6a764e.otf`
- `ramsey-font-2/RamseyTest-ThinExtendedItalic-BF64069da34b0a1.otf`
- `ramsey-font-2/RamseyTest-ThinItalic-BF64069da356fc1.otf`
- `ramsey-font-family-1.zip`
- `ramsey-font-family-2.zip`
- `ramsey-font-family-3.zip`
- `ramsey-font-family.zip`
- `ramsey-font/Befonts-License.txt`
- `ramsey-font/RamseyTest-Black-BF64069d9d2fa95.otf`
- `ramsey-font/RamseyTest-BlackCondensed-BF64069da37f7a2.otf`
- `ramsey-font/RamseyTest-BlackCondensedItalic-BF64069d9ad0c68.otf`
- `ramsey-font/RamseyTest-BlackExtended-BF64069d9c3dba1.otf`
- `ramsey-font/RamseyTest-BlackExtendedItalic-BF64069da4018fc.otf`
- `ramsey-font/RamseyTest-BlackItalic-BF64069d9c59d9b.otf`
- `ramsey-font/RamseyTest-Bold-BF64069da4425b5.otf`
- `ramsey-font/RamseyTest-BoldCondensed-BF64069d9c74786.otf`
- `ramsey-font/RamseyTest-BoldCondensedItalic-BF64069d9c9b9f0.otf`
- `ramsey-font/RamseyTest-BoldExtended-BF64069d9c45411.otf`
- `ramsey-font/RamseyTest-BoldExtendedItalic-BF64069d9cb6248.otf`
- `ramsey-font/RamseyTest-BoldItalic-BF64069da4b62d8.otf`
- `ramsey-font/RamseyTest-ExtraBold-BF64069d9cd7fa7.otf`
- `ramsey-font/RamseyTest-ExtraBoldCondensed-BF64069da4c445e.otf`
- `ramsey-font/RamseyTest-ExtraBoldCondensedItalic-BF64069d9cc52d9.otf`
- `ramsey-font/RamseyTest-ExtraBoldExtended-BF64069d9ebef7c.otf`
- `ramsey-font/RamseyTest-ExtraBoldExtendedItalic-BF64069d9cd9353.otf`
- `ramsey-font/RamseyTest-ExtraBoldItalic-BF64069d9d59766.otf`
- `ramsey-font/RamseyTest-ExtraLight-BF64069d9c44a2a.otf`
- `ramsey-font/RamseyTest-ExtraLightCondensed-BF64069da498e1b.otf`
- `ramsey-font/RamseyTest-ExtraLightCondensedItalic-BF64069d9da3ec2.otf`
- `ramsey-font/RamseyTest-ExtraLightExtended-BF64069d9f0c658.otf`
- `ramsey-font/RamseyTest-ExtraLightExtendedItalic-BF64069d9fb2fc6.otf`
- `ramsey-font/RamseyTest-ExtraLightItalic-BF64069d9f64bad.otf`
- `ramsey-font/RamseyTest-Light-BF64069d9f56777.otf`
- `ramsey-font/RamseyTest-LightCondensed-BF64069d9f5263f.otf`
- `ramsey-font/RamseyTest-LightCondensedItalic-BF64069d9f26822.otf`
- `ramsey-font/RamseyTest-LightExtended-BF64069d9f7b283.otf`
- `ramsey-font/RamseyTest-LightExtendedItalic-BF64069da45e50d.otf`
- `ramsey-font/RamseyTest-LightItalic-BF64069d9ff349f.otf`
- `ramsey-font/RamseyTest-Medium-BF64069d9fb1410.otf`
- `ramsey-font/RamseyTest-MediumCondensed-BF64069da02eec0.otf`
- `ramsey-font/RamseyTest-MediumCondensedItalic-BF64069da3760bc.otf`
- `ramsey-font/RamseyTest-MediumExtended-BF64069da02acb9.otf`
- `ramsey-font/RamseyTest-MediumExtendedItalic-BF64069da50858e.otf`
- `ramsey-font/RamseyTest-MediumItalic-BF64069da10ab49.otf`
- `ramsey-font/RamseyTest-Regular-BF64069da0dc0d6.otf`
- `ramsey-font/RamseyTest-RegularCondensed-BF64069da061f63.otf`
- `ramsey-font/RamseyTest-RegularCondensedItalic-BF64069da0ddde1.otf`
- `ramsey-font/RamseyTest-RegularExtended-BF64069da542fc9.otf`
- `ramsey-font/RamseyTest-RegularExtendedItalic-BF64069da187f1e.otf`
- `ramsey-font/RamseyTest-RegularItalic-BF64069da65e00e.otf`
- `ramsey-font/RamseyTest-SemiBold-BF64069da3465d1.otf`
- `ramsey-font/RamseyTest-SemiBoldCondensed-BF64069da53b0b8.otf`
- `ramsey-font/RamseyTest-SemiBoldCondensedItalic-BF64069da640e04.otf`
- `ramsey-font/RamseyTest-SemiBoldExtended-BF64069da3eca55.otf`
- `ramsey-font/RamseyTest-SemiBoldExtendedItalic-BF64069da2680be.otf`
- `ramsey-font/RamseyTest-SemiBoldItalic-BF64069da66c80d.otf`
- `ramsey-font/RamseyTest-Thin-BF64069da62ed20.otf`
- `ramsey-font/RamseyTest-ThinCondensed-BF64069da6ac88d.otf`
- `ramsey-font/RamseyTest-ThinCondensedItalic-BF64069da27a3f5.otf`
- `ramsey-font/RamseyTest-ThinExtended-BF64069da6a764e.otf`
- `ramsey-font/RamseyTest-ThinExtendedItalic-BF64069da34b0a1.otf`
- `ramsey-font/RamseyTest-ThinItalic-BF64069da356fc1.otf`
- `README.md`
- `Reflector.gltf`
- `round-8-font.zip`
- `round8-four.otf`
- `suissnord-font.zip`
- `suissnord-font/info.txt`
- `suissnord-font/misc/readme.txt`
- `suissnord-font/Suissnord-aJR9.ttf`
- `the-genera-font-family.zip`
- `vercel.json`
- `verify-barlow.png`
- `verify-desktop-nav-dropdown.png`
- `verify-dropdown.png`
- `verify-final-desktop.png`
- `verify-font-3d-full.png`
- `verify-font-3d.png`
- `verify-idle-microbit.png`
- `verify-mobile-nav-open.png`
- `verify-outfit-slow3d.png`
- `verify-round8four.png`
- `verify-screenshot.png`
- `verify-snapshot.txt`
- `verify-syne-revert.png`

## Coding checklist for AI tools
1. Inspect `cv-landing-page.html` and `DESIGN-MANIFEST.json` first and identify reusable components before coding.
2. Implement each user-facing screen file as its own route/surface; keep launcher, landing, app, platform, and OS widget files separate.
3. Extract design tokens into the target stack: colors, type scale, spacing, radius, shadows, and motion.
4. Implement layout with real 2025–2026 responsive breakpoints, fluid type/spacing, and container-query-aware component behavior; test with no horizontal overflow.
5. Preserve interactive controls, hover/focus/pressed states, form behavior, validation, and copy actions where present.
6. Implement domain-specific in-app modules with real states; do not flatten them into generic cards.
7. Keep landing page, product screens, and OS widget/quick-access surfaces separate when present.
8. Confirm the production result visually matches the exported design before refactoring internals.
9. Reject implementation shortcuts that flatten the design into generic cards, generic gradients, placeholder stats, or framework-default typography.
10. If a detail is ambiguous, keep the exported HTML/CSS/JS behavior rather than inventing a new pattern.
