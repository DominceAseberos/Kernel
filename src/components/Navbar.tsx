import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const Navbar = () => {
  const [isExecuting, setIsExecuting] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const velocity = Math.abs(self.getVelocity());
          setIsExecuting(velocity > 50);
        }
      });
    });

    return () => {
      ctx.revert();
    };
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = e.currentTarget.getAttribute('href');
    // @ts-ignore
    if (window.lenis && target) {
      // @ts-ignore
      window.lenis.scrollTo(target);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full p-6 md:p-8 flex justify-between items-center z-50 text-white font-mono text-sm pointer-events-none bg-black/20" style={{ backdropFilter: 'none' }}>
      <div className="font-bold text-xl tracking-widest pointer-events-auto cursor-pointer flex items-center gap-2">
        REFOKUS
        <div className={`w-2 h-2 bg-[#00ffcc] rounded-full ${isExecuting ? 'animate-spin' : 'animate-pulse'}`} style={{ transformOrigin: 'center' }}>
          {isExecuting && <div className="w-full h-full border-t border-black rounded-full" />}
        </div>
      </div>
      <div className="hidden md:flex gap-12 pointer-events-auto">
        <a href="#about" onClick={handleScrollTo} data-cursor="focus" className="hover:text-[#00ffcc] transition-colors uppercase tracking-widest">Manifesto</a>
        <a href="#process" onClick={handleScrollTo} data-cursor="focus" className="hover:text-[#00ffcc] transition-colors uppercase tracking-widest">Process</a>
        <a href="#work" onClick={handleScrollTo} data-cursor="focus" className="hover:text-[#00ffcc] transition-colors uppercase tracking-widest">Archive</a>
      </div>
      <div className="flex items-center gap-4 pointer-events-auto">
        <div className="hidden md:flex flex-col text-right text-[10px] text-[#00ffcc] opacity-70">
          <span>STATUS: {isExecuting ? 'EXECUTING' : 'IDLE'}</span>
          <span>MEM: 0x8F2A</span>
        </div>
        <button data-cursor="focus" className="border border-white/30 px-6 py-2 rounded-full hover:bg-white hover:text-black transition-all uppercase tracking-widest text-xs flex items-center gap-2 group">
          Initiate <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </nav>
  );
};
