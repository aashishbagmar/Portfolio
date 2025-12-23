import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Download, Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

const CVSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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

      gsap.from(contentRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const cvSections = [
    {
      title: "Projects",
      icon: "🚀",
      items: [
        {
          project: "Amazon Price Tracker",
          tools: "Python, BeautifulSoup, Flask, SQLite3, smtplib",
          description:
            "Automated price monitoring system that scrapes Amazon product pages and stores historical price data in SQLite3. Detects price drops and sends email alerts via smtplib. Built a Flask web dashboard with persistent storage to visualize price trends across tracked products.",
        },
        {
          project: "AI Stock Prediction System",
          tools: "Python, FinBERT, Prophet, XGBoost, LightGBM, MySQL, Plotly",
          description:
            "Multi-model stock forecasting system combining FinBERT sentiment analysis with time series predictions (Prophet, XGBoost, LightGBM). Fetches financial news, calculates technical indicators, and stores predictions in MySQL. Developed interactive Plotly dashboards for multi-ticker forecasting and trend visualization.",
        },
        {
          project: "Password Manager",
          tools: "Python, Tkinter, JSON, PyPerclip, Cryptography",
          description:
            "Secure credential management application with Tkinter GUI featuring encrypted password generation and storage. Implemented one-click clipboard copy via PyPerclip and complete CRUD operations with data validation. Uses industry-standard hashing for secure credential persistence in JSON format.",
        },
        {
          project: "Cookie Clicker Bot",
          tools: "Python, Selenium, Web Automation",
          description:
            "Automation script that plays Cookie Clicker by simulating user interactions and tracking game state. Detects screen elements to intelligently upgrade items and optimize score growth. Demonstrates automated testing concepts through interaction with dynamic, JavaScript-heavy web pages.",
        },
        {
          project: "Habit Tracker System",
          tools: "Python, Pixela API, datetime, JSON",
          description:
            "API-driven application that records daily habits (study, workout, coding) using the Pixela habit-tracking service. Sends dated entries with precise timestamps via datetime module for day-wise activity tracking. Converts API responses into visual progress charts displaying streaks and consistency patterns.",
        },
        {
          project: "Automated Form Filler",
          tools: "Python, Selenium, python-dotenv",
          description:
            "Browser automation bot that completes and submits complex online forms without manual input. Uses Selenium to interact with dynamic elements (text fields, dropdowns, buttons) on web pages. Injects sensitive credentials securely at runtime via environment variables, avoiding hard-coded credentials.",
        },
      ],
    },
    {
      title: "Education",
      icon: "🎓",
      items: [
        {
          institution: "Savitribai Phule Pune University, Pune",
          field: "Bachelor of Engineering - Artificial Intelligence And Data Science",
          duration: "2022–2026",
          description: "Third Year: 8.71 (1st Sem) SGPA",
        },
      ],
    },
    {
      title: "Certificates",
      icon: "🏆",
      certificates: [
        {
          name: "Python",
          url: "https://www.udemy.com/certificate/UC-00a25a21-81b8-4efc-a14e-27595bf6c7e3/",
        },
        {
          name: "HTML, CSS, and Java",
          url: "https://www.udemy.com/certificate/UC-256af704-be24-45d8-9ff3-e5a27c72094b/",
        },
      ],
    },
    {
      title: "Interests",
      icon: "⚽",
      items: ["Badminton", "Volleyball"],
    },
  ];

  return (
    <section ref={sectionRef} id="cv" className="py-24 sm:py-32 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div ref={headingRef} className="text-center mb-16 sm:mb-20">
          <h2 className="font-display text-sm uppercase tracking-[0.3em] text-primary mb-4">
            Curriculum Vitae
          </h2>
          <p className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-6">
            My Professional Journey
          </p>

          {/* Download Button */}
          <div className="mt-8 sm:mt-12 flex justify-center">
            <Button
              asChild
					    className="download-button rounded-full bg-white text-black py-2 px-4 shadow-lg hover:bg-gray-200 transition duration-300 ease-in-out">
              <a href="/CV.pdf" download="CV.pdf">
                <Download className="w-4 h-4" />
                Download CV (PDF)
              </a>
            </Button>
          </div>
        </div>

        {/* CV Content */}
        <div ref={contentRef} className="space-y-8">
          {/* Contact Information */}
          <div className="glass rounded-2xl p-6 sm:p-8 border border-border/50">
            <h3 className="text-lg font-bold text-foreground mb-4">
              Get in Touch
            </h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">
                  bagmaraashish@gmail.com
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">
                  +91 7588833694
                </span>
              </div>
              <div className="flex items-center gap-3">
                <ExternalLink className="w-5 h-5 text-primary" />
                <a
                  href="https://linkedin.com/in/aashishbagmar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  LinkedIn Profile
                </a>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-border/50">
              <a
                href="https://github.com/aashishbagmar/Projects"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                GitHub Projects
              </a>
            </div>
          </div>

          {/* CV Sections */}
          {cvSections.map((section, index) => (
            <div
              key={index}
              className="glass rounded-2xl p-6 sm:p-8 border border-border/50 hover:border-primary/50 transition-colors duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">{section.icon}</span>
                <h3 className="text-xl font-bold text-foreground">
                  {section.title}
                </h3>
              </div>

              {/* Simple content text */}
              {section.content && (
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {section.content}
                </p>
              )}

              {/* Skills list */}
              {section.skills && (
                <ul className="space-y-3">
                  {section.skills.map((skill, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-muted-foreground"
                    >
                      <span className="text-primary mt-1">•</span>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Experience/Education/Projects items */}
              {section.items && (
                <div className="space-y-6">
                  {section.items.map((item, idx) => (
                    <div key={idx} className="border-l-2 border-primary/30 pl-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                        <h4 className="font-semibold text-foreground">
                          {item.project || item.company || item.institution}
                        </h4>
                        {item.duration && (
                          <span className="text-xs text-primary font-medium bg-primary/10 px-2 py-1 rounded w-fit">
                            {item.duration}
                          </span>
                        )}
                      </div>
                      {(item.tools || item.role || item.field) && (
                        <p className="text-sm text-primary font-medium mb-2">
                          {item.tools || item.role || item.field}
                        </p>
                      )}
                      {item.description && (
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Certificates with links */}
              {section.certificates && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {section.certificates.map((cert, idx) => (
                    <a
                      key={idx}
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 rounded-lg bg-primary/10 border border-primary/30 hover:border-primary/60 hover:bg-primary/20 transition-all duration-300 group"
                    >
                      <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {cert.name}
                      </span>
                      <ExternalLink className="w-4 h-4 text-primary/60 group-hover:text-primary transition-colors" />
                    </a>
                  ))}
                </div>
              )}

              {/* Achievements list */}
              {Array.isArray(section.items) &&
                section.items.length > 0 &&
                typeof section.items[0] === "string" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {(section.items as string[]).map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20"
                      >
                        <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                )}
            </div>
          ))}

          {/* Call to Action */}
          <div className="glass rounded-2xl p-8 border border-primary/30 bg-gradient-to-r from-primary/10 to-secondary/10 text-center">
            <h3 className="text-xl font-bold text-foreground mb-3">
              Ready to Work Together?
            </h3>
            <p className="text-muted-foreground mb-6">
              Let's create something amazing together. Get in touch with me
              today.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Button
                asChild
                className="bg-slate-600 hover:bg-slate-700 text-white"
              >
                <a href="#contact">Contact Me</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CVSection;
