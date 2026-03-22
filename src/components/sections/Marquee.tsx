// ─── Marquee.tsx (FIXED) ─────────────────────────────────────────────────────
// Fix: onUpdate was always accelerating the marquee but never resetting speed
// to 1 when scroll stops or reverses. During Hero reverse scrub, the marquee
// velocity from the previous forward scroll was still applied, adding
// unnecessary RAF work. Added onLeave/onLeaveBack to reset timeScale to 1.

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAudio } from '../../context/AudioProvider';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const Marquee = () => {
  const reducedMotion = useReducedMotion();
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeInnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion) return;
    const ctx = gsap.context(() => {
      if (!marqueeRef.current || !marqueeInnerRef.current) return;

      const tween = gsap.to(marqueeInnerRef.current, {
        xPercent: -50,
        ease: 'none',
        duration: 15,
        repeat: -1,
      });

      ScrollTrigger.create({
        trigger: marqueeRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const velocity = Math.abs(self.getVelocity());
          const marqueeSpeed = 1 + velocity / 200;
          gsap.to(tween, { timeScale: marqueeSpeed, duration: 0.2 });
        },
        // FIX: Reset speed to 1 when section leaves viewport in either direction
        // Without this, max velocity from forward scroll stays locked in and
        // adds frame work during Hero's reverse scrub
        onLeave: () => {
          gsap.to(tween, { timeScale: 1, duration: 0.5 });
        },
        onLeaveBack: () => {
          gsap.to(tween, { timeScale: 1, duration: 0.5 });
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={marqueeRef}
      className="py-32 overflow-hidden bg-[#05080f] relative border-y border-[#00ffcc]/20 z-20"
    >
      <h2 className="sr-only">Our Core Process</h2>
      <div className="absolute inset-0 blueprint-grid opacity-10" />

      <div className="relative z-10 flex flex-col gap-8">
        <div className="flex whitespace-nowrap" ref={marqueeInnerRef}>
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 px-4">
              <span
                className="text-6xl md:text-8xl font-mono text-transparent"
                style={{ WebkitTextStroke: '1px #00ffcc' }}
              >
                {'{ INIT_SEQUENCE }'}
              </span>
              <span className="text-6xl md:text-8xl font-serif italic text-white/50">
                SYS.RENDER
              </span>
              <span className="text-6xl md:text-8xl font-mono text-[#00ffcc]">
                [0x8F2A]
              </span>
            </div>
          ))}
        </div>
      </div>

      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-80 bg-white/5 border border-[#00ffcc]/30 rounded-xl overflow-hidden z-20 hidden md:block"
        style={{ backdropFilter: 'blur(5px) saturate(200%)' }}
      >
        <img
          src="/assets/images/module-a.png"
          alt="Module A"
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-screen"
        />
        <div className="absolute bottom-4 left-4 font-mono text-xs text-[#00ffcc] bg-black/80 px-2 py-1 rounded">
          MODULE_A.tsx
        </div>
      </div>
      <div
        className="absolute top-1/3 right-1/4 -translate-y-1/2 w-48 h-64 bg-white/5 border border-[#00ffcc]/30 rounded-xl overflow-hidden z-20 hidden md:block"
        style={{ backdropFilter: 'blur(5px) saturate(200%)' }}
      >
        <img
          src="/assets/images/module-b.png"
          alt="Module B"
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-screen"
        />
        <div className="absolute bottom-4 left-4 font-mono text-xs text-[#00ffcc] bg-black/80 px-2 py-1 rounded">
          CORE_LOGIC.ts
        </div>
      </div>
    </section>
  );
};