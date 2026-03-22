import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useAudio } from '../../context/AudioProvider';

export const About = () => {
  const { playTick } = useAudio();
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const aboutTextRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (reducedMotion) return;
    const ctx = gsap.context(() => {
      if (!sectionRef.current || !aboutTextRef.current) return;

      const aboutText = new SplitType(aboutTextRef.current, { types: 'lines' });

      aboutText.lines?.forEach((line, index) => {
        const originalText = line.innerText;

        let activeInterval: ReturnType<typeof setInterval> | null = null;

        const runDecipher = () => {
          if (activeInterval) {
            clearInterval(activeInterval);
            activeInterval = null;
          }

          let iteration = 0;
          const chars = '01X_!<>{}[]';

          activeInterval = setInterval(() => {
            line.innerText = originalText
              .split('')
              .map((char, i) => {
                if (i < iteration) return originalText[i];
                return chars[Math.floor(Math.random() * chars.length)];
              })
              .join('');

            if (iteration >= originalText.length) {
              clearInterval(activeInterval!);
              activeInterval = null;
              line.innerText = originalText;
            }
            iteration += originalText.length / 10;
          }, 30);
        };

        const stopDecipher = () => {
          if (activeInterval) {
            clearInterval(activeInterval);
            activeInterval = null;
          }
          line.innerText = originalText;
        };

        ScrollTrigger.create({
          trigger: line,
          start: 'top 85%',
          onEnter: runDecipher,
          onLeaveBack: stopDecipher,
        });

        gsap.fromTo(
          line,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.1,
            scrollTrigger: {
              trigger: line,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      gsap.fromTo(
        '.manifesto-progress',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 40%',
            scrub: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} id="about" className="py-64 bg-[#0a0f1a] relative overflow-hidden z-20">
      <div className="absolute inset-0 blueprint-grid opacity-10" />
      
      <div className="max-w-7xl mx-auto px-8 relative z-10 grid grid-cols-1 md:grid-cols-[1fr_2px_1fr] gap-16 items-start">
        <div className="space-y-12">
          <div className="space-y-4">
            <h2 className="font-mono text-[#00ffcc] text-sm tracking-[0.5em] uppercase">[ SECTION: MANIFESTO ]</h2>
            <h3 className="text-6xl md:text-8xl font-bold tracking-tighter uppercase italic leading-none">
              Engineering<br />Digital<br />Atmospheres.
            </h3>
          </div>
          
          <div className="grid grid-cols-2 gap-8 pt-12 border-t border-white/10">
            <div>
              <p className="font-mono text-[10px] text-white/40 mb-2 whitespace-nowrap">CORE_PRINCIPLE</p>
              <p className="text-sm font-bold tracking-widest uppercase">Kinetic Precision</p>
            </div>
            <div>
              <p className="font-mono text-[10px] text-white/40 mb-2 whitespace-nowrap">MISSION_STATEMENT</p>
              <p className="text-sm font-bold tracking-widest uppercase">Transcending Static UI</p>
            </div>
          </div>
        </div>

        <div className="hidden md:block w-[2px] h-full bg-white/10 relative">
          <div className="manifesto-progress absolute top-0 left-0 w-full bg-[#00ffcc] origin-top shadow-[0_0_15px_rgba(0,255,204,0.5)]" />
        </div>

        <div className="space-y-8">
          <p 
            ref={aboutTextRef}
            className="text-2xl md:text-4xl leading-tight font-serif text-white/90"
          >
            KERNEL IS NOT JUST A STUDIO. IT IS A COMPUTATIONAL DESIGN FACILITY WHERE HIGH-PERFORMANCE CODE MEETS PRISM-GLASS AESTHETICS. WE DO NOT BUILD WEBSITES; WE COMPILE EXPERIENCES THAT VIBRATE AT THE SPEED OF LIGHT.
          </p>
          
          <div className="pt-12">
            <button 
              onMouseEnter={playTick}
              data-cursor="focus" 
              className="font-mono group flex items-center gap-4 text-xs tracking-[0.3em] uppercase text-[#00ffcc] hover:text-white transition-colors"
            >
              [ ACCESS_CORE_SYSTEMS ]
              <div className="w-8 h-[1px] bg-[#00ffcc] group-hover:w-12 transition-all" />
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 w-[50vw] h-[50vh] bg-[#00ffcc]/5 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
};