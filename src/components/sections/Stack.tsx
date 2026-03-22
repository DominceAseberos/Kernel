import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const Stack = () => {
  const stackContainerRef = useRef<HTMLDivElement>(null);
  const stack1Ref = useRef<HTMLDivElement>(null);
  const stack2Ref = useRef<HTMLDivElement>(null);
  const stack3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (stackContainerRef.current && stack1Ref.current && stack2Ref.current && stack3Ref.current) {
        gsap.to(stack1Ref.current, {
          scale: 0.9,
          opacity: 0.5,
          filter: "blur(4px)",
          scrollTrigger: {
            trigger: stack2Ref.current,
            start: "top bottom",
            end: "top top",
            scrub: true,
          }
        });

        gsap.to(stack2Ref.current, {
          scale: 0.9,
          opacity: 0.5,
          filter: "blur(4px)",
          scrollTrigger: {
            trigger: stack3Ref.current,
            start: "top bottom",
            end: "top top",
            scrub: true,
          }
        });
      }
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={stackContainerRef} className="relative bg-[#05080f] pb-32 z-20">
      <h2 className="sr-only">Our Execution Stack</h2>
      <div className="absolute inset-0 blueprint-grid opacity-10" />
      
      {/* Stack 1 */}
      <div ref={stack1Ref} className="sticky top-0 h-screen w-full flex items-center justify-center p-8">
        <div className="w-full max-w-5xl h-[80vh] bg-[#0a0f1a] rounded-3xl border border-[#00ffcc]/30 p-8 md:p-16 flex flex-col justify-center relative overflow-hidden shadow-2xl">
          <img src="/assets/images/stack-1.png" className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none" alt="Architecture" />
          <div className="absolute top-0 right-0 p-8 font-mono text-[15vw] md:text-[10vw] text-white/5 leading-none">01</div>
          <h3 className="font-mono text-[#00ffcc] mb-4 tracking-widest uppercase">Phase_One</h3>
          <h2 className="text-4xl md:text-7xl font-bold mb-8 max-w-2xl">ARCHITECTURE & WIREFRAMING</h2>
          <p className="font-mono text-white/60 max-w-xl leading-relaxed text-sm md:text-base">
            Establishing the core structural integrity. Mapping out the data flow and component hierarchy before applying the visual layer.
          </p>
        </div>
      </div>

      {/* Stack 2 */}
      <div ref={stack2Ref} className="sticky top-0 h-screen w-full flex items-center justify-center p-8">
        <div className="w-full max-w-5xl h-[80vh] bg-[#0c1424] rounded-3xl border border-[#00ffcc]/50 p-8 md:p-16 flex flex-col justify-center relative overflow-hidden shadow-2xl">
          <img src="/assets/images/stack-2.png" className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none" alt="Choreography" />
          <div className="absolute top-0 right-0 p-8 font-mono text-[15vw] md:text-[10vw] text-white/5 leading-none">02</div>
          <h3 className="font-mono text-[#00ffcc] mb-4 tracking-widest uppercase">Phase_Two</h3>
          <h2 className="text-4xl md:text-7xl font-bold mb-8 max-w-2xl">KINETIC CHOREOGRAPHY</h2>
          <p className="font-mono text-white/60 max-w-xl leading-relaxed text-sm md:text-base">
            Injecting motion and physics. Utilizing GSAP to create heavy, expensive inertia and seamless transitions between states.
          </p>
        </div>
      </div>

      {/* Stack 3 */}
      <div ref={stack3Ref} className="sticky top-0 h-screen w-full flex items-center justify-center p-8">
        <div className="w-full max-w-5xl h-[80vh] bg-[#111c33] rounded-3xl border border-[#00ffcc] p-8 md:p-16 flex flex-col justify-center relative overflow-hidden shadow-[0_0_50px_rgba(0,255,204,0.1)]">
          <img src="/assets/images/stack-3.png" className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none" alt="Final Render" />
          <div className="absolute top-0 right-0 p-8 font-mono text-[15vw] md:text-[10vw] text-white/5 leading-none">03</div>
          <h3 className="font-mono text-[#00ffcc] mb-4 tracking-widest uppercase">Phase_Three</h3>
          <h2 className="text-4xl md:text-7xl font-bold mb-8 max-w-2xl">FINAL RENDER & DEPLOY</h2>
          <p className="font-mono text-white/60 max-w-xl leading-relaxed text-sm md:text-base">
            Applying the final polish. Adjusting the post-processing effects, ensuring 60fps performance, and launching the experience.
          </p>
        </div>
      </div>
    </section>
  );
};
