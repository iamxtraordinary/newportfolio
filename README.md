# Emmanuel Okaka — Portfolio

A multi-themed personal portfolio built with **React 19**, **TypeScript**, **Vite**, and **Framer Motion**. Features three distinct visual concepts accessible via client-side routing.

## 🎬 Themes

| Route | Page | Description |
|-------|------|-------------|
| `/` | **Cinematic** | Editorial hero with scroll-driven 3D parallax, letter animations, and cinematic project showcases |
| `/projects` | **Bento** | Interactive bento-grid layout with tilt-glare cards showcasing projects and technical stack |
| `/about` | **Brutalist** | Neo-brutalist design with draggable stickers, photo gallery, and a Win95 easter egg |

## ⚙️ Tech Stack

- **Framework:** React 19 + TypeScript 6
- **Bundler:** Vite 8
- **Styling:** Tailwind CSS v4
- **Animation:** Motion (Framer Motion) 12
- **Routing:** React Router DOM 7 (HashRouter)
- **Icons:** Lucide React
- **Fonts:** Self-hosted variable fonts (Oswald, DM Sans, Cormorant Garamond, JetBrains Mono)

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── pages/              # Route-level page components
├── components/
│   ├── cinematic/      # Cinematic page sub-components
│   ├── layout/         # Layout wrappers (PageTransition)
│   ├── nav/            # Floating navigation
│   ├── shared/         # Reusable components (BentoTile, ScrambleText, etc.)
│   └── ui/             # Scroll-driven UI components
├── data/               # Typed data modules (projects, skills, contacts, etc.)
├── hooks/              # Custom React hooks (useTilt, useMediaQuery)
└── lib/                # Utility functions (cn)
```

## 🎨 Design System

- **Palette:** Midnight Steel — `#0D1B2A` (bg), `#E0E1DD` (text), `#778DA9` (accent)
- **Typography:** 4-font system with display, body, serif, and monospace families
- **Animations:** Custom easing curves, reduced-motion support, spring physics

## 📄 License

MIT
