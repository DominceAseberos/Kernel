import React, { useEffect, useRef } from 'react';
import { ArrowRight, Github, Twitter, Linkedin } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MagneticButton } from '../ui/MagneticButton';

export const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (footerRef.current) {
        gsap.fromTo(".footer-text-fill",
          { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 60%",
              end: "center center",
              scrub: 1,
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
    <footer ref={footerRef} className="bg-[#020408] pt-32 pb-12 px-8 border-t border-[#00ffcc]/20 relative overflow-hidden z-20">
      <div className="absolute inset-0 blueprint-grid opacity-5" />
      
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center mb-32">
        {/* Negative Space Reveal */}
        <div className="relative">
          <h2 className="text-[12vw] font-serif leading-none mb-8 text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>
            LET'S BUILD
          </h2>
          <h2 className="footer-text-fill absolute top-0 left-0 text-[12vw] font-serif leading-none mb-8 text-[#00ffcc]" style={{ clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' }}>
            LET'S BUILD
          </h2>
        </div>
        
        <MagneticButton href="mailto:hello@example.com" className="font-mono text-white text-xl md:text-3xl hover:text-[#00ffcc] transition-colors flex items-center gap-4 group bg-white/5 px-8 py-4 rounded-full border border-white/10 backdrop-blur-md">
          SYSTEM.CONNECT() <ArrowRight className="group-hover:translate-x-2 transition-transform" />
        </MagneticButton>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 font-mono text-xs text-white/40">
        <p>© 2026 REFOKUS. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-[#00ffcc] transition-colors flex items-center gap-2"><Github className="w-4 h-4"/> GITHUB</a>
          <a href="#" className="hover:text-[#00ffcc] transition-colors flex items-center gap-2"><Twitter className="w-4 h-4"/> TWITTER</a>
          <a href="#" className="hover:text-[#00ffcc] transition-colors flex items-center gap-2"><Linkedin className="w-4 h-4"/> LINKEDIN</a>
        </div>
      </div>
    </footer>
  );
};
