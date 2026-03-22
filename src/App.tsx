// ─── App.tsx (FINAL FIX) ─────────────────────────────────────────────────────
// Fix: The #hero-trigger entrance animation leaves a transform:matrix on the
// wrapper div. A transform on a parent of position:fixed breaks the pin.
// Solution: Use clearProps:'transform' on complete, OR animate opacity only
// (no y translation) so no transform is ever applied to the wrapper.

import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

import { Navbar } from './components/Navbar';
import { Speedometer } from './components/Speedometer';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Marquee } from './components/sections/Marquee';
import { ProjectSection } from './components/sections/ProjectSection';
import { Stack } from './components/sections/Stack';
import { Testimonials } from './components/sections/Testimonials';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/sections/Footer';

import Preloader from './components/ui/Preloader';
import Cursor from './components/ui/Cursor';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.normalizeScroll(false);

export default function App() {
  const [isBooted, setIsBooted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia('(pointer: coarse)').matches);
  }, []);

  const handleBootComplete = React.useCallback(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // @ts-ignore
    window.lenis = lenis;

    setIsBooted(true);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // ── FIX 2: Animate opacity only — NO y translation ───────────────────
        // The previous version animated y:30→0 which left transform:matrix()
        // on #hero-trigger. Any transform on a parent of a position:fixed
        // child (the pinned Hero section) creates a new containing block
        // and breaks the pin visually.
        // Opacity-only fade has zero transform side effects.
        gsap.fromTo(
          '#hero-trigger',
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
            // Guarantee no transform residue
            clearProps: 'transform,y,x',
          }
        );
      });
    });
  }, []);

  return (
    <div className="bg-[#0a0f1a] min-h-screen text-white font-serif selection:bg-[#00ffcc]/30">
      <Preloader onComplete={handleBootComplete} />
      {!isMobile && <Cursor />}

      {isBooted && (
        <div id="content-mount">
          <Navbar />
          <Speedometer />
          {/* ── NO transform-inducing animations on this wrapper ── */}
          <div id="hero-trigger">
            <Hero />
          </div>
          <About />
          <Marquee />
          <ProjectSection />
          <Testimonials />
          <Stack />
          <Contact />
          <Footer />
        </div>
      )}
    </div>
  );
}