import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight, Github, Twitter, Linkedin } from 'lucide-react';
import { MagneticButton } from '../ui/MagneticButton';
import { useAudio } from '../../context/AudioProvider';

export const Footer = () => {
  const { playTick } = useAudio();
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".footer-content > *", {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 1,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-[#05080f] py-32 px-8 relative overflow-hidden border-t border-white/5 z-20">
      <div className="absolute inset-0 blueprint-grid opacity-5" />
      
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-16 relative z-10">
        <div className="footer-content space-y-4">
          <h2 className="text-6xl md:text-9xl font-bold tracking-tighter opacity-10">KERNEL</h2>
          <p className="font-mono text-[10px] md:text-xs text-[#00ffcc] opacity-60 tracking-widest uppercase mb-4">[ READY_FOR_DEPLOYMENT ]</p>
        </div>
        
        <MagneticButton 
          href="mailto:consult@kernel.io" 
          className="px-8 md:px-12 py-4 md:py-5 bg-[#00ffcc] text-black font-bold rounded-full text-base md:text-lg tracking-[0.2em] md:tracking-widest shadow-[0_10px_40px_rgba(0,255,204,0.3)]"
        >
          START_CONSULTATION
        </MagneticButton>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 font-mono text-[9px] md:text-xs text-white/40 mt-24 md:mt-32">
        <p>© 2026 KERNEL. ALL RIGHTS RESERVED.</p>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-6 md:mt-0">
          <a 
            href="#" 
            onMouseEnter={playTick}
            className="hover:text-[#00ffcc] transition-colors flex items-center gap-2"
          >
            <Github className="w-3.5 h-3.5 md:w-4 md:h-4"/> GITHUB
          </a>
          <a 
            href="#" 
            onMouseEnter={playTick}
            className="hover:text-[#00ffcc] transition-colors flex items-center gap-2"
          >
            <Twitter className="w-3.5 h-3.5 md:w-4 md:h-4"/> X_CORP
          </a>
          <a 
            href="#" 
            onMouseEnter={playTick}
            className="hover:text-[#00ffcc] transition-colors flex items-center gap-2"
          >
            <Linkedin className="w-3.5 h-3.5 md:w-4 md:h-4"/> LINKEDIN
          </a>
        </div>
      </div>

      {/* Background Glow */}
      <div className="absolute -bottom-1/2 left-1/2 -translate-x-1/2 w-full h-full bg-[#00ffcc]/5 blur-[120px] rounded-full pointer-events-none" />
    </footer>
  );
};
