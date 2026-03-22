import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const TESTIMONIALS = [
  {
    id: "LOG_01",
    sender: "ARCHITECH",
    timestamp: "2026-03-22T16:20:01Z",
    text: "THE ARCHITECTURAL DEPTH IN THEIR MOTION SYSTEMS IS UNMATCHED. A MASTERCLASS IN KINETIC DESIGN."
  },
  {
    id: "LOG_02",
    sender: "GLASSCORP",
    timestamp: "2026-03-22T16:20:15Z",
    text: "REFOKUS DIDN'T JUST BUILD A SITE; THEY BUILT A DIGITAL ATMOSPHERE. THE GLASSMORPHISM IS BEYOND STATE-OF-THE-ART."
  },
  {
    id: "LOG_03",
    sender: "NEURAL_STREAM",
    timestamp: "2026-03-22T16:20:30Z",
    text: "KINETIC CHOREOGRAPHY THAT FEELS ALIVE. HIGH PERFORMANCE AT ITS CORE. THE NEURAL NET INTEGRATION IS SEAMLESS."
  }
];

const LOGOS = [
  "/assets/images/logo-architech.png",
  "/assets/images/logo-glasscorp.png",
  "/assets/images/logo-neuralstream.png",
  "/assets/images/logo-prism.png"
];

export const Testimonials = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pinning the testimonials section to reveal logs
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=150%",
        pin: true,
        scrub: true,
      });

      // Animating the entries one by one
      gsap.from(".transmission-entry", {
        opacity: 0,
        x: -20,
        stagger: 0.5,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 40%",
          end: "bottom bottom",
          scrub: true,
        }
      });

      // Horizontal Logo Infinity Scroll
      const totalWidth = trackRef.current?.scrollWidth || 0;
      gsap.to(trackRef.current, {
        x: -totalWidth / 2,
        duration: 20,
        ease: "none",
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="min-h-screen bg-[#0a0f1a] relative flex flex-col items-center justify-center py-24 overflow-hidden z-20">
      <div className="absolute inset-0 blueprint-grid opacity-10" />
      
      {/* Terminal Title */}
      <div className="max-w-4xl w-full px-6 mb-12">
        <div className="flex items-center gap-4 mb-8 opacity-40">
            <div className="w-2 h-2 rounded-full bg-[#00ffcc] animate-pulse" />
            <span className="font-mono text-xs tracking-widest text-[#00ffcc]">SYS.LOG // EXTERNAL_TRANSMISSIONS</span>
        </div>

        {/* Transmission Log */}
        <div className="space-y-8">
          {TESTIMONIALS.map((log) => (
            <div key={log.id} className="transmission-entry font-mono border-l border-[#00ffcc]/30 pl-6 relative">
              <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-[#00ffcc] to-transparent" />
              <div className="flex justify-between items-center mb-2 opacity-60">
                <span className="text-[10px] text-[#00ffcc]">{log.id} // FROM: {log.sender}</span>
                <span className="text-[10px]">{log.timestamp}</span>
              </div>
              <p className="text-xl md:text-3xl font-bold text-white/90 leading-tight uppercase tracking-tight">
                {log.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Logo Rail */}
      <div className="w-full border-y border-white/5 bg-white/[0.02] py-12 relative overflow-hidden backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f1a] via-transparent to-[#0a0f1a] z-10" />
        <div ref={trackRef} className="flex gap-24 whitespace-nowrap px-12">
          {[...LOGOS, ...LOGOS].map((logo, i) => (
            <img 
              key={i} 
              src={logo} 
              alt="Client Logo" 
              className="h-12 md:h-20 w-auto grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-cell"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
