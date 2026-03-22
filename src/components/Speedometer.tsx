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
    <div className="fixed bottom-8 right-8 z-50 font-mono text-xs text-[#00ffcc] mix-blend-difference pointer-events-none flex flex-col items-end">
      <span className="opacity-50">VELOCITY</span>
      <span className="text-xl">{scrollSpeed} px/s</span>
    </div>
  );
};
