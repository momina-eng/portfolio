# Momina Parsa — Portfolio

Premium interactive developer portfolio.

## Phase 0 status

Baseline foundation only. Design system, sections, motion, and 3D are intentionally not implemented yet.

### Stack

- React 19 + TypeScript
- Vite 8
- Plain CSS with design-token placeholders (`src/styles/tokens.css`)

### Planned later (not installed yet)

- Framer Motion (primary UI motion)
- Three.js + React Three Fiber + Drei (isolated scenes under `src/scenes`)
- Optional Tailwind (can wrap the same tokens in Phase 1)

### Content

Portfolio facts live in `src/content/*`, sourced from `docs/cv/Momina_Parsa_Resume.pdf`.
Design reference video: `docs/reference/design-reference.mp4`.

### Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
```

### Structure (high level)

```
src/
  content/     # CV-backed data modules
  styles/      # tokens + global CSS
  sections/    # page sections (later phases)
  components/  # layout + UI primitives
  scenes/      # isolated lazy-loaded 3D scenes
  motion/      # shared motion helpers / presets
  assets/      # fonts, icons, 3D, textures, etc.
docs/
  cv/          # source CV
  reference/   # design reference media
```
