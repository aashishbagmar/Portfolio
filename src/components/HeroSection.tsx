import { useEffect, useRef } from "react";
import gsap from "gsap";

const HeroSection = () => {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const title = titleRef.current;
      const subtitle = subtitleRef.current;

      if (title) {
        const chars = title.innerText.split("");
        title.innerHTML = chars
          .map((char) => `<span class="inline-block">${char === " " ? "&nbsp;" : char}</span>`)
          .join("");

        gsap.from(title.querySelectorAll("span"), {
          y: 100,
          opacity: 0,
          rotateX: -90,
          stagger: 0.03,
          duration: 1,
          ease: "power4.out",
          delay: 0.2,
        });
      }

      if (subtitle) {
        gsap.from(subtitle, {
          y: 30,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          delay: 1,
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-6"
    >
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-muted-foreground text-sm md:text-base uppercase tracking-[0.3em] mb-6 font-body">
          Creative Developer
        </p>
        
        <h1
          ref={titleRef}
          className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-[0.9] tracking-tight mb-8"
          style={{ perspective: "1000px" }}
        >
          Aashish Bagmar
        </h1>
        
        <p
          ref={subtitleRef}
          className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto font-body leading-relaxed"
        >
          Full-Stack ML & Data Engineer specializing in Python and AI solutions.
          <span className="text-gradient font-medium"> Building intelligent systems</span> that solve real-world problems.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
