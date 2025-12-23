import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Heart, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const CreativeAbout = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const traitsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      gsap.from(cardRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      const traits = traitsRef.current?.children;
      if (traits) {
        gsap.from(traits, {
          y: 30,
          opacity: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: traitsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-24 sm:py-32 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div ref={headingRef} className="text-center mb-12 sm:mb-16">
          <h2 className="font-display text-sm uppercase tracking-[0.3em] text-primary mb-4">
            About Me
          </h2>
          <p className="text-2xl sm:text-3xl font-display font-bold text-foreground">
            The Person Behind the Code
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Main card */}
          <div
            ref={cardRef}
            className="relative glass rounded-3xl p-6 sm:p-8 border border-border/50 overflow-hidden"
          >
            {/* Decorative gradient */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-secondary/20 rounded-full blur-3xl" />

            <div className="relative z-10">
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6">
                I'm <span className="text-gradient">Aashish Bagmar</span>, a Python developer passionate about automation and web scraping. With expertise in BeautifulSoup, Selenium, and REST APIs, I build practical tools that solve real-world problems.</p>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Currently expanding into AI/ML with Pandas and Scikit-learn. I love creating automated solutions and am eager to contribute my expertise to innovative projects.</p>
            </div>
          </div>

          {/* Right side content */}
          <div className="relative z-10">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-3xl sm:text-4xl mb-6">
              �‍💻
            </div>

            <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-4">
              Why Work With Me
            </h3>

            <p className="text-muted-foreground leading-relaxed mb-4">
              I bring practical problem-solving skills and a strong foundation in Python automation. 
              Experienced in building tools that work reliably and efficiently.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Whether it's web scraping, API integration, or creating automated solutions, 
              I'm committed to delivering quality work and continuous learning.</p>

            {/* CTA */}
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
              >
                <Zap className="w-4 h-4" />
                Get in Touch
              </a>
              <a
                href="#work"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass border border-border/50 text-foreground font-medium text-sm hover:border-primary/50 transition-colors"
              >
                View Projects
              </a>
            </div>
          </div>

          {/* Traits grid */}
          <div ref={traitsRef} className="grid grid-cols-2 gap-4">
            {[
              {
                icon: "🚀",
                title: "Fast Learner",
                desc: "Quick to adapt to new technologies and frameworks",
              },
              {
                icon: "💡",
                title: "Problem Solver",
                desc: "Love tackling complex challenges with creative solutions",
              },
              {
                icon: "🤝",
                title: "Team Player",
                desc: "Collaborate effectively and communicate clearly",
              },
              {
                icon: "✨",
                title: "Detail Oriented",
                desc: "Obsessed with pixel-perfect implementations",
              },
            ].map((trait, idx) => (
              <div
                key={idx}
                className="glass rounded-2xl p-4 sm:p-5 border border-border/50 hover:border-primary/30 transition-colors group"
              >
                <span className="text-2xl sm:text-3xl block mb-3 group-hover:scale-110 transition-transform">
                  {trait.icon}
                </span>
                <h4 className="font-display font-bold text-foreground text-sm sm:text-base mb-1">
                  {trait.title}
                </h4>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {trait.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreativeAbout;
