import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const Speedometer = () => {
  const [scrollSpeed, setScrollSpeed] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const velocity = Math.abs(self.getVelocity());
          setScrollSpeed(Math.round(velocity));
        }
      });
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 font-mono text-[10px] md:text-xs text-[#00ffcc] mix-blend-difference pointer-events-none flex flex-col items-end">
      <span className="opacity-50 tracking-widest uppercase">VELOCITY</span>
      <span className="text-base md:text-xl font-bold">{scrollSpeed} px/s</span>
    </div>
  );
};
