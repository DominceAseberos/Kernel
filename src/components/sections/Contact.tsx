import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Send, CheckCircle2 } from 'lucide-react';
import { useAudio } from '../../context/AudioProvider';

export const Contact = () => {
  const { playTick } = useAudio();
  const [inputValue, setInputValue] = useState('');
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success'>('idle');
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setFormState('sending');
    
    // Simulate signal transmission
    setTimeout(() => {
      setFormState('success');
      setInputValue('');
      setTimeout(() => setFormState('idle'), 5000);
    }, 2000);
  };

  useEffect(() => {
    // Focus effect on keyboard open
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section ref={containerRef} className="py-48 px-8 bg-[#0a0f1a] relative z-20 flex flex-col items-center justify-center">
      <div className="absolute inset-0 blueprint-grid opacity-5 pointer-events-none" />
      
      <div className="max-w-4xl w-full">
        <div className="mb-12">
            <h2 className="text-5xl md:text-8xl font-bold mb-4 tracking-tighter uppercase italic text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>
                PROFESSIONAL_INQUIRY
            </h2>
            <p className="font-mono text-xs text-[#00ffcc] opacity-60 tracking-widest">[ SECURITY_LEVEL: ALPHA // SECURE_CHANNEL ]</p>
        </div>

        <div className="bg-black/40 border border-[#00ffcc]/20 rounded-lg p-6 md:p-12 backdrop-blur-xl relative overflow-hidden group hover:border-[#00ffcc]/40 transition-colors">
            {/* Scanline overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,255,204,0.02)_50%)] bg-[length:100%_4px] pointer-events-none" />
            
            {formState === 'idle' && (
                <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-6">
                    <div className="flex items-start gap-4 font-mono text-xl md:text-3xl">
                        <span className="text-[#00ffcc] animate-pulse">❯</span>
                        <div className="flex-1">
                            <input
                                type="text"
                                onMouseEnter={playTick}
                                placeholder="IDENTIFYING_NAME"
                                className="w-full bg-transparent border-none outline-none text-white placeholder:text-white/10 uppercase mb-4"
                            />
                            <input
                                type="email"
                                onMouseEnter={playTick}
                                placeholder="CONTACT_CHANNELS"
                                className="w-full bg-transparent border-none outline-none text-white placeholder:text-white/10 uppercase mb-4"
                            />
                            <input
                                ref={inputRef}
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="TYPE YOUR MESSAGE AND PRESS ENTER..."
                                className="w-full bg-transparent border-none outline-none text-white placeholder:text-white/10 uppercase"
                                autoFocus
                            />
                        </div>
                    </div>
                    <div className="flex justify-between items-center opacity-30 font-mono text-[10px] mt-8">
                        <span>SYS.INPUT_TYPE: MESSAGE_PACKET</span>
                        <span>PRESS [ENTER] TO DISPATCH</span>
                    </div>
                    <button
                        type="submit"
                        onMouseEnter={playTick}
                        className="w-full py-4 border border-[#00ffcc]/30 bg-[#00ffcc]/5 text-[#00ffcc] font-mono text-xs tracking-[0.5em] hover:bg-[#00ffcc] hover:text-black transition-all group relative overflow-hidden"
                    >
                        <span className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(0,255,204,0.1)_50%,transparent_100%)] animate-[scan_2s_infinite_linear] opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="relative z-10">TRANSMIT_INQUIRY</span>
                    </button>
                </form>
            )}

            {formState === 'sending' && (
                <div className="relative z-10 py-12 flex flex-col items-center justify-center gap-4">
                    <div className="w-full h-1 bg-white/5 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[#00ffcc] animate-[loading_2s_infinite]" />
                    </div>
                    <span className="font-mono text-[#00ffcc] text-sm tracking-[0.3em] animate-pulse">UPLOADING_LOGS...</span>
                </div>
            )}

            {formState === 'success' && (
                <div className="relative z-10 py-12 flex flex-col items-center justify-center gap-4 text-center">
                    <div className="w-20 h-20 rounded-full border border-[#00ffcc] flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(0,255,204,0.3)]">
                        <span className="text-[#00ffcc] text-4xl font-bold">✓</span>
                    </div>
                    <h3 className="text-3xl md:text-5xl font-bold uppercase italic text-[#00ffcc]">INQUIRY_RECEIVED</h3>
                    <p className="font-mono text-xs text-white/40 tracking-widest mt-2 uppercase">Your inquiry has been successfully transmitted. We will provide a formal response within 24 hours.</p>
                </div>
            )}
        </div>

        <style>{`
          @keyframes loading {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}</style>
      </div>
    </section>
  );
};
