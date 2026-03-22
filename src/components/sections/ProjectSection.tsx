// ─── ProjectSection.tsx (FIXED) ──────────────────────────────────────────────
// Fix 1: Added pinSpacing and invalidateOnRefresh — missing from original,
//        causes pin conflict with Hero when scrolling in reverse
// Fix 2: Removed overflow-hidden from <section> — breaks position:fixed pin
//        same issue that was killing Hero's pin
// Fix 3: Added scrub: 1 (smoothed) instead of scrub: true (instant) —
//        instant scrub on two simultaneous pins causes frame starvation

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useAudio } from '../../context/AudioProvider';

export const ProjectSection = () => {
  const { playTick } = useAudio();
  const reducedMotion = useReducedMotion();
  const projectSectionRef = useRef<HTMLDivElement>(null);
  const projectCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion) return;
    const ctx = gsap.context(() => {
      if (!projectSectionRef.current || !projectCardRef.current) return;

      const projectTl = gsap.timeline({
        scrollTrigger: {
          trigger: projectSectionRef.current,
          start: 'top top',
          end: '+=200%',
          scrub: 1,               // FIX 3: smoothed scrub, not instant
          pin: true,
          pinSpacing: true,       // FIX 1a: was missing — GSAP needs this to
          // correctly calculate scroll distances between pins
          anticipatePin: 1,
          invalidateOnRefresh: true, // FIX 1b: recalculates on ST.refresh()
        },
      });

      projectTl.to(projectCardRef.current, {
        width: '100vw',
        height: '100vh',
        borderRadius: '0px',
        ease: 'power2.inOut',
      }, 0);

      projectTl.to('.project-flash', { opacity: 1, duration: 0.05, ease: 'none' }, 0.9);
      projectTl.to('.project-flash', { opacity: 0, duration: 0.05, ease: 'none' }, 0.95);
      projectTl.to('.project-img-wireframe', { opacity: 0, duration: 0.01 }, 0.92);
      projectTl.to('.project-img-hd', { opacity: 1, duration: 0.01 }, 0.92);

      projectTl.fromTo(
        '.project-info',
        { y: 50 },
        { y: -20, ease: 'power2.inOut' },
        0
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    // FIX 2: Removed overflow-hidden — breaks position:fixed used by GSAP pin
    // The card itself still has overflow-hidden for its internal image clipping
    <section
      id="work"
      ref={projectSectionRef}
      className="h-screen w-full flex items-center justify-center relative bg-[#0a0f1a] z-20"
    >
      <div className="absolute inset-0 blueprint-grid opacity-20" />

      <div className="absolute inset-0 grid grid-cols-3 md:grid-cols-5 gap-4 p-4 opacity-30">
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className="w-full h-full bg-white/5 rounded-xl border border-white/10" />
        ))}
      </div>

      <div
        ref={projectCardRef}
        onMouseEnter={() => {
            playTick();
            gsap.to(projectCardRef.current, { scale: 1.02, duration: 0.4 });
        }}
        onMouseLeave={() => {
            gsap.to(projectCardRef.current, { scale: 1, duration: 0.4 });
        }}
        data-cursor="crosshair"
        className="relative w-[300px] h-[400px] rounded-[24px] overflow-hidden z-20 border border-[#00ffcc]/50 shadow-[0_0_30px_rgba(0,255,204,0.2)] bg-black"
      >
        <img
          src="/assets/images/project-neural-wire.png"
          alt="Project Wireframe"
          className="project-img-wireframe absolute inset-0 w-full h-full object-cover opacity-80"
          style={{ filter: 'contrast(1.2) saturate(0) sepia(1) hue-rotate(130deg) brightness(0.8)' }}
        />
        <img
          src="/assets/images/project-neural-hd.png"
          alt="Project HD"
          className="project-img-hd absolute inset-0 w-full h-full object-cover opacity-0"
        />
        <div className="project-flash absolute inset-0 bg-white opacity-0 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a] via-transparent to-transparent z-10" />
        <div className="project-info absolute bottom-8 left-8 right-8 flex justify-between items-end z-20">
          <div>
            <p className="font-mono text-[#00ffcc] text-sm mb-2">PROJECT_01</p>
            <h2 className="text-4xl md:text-6xl font-bold">NEURAL_NET</h2>
          </div>
          <div className="font-mono text-xs text-white/50 text-right">
            <p>STATUS: ACTIVE</p>
            <p>RENDER: 100%</p>
          </div>
        </div>
      </div>
    </section>
  );
};