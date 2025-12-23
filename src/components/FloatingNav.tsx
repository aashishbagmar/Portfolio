import { Home, User, Zap, Rocket, Briefcase, Mail } from "lucide-react";

const navItems = [
  { icon: Home, label: "Home", href: "#home" },
  { icon: User, label: "About", href: "#about" },
  { icon: Zap, label: "Skills", href: "#skills" },
  { icon: Rocket, label: "Journey", href: "#journey" },
  { icon: Briefcase, label: "Work", href: "#work" },
  { icon: Mail, label: "Contact", href: "#contact" },
];

const FloatingNav = () => {
  const handleClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100]">
      <div className="glass-strong px-6 py-3 rounded-full flex items-center gap-1">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => handleClick(item.href)}
            className="magnetic-target group relative p-3 rounded-full transition-all duration-300 hover:bg-primary/10"
            aria-label={item.label}
          >
            <item.icon className="w-5 h-5 text-muted-foreground transition-colors group-hover:text-primary" />
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 text-xs font-medium bg-foreground text-background rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default FloatingNav;
