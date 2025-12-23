import { useEffect, useRef } from "react";
import gsap from "gsap";

const BackgroundOrbs = () => {
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    const shouldDisableAnimation = prefersReducedMotion || isMobile;

    const orbs = [orb1Ref.current, orb2Ref.current, orb3Ref.current];

    orbs.forEach((orb, index) => {
      if (!orb) return;

      if (shouldDisableAnimation) {
        // Keep subtle static positions on mobile / reduced motion
        orb.style.transform = `translate3d(0,0,0)`;
        return;
      }

      gsap.to(orb, {
        x: `random(-80, 80)`,
        y: `random(-80, 80)`,
        duration: 10 + index * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        force3D: true,
      });
    });
  }, []);

    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Violet orb - top left */}
      <div
        ref={orb1Ref}
        className="absolute -top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full opacity-30 blur-[120px] will-change-transform"
        style={{
          background: "radial-gradient(circle, hsl(262 80% 50%) 0%, transparent 70%)",
          transform: "translate3d(0, 0, 0)",
        }}
      />
      
      {/* Blue orb - bottom right */}
      <div
        ref={orb2Ref}
        className="absolute -bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full opacity-25 blur-[100px] will-change-transform"
        style={{
          background: "radial-gradient(circle, hsl(200 100% 50%) 0%, transparent 70%)",
          transform: "translate3d(0, 0, 0)",
        }}
      />
      
      {/* Smaller accent orb - center */}
      <div
        ref={orb3Ref}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-20 blur-[80px] will-change-transform"
        style={{
          background: "radial-gradient(circle, hsl(280 70% 40%) 0%, transparent 70%)",
          transform: "translate3d(0, 0, 0)",
        }}
      />
    </div>
};

export default BackgroundOrbs;
