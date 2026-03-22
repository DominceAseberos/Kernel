import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const MagneticButton = ({ children, className, href }: { children: React.ReactNode, className?: string, href?: string }) => {
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      const dist = Math.sqrt(x * x + y * y);
      if (dist < 100) {
        gsap.to(button, {
          x: x * 0.4,
          y: y * 0.4,
          duration: 0.3,
          ease: 'power2.out'
        });
      } else {
        gsap.to(button, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <a ref={buttonRef} href={href} className={className} style={{ display: 'inline-block' }}>
      {children}
    </a>
  );
};
