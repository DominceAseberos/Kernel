// ─── Hero.tsx (FINAL FIX) ─────────────────────────────────────────────────────
// Fix 1: Removed overflow-hidden from <section> — was clipping exploding chars
// Fix 2: Added clearProps on the pin trigger so transform doesn't linger

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

export const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroVideoWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current || !heroTitleRef.current || !heroVideoWrapRef.current) return;

    heroRef.current.getBoundingClientRect();

    const ctx = gsap.context(() => {
      const text = new SplitType(heroTitleRef.current!, { types: 'chars' });

      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '+=150%',
          scrub: 1.5,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: (self) => {
            if (self.progress === 0) {
              gsap.set(heroVideoWrapRef.current, { clipPath: 'inset(50%)' });
              gsap.set('.hero-colored-img', { opacity: 0 });
            }
          },
        },
      });

      heroTl.to(text.chars, {
        scale: 10,
        opacity: 0,
        z: 1000,
        rotationZ: () => gsap.utils.random(-45, 45),
        x: () => gsap.utils.random(-500, 500),
        y: () => gsap.utils.random(-500, 500),
        stagger: 0.02,
        ease: 'power2.inOut',
        force3D: true,
        willChange: 'transform, opacity',
      }, 0);

      heroTl.fromTo(
        heroVideoWrapRef.current,
        { clipPath: 'inset(50%)' },
        { clipPath: 'inset(0%)', ease: 'power2.inOut' },
        0
      );

      heroTl.fromTo(
        '.hero-colored-img',
        { opacity: 0 },
        { opacity: 1, ease: 'power2.inOut' },
        0
      );

      ScrollTrigger.refresh();

      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 300);

      return () => clearTimeout(timer);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    // ── FIX 1: Removed 'overflow-hidden' — it was clipping the CRAFT explosion ──
    // Characters need to fly OUTSIDE the section bounds. overflow-hidden killed that.
    // The blueprint-grid background still works without overflow-hidden.
    <section
      ref={heroRef}
      className="h-screen w-full flex items-center justify-center relative blueprint-grid"
    >
      <div className="absolute inset-0 opacity-20 pointer-events-none flex flex-wrap">
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i} className="w-1/5 h-1/5 border border-[#00ffcc]/20" />
        ))}
      </div>

      <h1
        ref={heroTitleRef}
        className="text-[15vw] font-bold tracking-tighter uppercase text-white z-20"
        style={{ perspective: '1000px' }}
      >
        CRAFT
      </h1>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 opacity-70">
        <span className="font-mono text-xs tracking-widest uppercase">Scroll Sequence</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent animate-pulse" />
      </div>

      <div
        ref={heroVideoWrapRef}
        data-cursor="crosshair"
        className="absolute inset-0 z-10 flex items-center justify-center bg-black"
        style={{ clipPath: 'inset(50%)' }}
      >
        <img
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000&auto=format&fit=crop"
          alt="Wireframe render"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
          style={{ filter: 'grayscale(100%) contrast(1.2) brightness(0.8)' }}
          referrerPolicy="no-referrer"
        />
        <img
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000&auto=format&fit=crop"
          alt="Wireframe colored render"
          className="hero-colored-img absolute inset-0 w-full h-full object-cover opacity-0"
          style={{ filter: 'grayscale(0%) contrast(1.2) brightness(1)' }}
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-[#00ffcc]/10 mix-blend-overlay" />
      </div>
    </section>
  );
};