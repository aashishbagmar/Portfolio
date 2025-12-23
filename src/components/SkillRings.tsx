import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: "Python", level: 95, color: "hsl(45, 90%, 55%)" },
  { name: "Flask", level: 92, color: "hsl(30, 90%, 55%)" },
  { name: "PyTorch", level: 92, color: "hsl(280, 70%, 60%)" },
  { name: "Pandas", level: 94, color: "hsl(0, 0%, 60%)" },
  { name: "SQLAlchemy", level: 92, color: "hsl(120, 55%, 35%)" },
  { name: "Matplotlib", level: 90, color: "hsl(260, 80%, 60%)" },
];

interface SkillRingProps {
  name: string;
  level: number;
  color: string;
  delay: number;
}

const SkillRing = ({ name, level, color, delay }: SkillRingProps) => {
  const ringRef = useRef<SVGCircleElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const circumference = 2 * Math.PI * 45;

  useEffect(() => {
    if (!ringRef.current || !containerRef.current || !numberRef.current) return;

    const ctx = gsap.context(() => {
      // Initial state
      gsap.set(ringRef.current, {
        strokeDashoffset: circumference,
      });

      // Animate on scroll
      gsap.to(ringRef.current, {
        strokeDashoffset: circumference - (level / 100) * circumference,
        duration: 1.5,
        ease: "power2.out",
        delay: delay,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Animate the number
      gsap.fromTo(
        numberRef.current,
        { innerText: 0 },
        {
          innerText: level,
          duration: 1.5,
          ease: "power2.out",
          delay: delay,
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Container animation
      gsap.from(containerRef.current, {
        scale: 0.5,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
        delay: delay,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [level, circumference, delay]);

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center gap-3 p-4 rounded-2xl glass hover:scale-105 transition-transform duration-300"
    >
      <div className="relative w-24 h-24 sm:w-28 sm:h-28">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth="6"
          />
          {/* Progress circle */}
          <circle
            ref={ringRef}
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            style={{
              filter: `drop-shadow(0 0 8px ${color})`,
            }}
          />
        </svg>
        {/* Percentage in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            ref={numberRef}
            className="font-display text-xl sm:text-2xl font-bold text-foreground"
          >
            0
          </span>
          <span className="text-sm text-muted-foreground">%</span>
        </div>
      </div>
      <span className="text-sm font-medium text-foreground">{name}</span>
    </div>
  );
};

const SkillRings = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="py-24 sm:py-32 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div ref={headingRef} className="text-center mb-12 sm:mb-16">
          <h2 className="font-display text-sm uppercase tracking-[0.3em] text-primary mb-4">
            Technical Skills
          </h2>
          <p className="text-2xl sm:text-3xl font-display font-bold text-foreground">
            What I'm Good At
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {skills.map((skill, idx) => (
            <SkillRing
              key={skill.name}
              name={skill.name}
              level={skill.level}
              color={skill.color}
              delay={idx * 0.1}
            />
          ))}
        </div>

        {/* Additional skills as tags */}
        <div className="mt-12 sm:mt-16">
          <div className="space-y-8">
            {/* Languages & Frameworks */}
            <div>
              <p className="text-sm text-primary font-semibold uppercase tracking-wider mb-3">Languages & Frameworks</p>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {[
                  { name: "Python", level: 95 },
                  { name: "HTML5", level: 85 },
                  { name: "CSS3", level: 80 },
                  { name: "JavaScript", level: 70 },
                  { name: "Flask", level: 92 },
                  { name: "Tkinter", level: 90 },
                  { name: "Eel", level: 80 },
                ].map((skill) => (
                  <span
                    key={skill.name}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm glass border border-border/50 hover:border-primary/50 hover:text-primary transition-colors group"
                  >
                    {skill.name}
                    <span className="ml-1 text-primary group-hover:text-primary/80">{skill.level}%</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Data Science & Machine Learning */}
            <div>
              <p className="text-sm text-primary font-semibold uppercase tracking-wider mb-3">Data Science & Machine Learning</p>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {[
                  { name: "Pandas", level: 94 },
                  { name: "NumPy", level: 92 },
                  { name: "scikit-learn", level: 88 },
                  { name: "PyTorch", level: 92 },
                  { name: "HuggingFace Transformers", level: 90 },
                  { name: "NLTK", level: 78 },
                  { name: "XGBoost", level: 85 },
                  { name: "LightGBM", level: 82 },
                  { name: "Prophet", level: 60 },
                ].map((skill) => (
                  <span
                    key={skill.name}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm glass border border-border/50 hover:border-primary/50 hover:text-primary transition-colors group"
                  >
                    {skill.name}
                    <span className="ml-1 text-primary group-hover:text-primary/80">{skill.level}%</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Databases & Tools */}
            <div>
              <p className="text-sm text-primary font-semibold uppercase tracking-wider mb-3">Databases & Tools</p>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {[
                  { name: "SQLAlchemy", level: 92 },
                  { name: "MySQL", level: 88 },
                  { name: "Git/GitHub", level: 85 },
                  { name: "Jupyter Notebooks", level: 80 },
                  { name: "VS Code", level: 75 },
                  { name: "Postman", level: 85 },
                ].map((skill) => (
                  <span
                    key={skill.name}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm glass border border-border/50 hover:border-primary/50 hover:text-primary transition-colors group"
                  >
                    {skill.name}
                    <span className="ml-1 text-primary group-hover:text-primary/80">{skill.level}%</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Automation & Security */}
            <div>
              <p className="text-sm text-primary font-semibold uppercase tracking-wider mb-3">Automation & Security</p>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {[
                  { name: "BeautifulSoup/Selenium/Requests", level: 92 },
                  { name: "Security (AES-256, Flask-Login, CSRF)", level: 75 },
                  { name: "REST API Integration", level: 85 },
                ].map((skill) => (
                  <span
                    key={skill.name}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm glass border border-border/50 hover:border-primary/50 hover:text-primary transition-colors group"
                  >
                    {skill.name}
                    <span className="ml-1 text-primary group-hover:text-primary/80">{skill.level}%</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Visualization & Financial */}
            <div>
              <p className="text-sm text-primary font-semibold uppercase tracking-wider mb-3">Visualization & Financial Analysis</p>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {[
                  { name: "Matplotlib", level: 90 },
                  { name: "Seaborn", level: 85 },
                  { name: "Plotly", level: 84 },
                  { name: "yfinance", level: 90 },
                ].map((skill) => (
                  <span
                    key={skill.name}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm glass border border-border/50 hover:border-primary/50 hover:text-primary transition-colors group"
                  >
                    {skill.name}
                    <span className="ml-1 text-primary group-hover:text-primary/80">{skill.level}%</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillRings;
