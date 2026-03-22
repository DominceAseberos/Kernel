import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const About = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  const aboutTextRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (aboutRef.current && aboutTextRef.current) {
        const aboutText = new SplitType(aboutTextRef.current, { types: 'lines' });
        
        aboutText.lines?.forEach((line, index) => {
          const originalText = line.innerText;
          
          ScrollTrigger.create({
            trigger: line,
            start: "top 85%",
            onEnter: () => {
              let iteration = 0;
              const chars = "01X_!<>{}[]";
              const interval = setInterval(() => {
                line.innerText = originalText.split('').map((char, i) => {
                  if (i < iteration) return originalText[i];
                  return chars[Math.floor(Math.random() * chars.length)];
                }).join('');
                
                if (iteration >= originalText.length) {
                  clearInterval(interval);
                  line.innerText = originalText;
                }
                iteration += originalText.length / 10;
              }, 30);
            }
          });

          gsap.fromTo(line, 
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: index * 0.1,
              scrollTrigger: {
                trigger: aboutRef.current,
                start: "top 70%",
              }
            }
          );
        });

        // Progress Line
        gsap.fromTo(".manifesto-progress", 
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: "top",
            ease: "none",
            scrollTrigger: {
              trigger: aboutRef.current,
              start: "top 60%",
              end: "bottom 40%",
              scrub: true
            }
          }
        );
      }
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section id="about" ref={aboutRef} className="py-32 md:py-48 px-6 md:px-24 bg-[#05080f] relative z-20 flex">
      <div className="w-1 bg-white/10 mr-8 md:mr-16 relative">
        <div className="manifesto-progress absolute top-0 left-0 w-full h-full bg-[#00ffcc]" />
      </div>
      <div className="max-w-5xl relative z-10">
        <p className="font-mono text-[#00ffcc] text-sm mb-8 tracking-widest uppercase">[ 01. Manifesto ]</p>
        <p ref={aboutTextRef} className="text-3xl md:text-6xl font-serif leading-tight text-white/90">
          We engineer digital experiences that blur the line between art and mathematics. 
          By fusing kinetic typography with high-performance WebGL, we build interfaces 
          that don't just function—they breathe.
        </p>
      </div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-2/3 opacity-20 pointer-events-none grayscale hover:grayscale-0 transition-all duration-700">
        <img src="/assets/images/about-manifesto.png" alt="Manifesto Visual" className="w-full h-full object-contain" />
      </div>
    </section>
  );
};
