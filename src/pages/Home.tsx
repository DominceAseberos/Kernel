import React from 'react';
import { Navbar } from '../components/Navbar';
import { Speedometer } from '../components/Speedometer';
import { Hero } from '../components/sections/Hero';
import { About } from '../components/sections/About';
import { Marquee } from '../components/sections/Marquee';
import { ProjectSection } from '../components/sections/ProjectSection';
import { Stack } from '../components/sections/Stack';
import { Testimonials } from '../components/sections/Testimonials';
import { Contact } from '../components/sections/Contact';
import { Footer } from '../components/sections/Footer';
import gsap from 'gsap';

export const Home = () => {
  React.useEffect(() => {
    // ── FIX 2: Animate opacity only — NO y translation ───────────────────
    gsap.fromTo(
      '#hero-trigger',
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        clearProps: 'transform,y,x',
      }
    );
  }, []);

  return (
    <div id="content-mount">
      <Navbar />
      <Speedometer />
      <div id="hero-trigger">
        <Hero />
      </div>
      <About />
      <Marquee />
      <ProjectSection />
      <Testimonials />
      <Stack />
      <Contact />
      <Footer />
    </div>
  );
};
