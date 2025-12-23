import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  "React", "TypeScript", "Node.js", "Python", "PostgreSQL", 
  "Next.js", "GraphQL", "Tailwind CSS", "Docker", "AWS",
  "Figma", "Three.js", "GSAP", "Prisma", "Redis",
  "React", "TypeScript", "Node.js", "Python", "PostgreSQL", 
  "Next.js", "GraphQL", "Tailwind CSS", "Docker", "AWS",
  "Figma", "Three.js", "GSAP", "Prisma", "Redis",
];

const StackSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 40,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="stack"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-6 mb-12">
        <h2
          ref={headingRef}
          className="font-display text-sm uppercase tracking-[0.3em] text-primary"
        >
          Tech Stack
        </h2>
      </div>

      {/* Marquee container */}
      <div className="relative">
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        
        {/* First marquee row */}
        <div className="marquee-wrapper py-6">
          <div className="marquee-content">
            {skills.map((skill, index) => (
              <span
                key={`row1-${index}`}
                className="inline-flex items-center gap-4 mx-4"
              >
                <span className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground/10 hover:text-foreground transition-colors duration-300">
                  {skill}
                </span>
                <span className="w-2 h-2 rounded-full bg-primary" />
              </span>
            ))}
          </div>
        </div>

        {/* Second marquee row (reversed direction) */}
        <div className="marquee-wrapper py-6">
          <div 
            className="marquee-content"
            style={{ animationDirection: "reverse" }}
          >
            {[...skills].reverse().map((skill, index) => (
              <span
                key={`row2-${index}`}
                className="inline-flex items-center gap-4 mx-4"
              >
                <span className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground/10 hover:text-foreground transition-colors duration-300">
                  {skill}
                </span>
                <span className="w-2 h-2 rounded-full bg-secondary" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StackSection;
