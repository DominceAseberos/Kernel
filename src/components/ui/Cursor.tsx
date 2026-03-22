import { useEffect, useRef } from "react";
import gsap from "gsap";

type CursorMode = "default" | "crosshair" | "focus";

export default function Cursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const modeRef = useRef<CursorMode>("default");
    const posRef = useRef({ x: 0, y: 0, px: 0, py: 0 });

    useEffect(() => {
        if (!dotRef.current || !ringRef.current) return;

        const dot = dotRef.current;
        const ring = ringRef.current;

        // High-performance coordinate tracking via quickTo
        // Unified durations to prevent the '+' from splitting in crosshair mode
        const xDot = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power2.out" });
        const yDot = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power2.out" });
        const xRing = gsap.quickTo(ring, "x", { duration: 0.1, ease: "power2.out" });
        const yRing = gsap.quickTo(ring, "y", { duration: 0.1, ease: "power2.out" });

        let rafId: number;
        let lastX = 0;
        let lastY = 0;

        const onMouseMove = (e: MouseEvent) => {
            const { clientX: x, clientY: y } = e;

            // 1. Move both elements instantly/synced (same config)
            xDot(x);
            yDot(y);
            xRing(x);
            yRing(y);

            // 2. ONLY apply velocity-based warping in non-crosshair modes
            if (modeRef.current !== "crosshair") {
                const dx = x - lastX;
                const dy = y - lastY;
                const speed = Math.sqrt(dx * dx + dy * dy);
                const angle = Math.atan2(dy, dx) * (180 / Math.PI);

                const stretchX = 1 + Math.min(speed / 80, 0.7);
                const stretchY = 1 - Math.min(speed / 160, 0.3);

                gsap.to(dot, {
                    scaleX: stretchX,
                    scaleY: stretchY,
                    rotation: angle,
                    duration: 0.1,
                    ease: "none",
                    overwrite: "auto",
                });

                gsap.to(dot, {
                    scaleX: 1,
                    scaleY: 1,
                    rotation: 0,
                    duration: 0.4,
                    ease: "elastic.out(1, 0.5)",
                    overwrite: false,
                    delay: 0.1,
                });
            } else {
                // Keep crosshair perfectly rigid - immediately kill any velocity residue
                gsap.set(dot, { scaleX: 1, scaleY: 1, rotation: 0, overwrite: "auto" });
                gsap.set(ring, { scaleX: 1, scaleY: 1, rotation: 0, overwrite: "auto" });
            }

            lastX = x;
            lastY = y;
        };

        // Mode switching via data attributes on hover targets
        const onMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const el = target.closest("[data-cursor]") as HTMLElement | null;
            const mode = (el?.dataset.cursor as CursorMode) ?? "default";

            if (mode === modeRef.current) return;
            modeRef.current = mode;
            applyMode(mode);
        };

        const applyMode = (mode: CursorMode) => {
            if (mode === "crosshair") {
                gsap.to(dot, {
                    width: 2,
                    height: 24,
                    borderRadius: 1,
                    backgroundColor: "#00ffcc",
                    duration: 0.2,
                    ease: "power2.out",
                });
                gsap.to(ring, {
                    width: 24,
                    height: 2,
                    borderRadius: 1,
                    borderColor: "#00ffcc",
                    opacity: 1,
                    duration: 0.2,
                    ease: "power2.out",
                });
            } else if (mode === "focus") {
                gsap.to(dot, {
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    backgroundColor: "#00ffcc",
                    duration: 0.2,
                    ease: "power2.out",
                });
                gsap.to(ring, {
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    borderColor: "rgba(0,255,204,0.5)",
                    opacity: 1,
                    duration: 0.3,
                    ease: "power2.out",
                });
            } else {
                // default dot
                gsap.to(dot, {
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    backgroundColor: "#00ffcc",
                    duration: 0.2,
                    ease: "power2.out",
                });
                gsap.to(ring, {
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    borderColor: "rgba(0,255,204,0.3)",
                    opacity: 1,
                    duration: 0.2,
                    ease: "power2.out",
                });
            }
        };

        // Click pulse
        const onClick = () => {
            gsap.timeline()
                .to(ring, { scale: 1.6, opacity: 0.5, duration: 0.12, ease: "power2.out" })
                .to(ring, { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" });
        };

        // Hide when leaving window
        const onMouseLeave = () => {
            gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
        };
        const onMouseEnter = () => {
            gsap.to([dot, ring], { opacity: 1, duration: 0.2 });
        };

        window.addEventListener("mousemove", onMouseMove, { passive: true });
        window.addEventListener("mouseover", onMouseOver, { passive: true });
        window.addEventListener("click", onClick);
        document.documentElement.addEventListener("mouseleave", onMouseLeave);
        document.documentElement.addEventListener("mouseenter", onMouseEnter);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseover", onMouseOver);
            window.removeEventListener("click", onClick);
            document.documentElement.removeEventListener("mouseleave", onMouseLeave);
            document.documentElement.removeEventListener("mouseenter", onMouseEnter);
            gsap.killTweensOf([dot, ring]);
        };
    }, []);

    const base: React.CSSProperties = {
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 99999,
        transform: "translate(-50%, -50%)",
        willChange: "transform",
    };

    return (
        <>
            {/* Inner dot */}
            <div
                ref={dotRef}
                style={{
                    ...base,
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    backgroundColor: "#00ffcc",
                }}
            />
            {/* Outer ring */}
            <div
                ref={ringRef}
                style={{
                    ...base,
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    border: "1px solid rgba(0,255,204,0.3)",
                    backgroundColor: "transparent",
                }}
            />
        </>
    );
}