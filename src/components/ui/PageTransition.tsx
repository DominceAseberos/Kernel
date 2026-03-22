import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';

export const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const transitionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Full screen clip-path wipe
      gsap.fromTo(transitionRef.current, 
        { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' },
        { 
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          duration: 0.6,
          ease: 'power4.inOut',
          onComplete: () => {
            gsap.to(transitionRef.current, {
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
                duration: 0.6,
                ease: 'power4.inOut',
                delay: 0.1
            });
          }
        }
      );
    });

    return () => ctx.revert();
  }, [location.pathname]);

  return (
    <>
      <div 
        ref={transitionRef}
        className="fixed inset-0 bg-[#00ffcc] z-[100] pointer-events-none"
        style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' }}
      />
      {children}
    </>
  );
};
