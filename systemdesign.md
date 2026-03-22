# KERNEL System Design

## ◈ Project Identity

**KERNEL** is a high-end digital manifestation of the "Prism & Glass" aesthetic. It is designed as a sophisticated React-baed framework for immersive, scroll-driven storytelling, blending technical precision with cinematic fluid motion.

---

## ◈ Design System

### Typography
The typography is a dialogue between classical elegance and technical rigor.
- **Serif**: `Playfair Display` — Used for headings and primary narrative elements to provide a timeless, high-fashion feel.
- **Mono**: `JetBrains Mono` — Used for system logs, technical metadata, and UI labels to reinforce the "Kernel OS" terminal aesthetic.

### Color Palette
A deep, atmospheric foundation with high-contrast neon highlights.
- **Navy** (`#0a0f1a`): The void. A deep, saturated background that provides infinite depth.
- **Neon Cyan** (`#00ffcc`): The pulse. A vibrant, glowing signature color used for data tracks, UI accents, and interactive elements.
- **Translucent Layers**: Utilizing varying opacities of Cyan and White to create "Glassmorphism" effects.

### Spacing & Grid
- **Blueprint Grid**: A strict `40px x 40px` architectural grid underpins the entire experience, visible during the boot sequence and as a subtle backdrop to section transitions.
- **Modular Geometry**: Layouts are composed of technical schematics and wireframe visualizations, maintaining a "work-in-progress" technical blueprint feel.

---

## ◈ Technology Stack

### Core Architecture
- **Framework**: React 19 (Latest stable, utilizing advanced hooks and concurrent features).
- **Build Tool**: Vite 6 (For near-instant HMR and optimized production bundles).
- **Language**: TypeScript 5.8 (Strict type safety across the entire animation pipeline).

### Motion & Orchestration
- **GSAP 3.14**: The primary engine for scroll-triggered orchestration and complex timeline management.
- **Lenis**: High-performance smooth scrolling engine, synchronized with GSAP's ticker.
- **Framer Motion**: Used for declarative micro-interactions and component-level transitions.
- **SplitType**: For granular, character-level text animations.

### Styling & UI
- **Tailwind CSS 4**: A utility-first approach for rapid, responsive design with a custom theme configuration for the KERNEL design tokens.
- **Lucide React**: A minimalist icon set for technical UI elements.

---

## ◈ Core Modules

### 1. Boot Sequence (Preloader)
A terminal-style initialization sequence that simulates a system boot (`KERNEL_OS v2.1`). It builds anticipation and establishes the technical tone before the main content is revealed.

### 2. Custom Interaction System
- **Precision Cursor**: A multi-layered custom cursor (dot + ring) that interacts with the UI, providing tactile feedback.
- **Audio-Active UI**: Real-time synchronization between scroll velocity and ambient "hum" audio, creating an immersive sensory loop.

### 3. Glass & Prism Assets
A curated set of 3D renders and wireframe schematics that bridge the gap between abstract metadata and high-end architectural design.

---
*KERNEL | Designed for the next generation of digital excellence.*
