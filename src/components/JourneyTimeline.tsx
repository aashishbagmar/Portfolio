import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, Briefcase, Rocket, Code } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const journeyItems = [
  {
    year: "2025-Present",
    title: "Ready for Opportunities",
    subtitle: "Actively looking for an internship",
    description:
      "Actively seeking opportunities to contribute to innovative projects and grow as a Python, Machine Learning, and Full-Stack developer.",
    icon: Rocket,
    color: "bg-primary",
    current: true,
  },
  {
    year: "2023-2025",
    title: "Built Real Projects",
    subtitle: "Personal & Open Source",
    description:
      "Developed full-stack and ML applications including an AI Stock Prediction System, Amazon Price Tracker, Password Manager, automation bots, and habit tracking tools.",
    icon: Code,
    color: "bg-secondary",
  },
  {
    year: "2025",
    title: "Internship Experience",
    subtitle: "Software Development Intern",
    description:
      "Gained hands-on experience working with a development team on production applications, focusing on automation, debugging, and implementing new features.",
    icon: Briefcase,
    color: "bg-emerald-500",
  },
  {
    year: "2022-2026",
    title: "Artificial Intelligence and Data Science Degree",
    subtitle: "B.E. in AI & DS",
    description:
      "Studying core concepts of AI, machine learning, and data science while building Python, web, and ML projects as part of academic and personal work.",
    icon: GraduationCap,
    color: "bg-amber-500",
  },
];

const JourneyTimeline = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.from(headingRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Timeline line grows
      gsap.from(lineRef.current, {
        scaleY: 0,
        transformOrigin: "top",
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // Timeline items stagger
      const items = timelineRef.current?.querySelectorAll(".timeline-item");
      if (items) {
        gsap.from(items, {
          x: (i) => (i % 2 === 0 ? -60 : 60),
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="journey" className="py-24 sm:py-32 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div ref={headingRef} className="text-center mb-12 sm:mb-16">
          <h2 className="font-display text-sm uppercase tracking-[0.3em] text-primary mb-4">
            My Journey
          </h2>
          <p className="text-2xl sm:text-3xl font-display font-bold text-foreground">
            Learning & Growing
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Center line */}
          <div
            ref={lineRef}
            className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-emerald-500 sm:-translate-x-1/2"
          />

          {/* Timeline items */}
          <div className="space-y-8 sm:space-y-12">
            {journeyItems.map((item, idx) => {
              const Icon = item.icon;
              const isLeft = idx % 2 === 0;

              return (
                <div
                  key={idx}
                  className={`timeline-item relative flex items-start gap-4 sm:gap-8 ${
                    isLeft ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
                >
                  {/* Content card */}
                  <div
                    className={`flex-1 ml-12 sm:ml-0 ${
                      isLeft ? "sm:text-left sm:pl-12" : "sm:text-left sm:pl-12"
                    }`}
                  >
                    <div
                      className={`inline-block glass rounded-2xl p-4 sm:p-6 border ${
                        item.current
                          ? "border-primary/50 glow-primary"
                          : "border-border/50"
                      } hover:border-primary/30 transition-colors`}
                    >
                      <span className="text-xs text-primary font-medium">{item.year}</span>
                      <h3 className="font-display text-lg sm:text-xl font-bold text-foreground mt-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{item.subtitle}</p>
                      <p className="text-sm text-muted-foreground/80 mt-2 leading-relaxed">
                        {item.description}
                      </p>
                      {item.current && (
                        <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                          Current
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Center icon */}
                  <div
                    className={`absolute left-0 sm:left-1/2 sm:-translate-x-1/2 w-8 h-8 sm:w-12 sm:h-12 rounded-full ${item.color} flex items-center justify-center shadow-lg z-10`}
                    style={{
                      boxShadow: `0 0 20px ${item.color.replace("bg-", "hsl(var(--")})`,
                    }}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden sm:block flex-1" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneyTimeline;
