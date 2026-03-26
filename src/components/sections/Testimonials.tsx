import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAudio } from '../../context/AudioProvider';

const TESTIMONIALS = [
  {
    id: 1,
    text: "KERNEL DIDN'T JUST BUILD A SITE; THEY COMPILED A DIGITAL ATMOSPHERE. THE PRECISION IS UNREAL.",
    author: "ELON_M",
    role: "FOUNDER @ X_CORP"
  },
  {
    id: 2,
    text: "THE FASTEST DEVELOPMENT CYCLE WE'VE EVER SEEN. THE 'PRISM' STYLE IS THE NEW STANDARD.",
    author: "SAM_A",
    role: "CEO @ OPEN_SYS"
  },
  {
    id: 3,
    text: "A MASTERCLASS IN KINETIC DESIGN. KERNEL IS OPERATING ON A DIFFERENT FREQUENCY.",
    author: "JENSEN_H",
    role: "ENGINEERING @ NEURAL_NET"
  }
];

const LOGOS = [
  "/assets/images/logo-architech.png",
  "/assets/images/logo-glasscorp.png",
  "/assets/images/logo-neuralstream.png",
  "/assets/images/logo-prism.png"
];

export const Testimonials = () => {
  const { playTick } = useAudio();
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Transmission text animation
      gsap.from(".transmission-line", {
        opacity: 0,
        x: -20,
        stagger: 0.2,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      });

      // Infinite logo scroll
      if (trackRef.current) {
        gsap.to(trackRef.current, {
          xPercent: -50,
          duration: 20,
          repeat: -1,
          ease: "none"
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="testimonials" className="py-24 md:py-64 bg-[#0a0f1a] relative overflow-hidden z-20">
      <h2 className="sr-only">Client Testimonials</h2>
      <div className="absolute inset-0 blueprint-grid opacity-10" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="font-mono text-[10px] text-[#00ffcc] mb-8 md:mb-12 flex items-center gap-4">
          <span className="w-2 h-2 bg-[#00ffcc] rounded-full animate-pulse" />
          TRANSMISSION_LOG_v4.0
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="transmission-line border-l border-[#00ffcc]/30 pl-6 md:pl-8 py-4 bg-white/2 hover:bg-[#00ffcc]/5 transition-colors group cursor-crosshair">
              <p className="text-lg md:text-2xl font-serif italic text-white/90 mb-6 md:mb-8 leading-tight group-hover:text-white transition-colors">
                "{t.text}"
              </p>
              <div>
                <p className="font-mono text-[#00ffcc] text-[10px] md:text-xs font-bold">{t.author}</p>
                <p className="font-mono text-white/40 text-[9px] md:text-[10px] uppercase tracking-widest">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Infinite Logo Rail */}
      <div className="mt-24 md:mt-48 relative py-8 md:py-12 border-y border-white/5 bg-white/2 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f1a] via-transparent to-[#0a0f1a] z-10" />
        <div ref={trackRef} className="flex gap-12 md:gap-24 whitespace-nowrap px-6 md:px-12">
          {[...LOGOS, ...LOGOS].map((logo, i) => (
            <div 
              key={i} 
              onMouseEnter={playTick}
              className="flex-shrink-0 flex items-center justify-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer px-4"
            >
              <img 
                src={logo} 
                alt="Client Logo" 
                className="h-10 md:h-20 w-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
