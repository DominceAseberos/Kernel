import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

export const NotFound = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Glitch animation for the main title
      gsap.to(".glitch-text", {
        skewX: () => gsap.utils.random(-20, 20),
        x: () => gsap.utils.random(-10, 10),
        duration: 0.1,
        repeat: -1,
        repeatRefresh: true,
        ease: "none"
      });

      // Background static noise
      gsap.to(".bg-static", {
        opacity: () => gsap.utils.random(0.05, 0.15),
        duration: 0.05,
        repeat: -1,
        repeatRefresh: true
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#0a0f1a] flex flex-col items-center justify-center relative overflow-hidden font-mono select-none">
      {/* Visual Degradation Layers */}
      <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,255,204,0.05)_50%)] bg-[length:100%_4px] pointer-events-none z-10" />
      <div className="bg-static absolute inset-0 bg-white/5 opacity-10 pointer-events-none" />
      <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />
      
      <div className="relative z-20 flex flex-col items-center text-center px-6">
        <div className="mb-12">
            <span className="text-xs text-[#00ffcc] tracking-[0.5em] opacity-40 uppercase mb-4 block animate-pulse">
                [ ERROR_CODE: 404 // SESSION_TIMED_OUT ]
            </span>
            <h1 className="glitch-text text-7xl md:text-9xl font-bold text-white tracking-tighter uppercase italic">
                SIGNAL_LOST
            </h1>
        </div>

        <p className="max-w-md text-sm text-white/40 mb-12 uppercase leading-relaxed tracking-widest">
            The requested terminal node is unreachable or has been purged from the core database.
            Please re-establish a secure connection to the main grid.
        </p>

        <button 
          onClick={() => navigate('/')}
          className="group relative px-12 py-4 bg-white/5 border border-[#00ffcc]/30 rounded-full hover:border-[#00ffcc] transition-all duration-500 overflow-hidden"
        >
          <div className="absolute inset-0 bg-[#00ffcc]/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          <span className="relative z-10 text-xs text-[#00ffcc] tracking-[0.3em] font-bold uppercase group-hover:text-black transition-colors">
            RE-ESTABLISH_CONNECTION
          </span>
        </button>
      </div>

      {/* Decorative corners */}
      <div className="absolute top-8 left-8 w-12 h-12 border-t border-l border-[#00ffcc]/20" />
      <div className="absolute top-8 right-8 w-12 h-12 border-t border-r border-[#00ffcc]/20" />
      <div className="absolute bottom-8 left-8 w-12 h-12 border-b border-l border-[#00ffcc]/20" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-b border-r border-[#00ffcc]/20" />
    </div>
  );
};
