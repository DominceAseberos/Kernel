import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useAudio } from '../../context/AudioProvider';

export interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onMouseEnter?: () => void;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({ 
  children, 
  className = "", 
  href,
  onMouseEnter
}) => {
  const { playTick } = useAudio();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    playTick();
    if (onMouseEnter) onMouseEnter();
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      const dist = Math.sqrt(x * x + y * y);
      if (dist < 100) {
        gsap.to(container, {
          x: x * 0.4,
          y: y * 0.4,
          duration: 0.3,
          ease: 'power2.out'
        });
      } else {
        gsap.to(container, {
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

  const content = (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      className={`relative inline-block cursor-pointer ${className}`}
    >
      {children}
    </div>
  );

  if (href) {
    return (
      <a href={href} className="inline-block">
        {content}
      </a>
    );
  }

  return content;
};
