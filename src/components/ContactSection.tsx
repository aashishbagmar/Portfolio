import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Linkedin, Twitter, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const emailRef = useRef<HTMLAnchorElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = emailRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const x = (e.clientX - rect.left - rect.width / 2) / 10;
    const y = (e.clientY - rect.top - rect.height / 2) / 10;
    
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

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

      gsap.from(emailRef.current, {
        scrollTrigger: {
          trigger: emailRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const socials = [
    { icon: Github, label: "GitHub", href: "#" },
    { icon: Linkedin, label: "LinkedIn", href: "#" },
    { icon: Twitter, label: "Twitter", href: "#" },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-32 px-6 mb-24"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2
          ref={headingRef}
          className="font-display text-sm uppercase tracking-[0.3em] text-primary mb-8"
        >
          Get in Touch
        </h2>

        <p className="font-body text-muted-foreground text-lg mb-12 max-w-md mx-auto">
          Have a project in mind or just want to chat? I'd love to hear from you.
        </p>

        {/* Large interactive email link */}
        <a
          ref={emailRef}
          href="mailto:bagmaraashish@gmail.com"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="magnetic-target group relative inline-flex items-center gap-4 font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold transition-all duration-300"
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          }}
        >
          <span className="link-hover text-gradient">
            bagmaraashish@gmail.com
          </span>
          <ArrowUpRight className="w-8 h-8 md:w-12 md:h-12 text-primary opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
        </a>

        {/* Social links */}
        <div className="flex items-center justify-center gap-6 mt-16">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              className="magnetic-target group p-4 rounded-full glass hover:bg-primary/10 transition-all duration-300"
              aria-label={social.label}
            >
              <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          ))}
        </div>

        {/* Footer note */}
        <p className="font-body text-xs text-muted-foreground mt-24 tracking-wide">
          © 2025 Aashish Bagmar. Built with React & GSAP.
        </p>
      </div>
    </section>
  );
};

export default ContactSection;
