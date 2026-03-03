<div align="center">

<h1>ABYSSAL X-1</h1>
<p><strong>A cinematic, scroll-driven 3D product experience for an underwater drone.</strong></p>

[![Next.js](https://img.shields.io/badge/Next.js-15.1-black?logo=next.js)](https://nextjs.org)
[![Three.js](https://img.shields.io/badge/Three.js-0.173-black?logo=three.js)](https://threejs.org)
[![React Three Fiber](https://img.shields.io/badge/R3F-9.0-blueviolet)](https://docs.pmnd.rs/react-three-fiber)
[![GSAP](https://img.shields.io/badge/GSAP-3.12-88CE02?logo=greensock)](https://gsap.com)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38BDF8?logo=tailwindcss)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org)

<br />

![Abyssal Hero](https://github.com/Sidspidy/abyssal-experience/raw/main/public/next.svg)

> A premium product landing page that takes the viewer from the sky surface down to 1000m depth through a fully animated 3D environment. The drone reacts to every scroll. No libraries were faked — every visual effect is real-time.

</div>

---

## ✨ Features

- **Scroll-driven 3D drone animation** — GSAP `ScrollTrigger` scrubs a timeline that moves, rotates, and scales a real GLB model through 6 distinct cinematic poses.
- **Section-aware choreography** — each content section has a designated "clear zone"; the drone parks in the open half to never overlap text.
- **Cinematic post-processing** — Bloom, Noise via `@react-three/postprocessing` (Effect Composer).
- **Atmospheric 3D environment** — Procedural beach, seabed, marine life silhouettes, and atmospheric lighting react to scroll depth.
- **Amber depth HUD** — fixed depth gauge reads 0 → 1000m as you scroll; amber colour ensures readability on every background.
- **Premium glass-morphism UI** — section cards with backdrop blur, cyan accent borders, section watermarks, spec grids, and progress bars.
- **Fully reversible animation** — GSAP `scrub` auto-reverses all motion on scroll-up; no extra code.
- **SSR-safe** — Three.js canvas is dynamically imported with `ssr: false`.

---

## 🏗️ Architecture

```
abyssal/
├── public/
│   └── drone.glb              # Draco-compressed drone model (~38 MB)
│
└── src/
    ├── app/
    │   ├── globals.css         # Design tokens, all custom CSS classes
    │   ├── layout.tsx
    │   └── page.tsx            # Root: Scene (fixed 3D) + Overlay (scrollable HTML)
    │
    └── components/
        ├── canvas/
        │   ├── Scene.tsx           # Canvas setup, lights, post-processing
        │   ├── Drone.tsx           # GLB model + GSAP scroll choreography
        │   ├── EnvironmentEffects.tsx
        │   ├── AtmosphericLights.tsx
        │   ├── Beach.tsx
        │   ├── Seabed.tsx
        │   └── MarineLife.tsx
        │
        └── ui/
            ├── Overlay.tsx         # All 6 scroll sections + HUD
            ├── HeroSection.tsx     # Above-fold hero with GSAP intro animation
            ├── Header.tsx          # Fixed nav with scroll-aware background
            └── LoadingScreen.tsx
```

### Layering model

```
┌─────────────────────────────────────┐  z-index: 10  (pointer-events: auto)
│          Overlay / HUD              │  Scrollable HTML + fixed UI
├─────────────────────────────────────┤  z-index: 0
│          Scene (Canvas)             │  Fixed, full-screen WebGL
└─────────────────────────────────────┘
```

The canvas is **fixed** and never scrolls. The HTML overlay sits on top and **is** the scroll container. `#main-scroll-container` is the GSAP `ScrollTrigger` target.

---

## 🎬 Scroll Choreography

| Section | Drone Position | Angle | Screen Side |
|---|---|---|---|
| **Hero** | `(-3.5, 0.8, 0)` | Top-down `x=65°` | LEFT |
| **The Shallows** (0–50m) | `(4.0, 0.2, 2.0)` | Side silhouette `x=0°` | RIGHT |
| **Engineering Perfection** (50–200m) | `(-4.0, 0.2, 2.0)` | Left-side `y=90°` | LEFT |
| **Into the Void** (200–500m) | `(0, -0.5, 3.5)` | Nose-dive `x=30°, y=180°` | CENTER |
| **Built for Impossible** (500–1000m+) | `(-1.0, -3.5, 5.5)` | Low-angle `x=-15°, y=225°` | CENTER-LEFT |
| **Pre-Order** | `(2.0, -1.8, 2.5)` | 3/4 front `y=135°` | RIGHT |

> Card layout always places content on the **opposite side** to the drone, giving the model a natural open stage.

The GSAP timeline uses sequential `to()` tweens (not `fromTo`) so initial values are set exclusively via `gsap.set()` — this prevents the "big drone on first load" flash that `fromTo()` causes by immediately rendering all `from` states.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| 3D Engine | Three.js 0.173 + React Three Fiber 9 |
| 3D Helpers | `@react-three/drei` (GLTFLoader, Float, Center, Environment) |
| Post-processing | `@react-three/postprocessing` (Bloom, Noise) |
| Animation | GSAP 3.12 + ScrollTrigger + `@gsap/react` |
| Styling | Tailwind CSS 4 + Vanilla CSS (custom design tokens) |
| Language | TypeScript 5 |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
# Clone the repository
git clone https://github.com/Sidspidy/abyssal-experience.git
cd abyssal-experience

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> **Note:** The drone model (`public/drone.glb`) is tracked in the repository. No additional asset download is needed.

### Build & Deploy

```bash
# Production build
npm run build

# Start production server
npm start
```

Deploy to [Vercel](https://vercel.com) with zero configuration — the project uses Next.js App Router with no server-side dependencies.

---

## 🔑 Key Implementation Notes

### Why `gsap.set()` before the timeline
GSAP's `fromTo()` immediately renders every `from` state the moment the tween is added to a timeline. In a multi-tween timeline the **last** call wins, leaving the 3D object in the wrong pose on first load. The solution: use `gsap.set()` once to lock all initial values, then use `to()` exclusively so the timeline only drives forward/backward motion.

```ts
// Lock initial state BEFORE timeline creation
gsap.set(droneRef.current.position, { x: -3.5, y: 0.8, z: 0.0 })
gsap.set(droneRef.current.scale,    { x: 1.0,  y: 1.0, z: 1.0  })

// Then drive with to() — reads current state as the from value
tl.to(droneRef.current.position, { x: 4.0, ... })
```

### Why the depth gauge is amber
The site background transitions from bright sky blue (`#5b9fc9`) to pitch black (`#020612`). `cyan-400` — the Three.js accent colour — becomes invisible in the shallow sections. Amber (`#f59e0b`) reads clearly on every depth.

### Canvas rendering settings
```ts
gl={{ powerPreference: 'high-performance', alpha: false, antialias: false }}
dpr={[1, 1.5]}
```
`antialias: false` + capped DPR reduce GPU load since Bloom post-processing already smooths aliasing.

---

## 📁 CSS Design System

All tokens live in `globals.css`. Key classes:

| Class | Purpose |
|---|---|
| `.full-card` | Wide glass panel with top-line accent and backdrop blur |
| `.section-card` | Narrow content card with left cyan border |
| `.depth-badge` | Amber pill with glowing dot — used for depth/availability labels |
| `.spec-grid` | 2×2 metric grid inside cards |
| `.progress-track / .progress-fill` | Animated spec comparison bars |
| `.feature-row` | Feature list item with cyan dot and separator line |
| `.hud-depth-value` | Amber monospace depth counter |
| `.section-watermark` | Oversized muted background section number |

---

## 📄 License

MIT © 2026 ABYSSAL
