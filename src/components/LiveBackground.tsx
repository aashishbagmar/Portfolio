import { useEffect, useRef } from "react";

const LiveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    const shouldDisableAnimation = prefersReducedMotion || isMobile;

    let animationId: number;
    let time = 0;
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;
    let lastFrame = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    interface Wave {
      amplitude: number;
      frequency: number;
      speed: number;
      phase: number;
      color: [number, number, number];
    }

    const waves: Wave[] = [
      { amplitude: 36, frequency: 0.005, speed: 0.004, phase: 0, color: [138, 43, 226] }, // Violet
      { amplitude: 48, frequency: 0.0035, speed: 0.005, phase: Math.PI / 3, color: [75, 0, 130] }, // Indigo
      { amplitude: 42, frequency: 0.0045, speed: 0.0055, phase: (2 * Math.PI) / 3, color: [0, 100, 200] }, // Blue
    ];

    const drawWave = (wave: Wave, offsetY: number) => {
      ctx!.beginPath();
      ctx!.moveTo(0, canvas.height / 2 + offsetY);

      for (let x = 0; x <= canvas.width; x += 8) {
        const dx = mouseX - x;
        const dy = mouseY - (canvas.height / 2 + offsetY);
        const distance = Math.sqrt(dx * dx + dy * dy);
        const mouseInfluence = Math.max(0, 1 - distance / 300) * 30;

        const y =
          canvas.height / 2 +
          offsetY +
          Math.sin(x * wave.frequency + time * wave.speed + wave.phase) * wave.amplitude +
          Math.sin(time * 0.01) * 20 +
          mouseInfluence;

        ctx!.lineTo(x, y);
      }

      ctx!.lineTo(canvas.width, canvas.height);
      ctx!.lineTo(0, canvas.height);
      ctx!.closePath();

      const gradient = ctx!.createLinearGradient(0, 0, 0, canvas.height);
      const [r, g, b] = wave.color;
      gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.1)`);
      gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, 0.05)`);
      gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

      ctx!.fillStyle = gradient;
      ctx!.fill();

      // Wave outline
      ctx!.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.3)`;
      ctx!.lineWidth = 1.5;
      ctx!.stroke();
    };

    const drawStars = () => {
      const starCount = shouldDisableAnimation ? 20 : 40;

      for (let i = 0; i < starCount; i++) {
        const x = (i * 73) % canvas.width;
        const y = (i * 97) % (canvas.height * 0.3);
        const twinkle = Math.sin(time * 0.003 + i) * 0.5 + 0.5;
        const opacity = (twinkle * 0.6 + 0.2) * 0.4;

        ctx!.beginPath();
        ctx!.arc(x, y, 1, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx!.fill();

        // Star glow
        ctx!.beginPath();
        ctx!.arc(x, y, 2.5, 0, Math.PI * 2);
        ctx!.strokeStyle = `rgba(200, 200, 255, ${opacity * 0.5})`;
        ctx!.lineWidth = 0.5;
        ctx!.stroke();
      }
    };

    const animate = (now: number) => {
      // Throttle to ~30fps
      if (now - lastFrame < 33) {
        animationId = requestAnimationFrame(animate);
        return;
      }
      lastFrame = now;

      if (shouldDisableAnimation) {
        // Static gradient background for reduced motion / mobile
        const bgGradient = ctx!.createLinearGradient(0, 0, 0, canvas.height);
        bgGradient.addColorStop(0, "#0a0a1a");
        bgGradient.addColorStop(0.5, "#0f0520");
        bgGradient.addColorStop(1, "#0a0a1a");
        ctx!.fillStyle = bgGradient;
        ctx!.fillRect(0, 0, canvas.width, canvas.height);
        return;
      }

      // Clear with dark gradient background
      const bgGradient = ctx!.createLinearGradient(0, 0, 0, canvas.height);
      bgGradient.addColorStop(0, "#0a0a1a");
      bgGradient.addColorStop(0.5, "#0f0520");
      bgGradient.addColorStop(1, "#0a0a1a");
      ctx!.fillStyle = bgGradient;
      ctx!.fillRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      drawStars();

      // Draw waves with different offsets
      waves.forEach((wave, index) => {
        drawWave(wave, index * 30 - 45);
      });

      time++;
      animationId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    resize();
    animate(0);

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);

    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationId);
      } else {
        animationId = requestAnimationFrame(animate);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: "transparent" }}
    />
  );
};

export default LiveBackground;
