import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { useAudio } from '../../context/AudioProvider';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const Hero = () => {
  const reducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroVideoWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion) return;
    if (!heroRef.current) return;
    heroRef.current.getBoundingClientRect();

    const mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 769px)",
      isMobile: "(max-width: 768px)",
    }, (context) => {
      const { isMobile } = context.conditions!;
      const spread = isMobile ? 200 : 500;
      const scrollEnd = isMobile ? '+=100%' : '+=150%';

      const text = new SplitType(heroTitleRef.current!, { types: 'chars' });

      // ── FIX: Pre-set all chars to their final "exploded" state values ────────
      const charData = text.chars!.map(() => ({
        x: gsap.utils.random(-spread, spread),
        y: gsap.utils.random(-spread, spread),
        rotationZ: gsap.utils.random(-45, 45),
      }));

      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: scrollEnd,
          scrub: 0.5,              // slightly higher scrub = smoother reverse
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

      // Animate each char individually with pre-calculated values
      text.chars!.forEach((char, i) => {
        heroTl.to(char, {
          scale: isMobile ? 5 : 10,
          opacity: 0,
          rotationZ: charData[i].rotationZ,
          x: charData[i].x,
          y: charData[i].y,
          ease: 'power2.inOut',
        }, i * 0.03);
      });

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
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="h-screen w-full flex items-center justify-center relative blueprint-grid px-4"
    >
      <div className="absolute inset-0 opacity-20 pointer-events-none flex flex-wrap">
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i} className="w-1/5 h-1/5 border border-[#00ffcc]/20" />
        ))}
      </div>

      <h1
        ref={heroTitleRef}
        className="text-[22vw] md:text-[15vw] font-bold tracking-tighter uppercase text-white z-20"

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
          src="/assets/images/hero-wire.png"
          alt="Wireframe render"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
          style={{ filter: 'grayscale(100%) contrast(1.2) brightness(0.8)' }}
        />
        <img
          src="/assets/images/hero-hd.png"
          alt="Wireframe colored render"
          className="hero-colored-img absolute inset-0 w-full h-full object-cover opacity-0"
          style={{ filter: 'grayscale(0%) contrast(1.2) brightness(1)' }}
        />
        <div className="absolute inset-0 bg-[#00ffcc]/10 mix-blend-overlay" />
      </div>
    </section>
  );
};