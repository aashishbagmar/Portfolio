import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard from "./ProjectCard";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "AI Stock Prediction System",
    description: "Multi-model stock forecasting system combining FinBERT sentiment analysis with time series predictions. Fetches financial news, calculates technical indicators, and stores predictions. Interactive Plotly dashboards for multi-ticker forecasting.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    tags: ["Python", "FinBERT", "Prophet", "XGBoost", "LightGBM", "MySQL", "Plotly"],
    link: "#",
    github: "#",
  },
  {
    title: "Password Manager",
    description: "Secure credential management application with Tkinter GUI featuring encrypted password generation and storage. Implements one-click clipboard copy and complete CRUD operations with industry-standard hashing.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
    tags: ["Python", "Tkinter", "JSON", "PyPerclip", "Cryptography"],
    link: "#",
    github: "#",
  },
  {
    title: "Cookie Clicker Bot",
    description: "Automation script that plays Cookie Clicker by simulating user interactions and tracking game state. Detects screen elements to intelligently upgrade items. Demonstrates automated testing concepts with dynamic JavaScript-heavy web pages.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    tags: ["Python", "Selenium", "Web Automation"],
    link: "#",
    github: "#",
  },
  {
    title: "Habit Tracker System",
    description: "API-driven application that records daily habits using the Pixela habit-tracking service. Sends dated entries with precise timestamps for day-wise activity tracking. Converts API responses into visual progress charts.",
    image: "https://images.unsplash.com/photo-1611632622736-f52b4ce61b57?w=800&q=80",
    tags: ["Python", "Pixela API", "datetime", "JSON"],
    link: "#",
    github: "#",
  },
];

const WorkSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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

      // Staggered card reveal
      const cards = gridRef.current?.children;
      if (cards) {
        gsap.from(cards, {
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
          y: 80,
          opacity: 0,
          scale: 0.95,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative py-32 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <h2
          ref={headingRef}
          className="font-display text-sm uppercase tracking-[0.3em] text-primary mb-12"
        >
          Selected Work
        </h2>

        <div ref={gridRef} className="bento-grid">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
