import React, { createContext, useContext, useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface AudioContextType {
  playTick: () => void;
  playBoot: () => void;
  updateScrollHum: (velocity: number) => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) throw new Error("useAudio must be used within AudioProvider");
  return context;
};

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const reducedMotion = useReducedMotion();
  const [isMuted, setIsMuted] = React.useState(() => {
    return localStorage.getItem('kernel_muted') === 'true';
  });
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    localStorage.setItem('kernel_muted', isMuted.toString());
  }, [isMuted]);
  const humOscRef = useRef<OscillatorNode | null>(null);
  const humGainRef = useRef<GainNode | null>(null);

  useEffect(() => {
    if (reducedMotion) return; // Disable audio if reduced motion is preferred
    // Initialize Audio Context on first user interaction
    const initAudio = () => {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        
        // Setup persistent hum oscillator
        const osc = audioCtxRef.current.createOscillator();
        const gain = audioCtxRef.current.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(40, audioCtxRef.current.currentTime);
        gain.gain.setValueAtTime(0, audioCtxRef.current.currentTime);
        
        osc.connect(gain);
        gain.connect(audioCtxRef.current.destination);
        osc.start();
        
        humOscRef.current = osc;
        humGainRef.current = gain;
      }
      
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
    };

    window.addEventListener('scroll', initAudio, { once: true });
    window.addEventListener('click', initAudio, { once: true });
    window.addEventListener('touchstart', initAudio, { once: true });

    return () => {
      window.removeEventListener('scroll', initAudio);
      window.removeEventListener('click', initAudio);
      window.removeEventListener('touchstart', initAudio);
    };
  }, []);

  const playTick = () => {
    if (isMuted || reducedMotion || !audioCtxRef.current) return;
    const osc = audioCtxRef.current.createOscillator();
    const gain = audioCtxRef.current.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(800, audioCtxRef.current.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, audioCtxRef.current.currentTime + 0.05);

    gain.gain.setValueAtTime(0.02, audioCtxRef.current.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(audioCtxRef.current.destination);

    osc.start();
    osc.stop(audioCtxRef.current.currentTime + 0.05);
  };

  const playBoot = () => {
    if (isMuted || reducedMotion || !audioCtxRef.current) return;
    const now = audioCtxRef.current.currentTime;
    
    // Low drone
    const osc1 = audioCtxRef.current.createOscillator();
    const gain1 = audioCtxRef.current.createGain();
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(55, now);
    gain1.gain.setValueAtTime(0, now);
    gain1.gain.linearRampToValueAtTime(0.05, now + 0.5);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 3);
    
    // High blip sequence
    [0.1, 0.2, 0.4].forEach((delay, i) => {
        const osc = audioCtxRef.current.createOscillator();
        const gain = audioCtxRef.current.createGain();
        osc.frequency.setValueAtTime(440 * (i + 1), now + delay);
        gain.gain.setValueAtTime(0.05, now + delay);
        gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.1);
        osc.connect(gain);
        gain.connect(audioCtxRef.current.destination);
        osc.start(now + delay);
        osc.stop(now + delay + 0.2);
    });

    osc1.connect(gain1);
    gain1.connect(audioCtxRef.current.destination);
    osc1.start(now);
    osc1.stop(now + 3);
  };

  const updateScrollHum = (velocity: number) => {
    if (isMuted || reducedMotion || !humOscRef.current || !humGainRef.current || !audioCtxRef.current) {
        if (humGainRef.current && audioCtxRef.current) {
            humGainRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.1);
        }
        return;
    }
    
    const v = Math.abs(velocity);
    const targetFreq = 40 + (v / 10);
    const targetGain = Math.min(0.05, v / 5000);
    
    humOscRef.current.frequency.setTargetAtTime(targetFreq, audioCtxRef.current.currentTime, 0.1);
    humGainRef.current.gain.setTargetAtTime(targetGain, audioCtxRef.current.currentTime, 0.1);
  };

  return (
    <AudioContext.Provider value={{ playTick, playBoot, updateScrollHum, isMuted, setIsMuted }}>
      {children}
    </AudioContext.Provider>
  );
};
