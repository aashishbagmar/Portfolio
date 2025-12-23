import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Github, Linkedin, Send, ArrowUpRight, Loader } from "lucide-react";
import emailjs from "@emailjs/browser";

gsap.registerPlugin(ScrollTrigger);

// Initialize EmailJS (replace with your public key)
emailjs.init("YOUR_PUBLIC_KEY_HERE");

const socials = [
  { name: "GitHub", icon: Github, url: "https://github.com/aashishbagmar/Projects", color: "hover:text-foreground" },
  { name: "LinkedIn", icon: Linkedin, url: "https://linkedin.com/in/aashishbagmar", color: "hover:text-blue-500" },
];

const CreativeContact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    message: "",
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left - rect.width / 2) * 0.15,
      y: (e.clientY - rect.top - rect.height / 2) * 0.15,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Replace with your actual service ID, template ID, and public key
      await emailjs.send(
        "service_nw8kx79", // Service ID
        "template_contact_form", // Template ID
        {
          to_email: "bagmaraashish@gmail.com",
          from_name: formData.from_name,
          from_email: formData.from_email,
          message: formData.message,
        },
        "XoV3k50LzjVbrhAMr" // Public Key
      );

      setFormStatus("success");
      setFormData({ from_name: "", from_email: "", message: "" });
      
      // Reset status after 5 seconds
      setTimeout(() => setFormStatus("idle"), 5000);
    } catch (error) {
      console.error("Email send error:", error);
      setFormStatus("error");
      
      // Reset status after 5 seconds
      setTimeout(() => setFormStatus("idle"), 5000);
    } finally {
      setIsLoading(false);
    }
  };

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

      gsap.from(formRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-24 sm:py-32 px-4 sm:px-6 relative"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div ref={headingRef} className="text-center mb-12 sm:mb-16">
          <h2 className="font-display text-sm uppercase tracking-[0.3em] text-primary mb-4">
            Contact
          </h2>
          <p className="text-2xl sm:text-3xl font-display font-bold text-foreground">
            Let's Work Together
          </p>
        </div>

        {/* Contact Form */}
        <div 
          className="text-center mb-12"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => {
            setIsHovering(false);
            setMousePos({ x: 0, y: 0 });
          }}
          style={{
            transform: isHovering
              ? `translate(${mousePos.x}px, ${mousePos.y}px)`
              : "translate(0, 0)",
            transition: "transform 0.3s ease-out",
          }}
        >
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="relative glass rounded-2xl sm:rounded-3xl px-6 sm:px-10 py-6 sm:py-8 border border-border/50 hover:border-primary/50 transition-all duration-300 space-y-4"
          >
            <div className="flex items-center gap-3 sm:gap-4 mb-4">
              <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
              <span className="text-xs sm:text-sm text-muted-foreground">Send me a message</span>
            </div>

            {/* Name Input */}
            <input
              type="text"
              name="from_name"
              placeholder="Your Name"
              value={formData.from_name}
              onChange={handleInputChange}
              required
              className="w-full bg-background/50 border border-border/50 rounded-lg px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
            />

            {/* Email Input */}
            <input
              type="email"
              name="from_email"
              placeholder="Your Email"
              value={formData.from_email}
              onChange={handleInputChange}
              required
              className="w-full bg-background/50 border border-border/50 rounded-lg px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
            />

            {/* Message Textarea */}
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full bg-background/50 border border-border/50 rounded-lg px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 transition-colors resize-none"
            />

            {/* Status Messages */}
            {formStatus === "success" && (
              <p className="text-emerald-400 text-sm">✓ Message sent successfully!</p>
            )}
            {formStatus === "error" && (
              <p className="text-red-400 text-sm">✗ Failed to send message. Please try again.</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-slate-600 hover:bg-slate-700 text-white rounded-lg px-4 py-2 font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Message
                </>
              )}
            </button>

            <ArrowUpRight className="absolute top-4 sm:top-6 right-4 sm:right-6 w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground group-hover:text-primary transition-all" />
          </form>
        </div>

        {/* Social links */}
        <div className="flex justify-center gap-4 mb-12">
          {socials.map((social, idx) => {
            const Icon = social.icon;
            return (
              <a
                key={idx}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl glass border border-border/50 flex items-center justify-center text-muted-foreground ${social.color} hover:border-primary/50 transition-all duration-300 hover:scale-110`}
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
            );
          })}
        </div>

        {/* Fun CTA */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Open to full-time roles, internships, and exciting projects
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-emerald-500/30 text-emerald-400 text-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Available for opportunities
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 sm:mt-24 pt-8 border-t border-border/30 text-center">
          <p className="text-sm text-muted-foreground">
            Designed & Built with{" "}
            <span className="text-primary">♥</span> by Aashish Bagmar
          </p>
          <p className="text-xs text-muted-foreground/50 mt-2">© 2024</p>
        </div>
      </div>
    </section>
  );
};

export default CreativeContact;
