// ─── App.tsx (FINAL FIX) ─────────────────────────────────────────────────────
// Fix: The #hero-trigger entrance animation leaves a transform:matrix on the
// wrapper div. A transform on a parent of position:fixed breaks the pin.
// Solution: Use clearProps:'transform' on complete, OR animate opacity only
// (no y translation) so no transform is ever applied to the wrapper.

import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { AudioProvider, useAudio } from './context/AudioProvider';

import Preloader from './components/ui/Preloader';
import Cursor from './components/ui/Cursor';

import { Navbar } from './components/Navbar';
import { PageTransition } from './components/ui/PageTransition';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.normalizeScroll(false);

const AppContent = ({ isBooted, isMobile, handleBootComplete }: any) => {
  const { updateScrollHum, playBoot } = useAudio();

  useEffect(() => {
    if (isBooted) {
      setTimeout(playBoot, 100);
    }
  }, [isBooted, playBoot]);

  const onBootComplete = () => {
    handleBootComplete();
    // @ts-ignore
    if (window.lenis) {
      // @ts-ignore
      window.lenis.on('scroll', (e: any) => {
        updateScrollHum(e.velocity);
      });
    }
  };

  return (
    <div className="bg-[#0a0f1a] min-h-screen text-white font-serif selection:bg-[#00ffcc]/30">
      {!isBooted && <Preloader onComplete={onBootComplete} />}
      {!isMobile && <Cursor />}

      <Router>
        <PageTransition>
          <Routes>
            <Route path="/" element={isBooted && <Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageTransition>
      </Router>
    </div>
  );
};

export default function App() {
  const [isBooted, setIsBooted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia('(pointer: coarse)').matches);
  }, []);

  const handleBootComplete = React.useCallback(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // @ts-ignore
    window.lenis = lenis;

    setIsBooted(true);
  }, []);

  return (
    <AudioProvider>
      <AppContent 
        isBooted={isBooted} 
        isMobile={isMobile} 
        handleBootComplete={handleBootComplete} 
      />
    </AudioProvider>
  );
}