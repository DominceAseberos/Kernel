import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

const BOOT_LINES = [
  { text: "[SYS]  Initializing runtime environment...", delay: 0.1 },
  { text: "[DISK] Mount /dev/refokus_v2.1 ........... OK", delay: 0.6 },
  { text: "[MEM]  Allocating heap: 2048mb ........... OK", delay: 1.1 },
  { text: "[NET]  Establishing secure channel ........ OK", delay: 1.6 },
  { text: "[LENIS] Smooth scroll engine .............. INIT", delay: 2.1 },
  { text: "[GSAP]  Animation core v3.12 .............. LOADED", delay: 2.5 },
  { text: "[RENDER] WebGL context .................... ACTIVE", delay: 2.9 },
  { text: "[AUTH]  Signature: 0xRF2A_VERIFIED ........ OK", delay: 3.3 },
  { text: "", delay: 3.7 },
  { text: "▸ ALL SYSTEMS NOMINAL.", delay: 3.8 },
  { text: "▸ BOOTING REFOKUS...", delay: 4.3 },
];

export default function Preloader({ onComplete }: PreloaderProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressLabelRef = useRef<HTMLSpanElement>(null);
  const readyRef = useRef<HTMLDivElement>(null);
  const scanlineRef = useRef<HTMLDivElement>(null);
  const [visibleLines, setVisibleLines] = useState<string[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Animate each line appearing
      BOOT_LINES.forEach((line, i) => {
        tl.call(
          () => {
            setVisibleLines((prev) => [...prev, line.text]);
            // Auto-scroll terminal
            if (terminalRef.current) {
              terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
            }
          },
          [],
          line.delay
        );
      });

      // Progress bar
      tl.to(
        progressBarRef.current,
        {
          width: "100%",
          duration: 4.2,
          ease: "power1.inOut",
        },
        0
      );

      // Progress label counter
      tl.to(
        { val: 0 },
        {
          val: 100,
          duration: 4.2,
          ease: "power1.inOut",
          onUpdate: function () {
            if (progressLabelRef.current) {
              progressLabelRef.current.textContent = `${Math.round(
                this.targets()[0].val
              )}%`;
            }
          },
        },
        0
      );

      // Show SYSTEM_READY
      tl.fromTo(
        readyRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
        4.8
      );

      // Flash effect
      tl.to(
        overlayRef.current,
        {
          backgroundColor: "#00ffcc",
          duration: 0.05,
          ease: "none",
        },
        5.6
      );
      tl.to(
        overlayRef.current,
        {
          backgroundColor: "#0a0f1a",
          duration: 0.1,
          ease: "none",
        },
        5.65
      );

      // Slide up and exit
      tl.to(
        overlayRef.current,
        {
          yPercent: -100,
          duration: 0.9,
          ease: "power4.inOut",
          onComplete,
        },
        5.9
      );
    });

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "#0a0f1a",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'JetBrains Mono', 'Courier New', monospace",
        overflow: "hidden",
      }}
    >
      {/* Blueprint grid overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(0,255,204,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,204,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          pointerEvents: "none",
        }}
      />

      {/* Scanline effect */}
      <div
        ref={scanlineRef}
        style={{
          position: "absolute",
          inset: 0,
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Corner brackets */}
      {["top-left", "top-right", "bottom-left", "bottom-right"].map((pos) => {
        const isTop = pos.includes("top");
        const isLeft = pos.includes("left");
        return (
          <div
            key={pos}
            style={{
              position: "absolute",
              [isTop ? "top" : "bottom"]: 24,
              [isLeft ? "left" : "right"]: 24,
              width: 24,
              height: 24,
              borderTop: isTop ? "1px solid rgba(0,255,204,0.4)" : "none",
              borderBottom: !isTop ? "1px solid rgba(0,255,204,0.4)" : "none",
              borderLeft: isLeft ? "1px solid rgba(0,255,204,0.4)" : "none",
              borderRight: !isLeft ? "1px solid rgba(0,255,204,0.4)" : "none",
            }}
          />
        );
      })}

      {/* Main container */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: 640,
          padding: "0 32px",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 16,
            opacity: 0.4,
          }}
        >
          <span style={{ color: "#00ffcc", fontSize: 11, letterSpacing: 2 }}>
            REFOKUS_OS v2.1
          </span>
          <span style={{ color: "#00ffcc", fontSize: 11, letterSpacing: 2 }}>
            BOOT_SEQ_ACTIVE
          </span>
        </div>

        {/* Terminal window */}
        <div
          style={{
            border: "1px solid rgba(0,255,204,0.2)",
            borderRadius: 4,
            backgroundColor: "rgba(0,255,204,0.03)",
            overflow: "hidden",
          }}
        >
          {/* Terminal title bar */}
          <div
            style={{
              padding: "8px 12px",
              borderBottom: "1px solid rgba(0,255,204,0.15)",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "rgba(0,255,204,0.5)",
              }}
            />
            <span style={{ color: "rgba(0,255,204,0.5)", fontSize: 11 }}>
              /bin/refokus --init --verbose
            </span>
          </div>

          {/* Terminal body */}
          <div
            ref={terminalRef}
            style={{
              padding: "16px 16px",
              height: 220,
              overflowY: "auto",
              scrollbarWidth: "none",
            }}
          >
            {visibleLines.map((line, i) => (
              <div
                key={i}
                style={{
                  fontSize: 12,
                  lineHeight: 1.8,
                  color:
                    line.startsWith("▸")
                      ? "#00ffcc"
                      : line.includes("OK")
                      ? "rgba(0,255,204,0.7)"
                      : "rgba(0,255,204,0.45)",
                  fontWeight: line.startsWith("▸") ? 600 : 400,
                  whiteSpace: "pre",
                  letterSpacing: 0.5,
                }}
              >
                {line || "\u00A0"}
              </div>
            ))}
            {/* blinking cursor */}
            <span
              style={{
                display: "inline-block",
                width: 8,
                height: 14,
                backgroundColor: "#00ffcc",
                verticalAlign: "middle",
                animation: "blink 1s step-end infinite",
              }}
            />
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ marginTop: 20 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 6,
            }}
          >
            <span
              style={{
                color: "rgba(0,255,204,0.4)",
                fontSize: 10,
                letterSpacing: 2,
              }}
            >
              INITIALIZING
            </span>
            <span
              ref={progressLabelRef}
              style={{
                color: "rgba(0,255,204,0.7)",
                fontSize: 10,
                letterSpacing: 2,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              0%
            </span>
          </div>
          <div
            style={{
              height: 1,
              backgroundColor: "rgba(0,255,204,0.12)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              ref={progressBarRef}
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                height: "100%",
                width: "0%",
                backgroundColor: "#00ffcc",
                boxShadow: "0 0 8px rgba(0,255,204,0.8)",
              }}
            />
          </div>
        </div>

        {/* SYSTEM READY */}
        <div
          ref={readyRef}
          style={{
            marginTop: 32,
            textAlign: "center",
            opacity: 0,
          }}
        >
          <div
            style={{
              fontSize: 13,
              letterSpacing: 6,
              color: "#00ffcc",
              fontWeight: 700,
            }}
          >
            ◈ SYSTEM_READY ◈
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
