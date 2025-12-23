import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const interval = duration / 100;

    const counter = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(counter);
          return 100;
        }
        return prev + 1;
      });
    }, interval);

    return () => clearInterval(counter);
  }, []);

  useEffect(() => {
    if (count === 100) {
      const tl = gsap.timeline({
        onComplete: onComplete,
      });

      tl.to(counterRef.current, {
        opacity: 0,
        y: -30,
        duration: 0.4,
        ease: "power2.in",
      })
        .to(preloaderRef.current, {
          yPercent: -100,
          duration: 0.8,
          ease: "power4.inOut",
        });
    }
  }, [count, onComplete]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[10002] flex items-center justify-center bg-background"
    >
      <div className="relative">
        <span
          ref={counterRef}
          className="font-display text-8xl md:text-9xl font-bold text-gradient"
        >
          {count}%
        </span>
        <div className="absolute -bottom-4 left-0 w-full h-[2px] bg-muted overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-100 ease-out"
            style={{ width: `${count}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
