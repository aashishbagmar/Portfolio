import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none reverse",
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      // Text reveal animation
      gsap.from(textRef.current, {
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 75%",
          end: "top 45%",
          toggleActions: "play none none reverse",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2,
      });

      // Highlight glow animation
      gsap.to(highlightRef.current, {
        scrollTrigger: {
          trigger: highlightRef.current,
          start: "top 70%",
        },
        backgroundSize: "100% 100%",
        duration: 0.6,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 px-6"
    >
      <div className="max-w-4xl mx-auto">
        <h2
          ref={headingRef}
          className="font-display text-sm uppercase tracking-[0.3em] text-primary mb-12"
        >
          About
        </h2>
        
        <div ref={textRef} className="space-y-8">
          <p className="font-display text-3xl md:text-5xl lg:text-6xl font-medium leading-[1.2] text-foreground">
            I craft{" "}
            <span
              ref={highlightRef}
              className="relative inline-block"
              style={{
                background: "linear-gradient(90deg, hsl(262 80% 60% / 0.3), hsl(200 100% 50% / 0.3))",
                backgroundSize: "0% 100%",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "left",
                transition: "background-size 0.6s ease",
              }}
            >
              digital experiences
            </span>{" "}
            that live at the intersection of design and technology.
          </p>
          
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            With 5+ years of experience building for the web, I specialize in creating 
            performant, accessible, and visually stunning applications. When I'm not coding, 
            you'll find me exploring generative art or contributing to open-source projects.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-border">
          {[
            { number: "5+", label: "Years Experience" },
            { number: "50+", label: "Projects Completed" },
            { number: "20+", label: "Happy Clients" },
          ].map((stat, index) => (
            <div key={stat.label} className="text-center md:text-left">
              <p className="font-display text-4xl md:text-5xl font-bold text-gradient">
                {stat.number}
              </p>
              <p className="text-sm text-muted-foreground mt-2 font-body">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
