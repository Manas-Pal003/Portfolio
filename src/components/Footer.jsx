import { ArrowUp, Heart, Mail } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faInstagram,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/Manas-Pal003",
      icon: faGithub,
      ariaLabel: "Visit Manas's GitHub profile",
      hoverClass:
        "hover:border-purple-500/60 hover:text-purple-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]",
      bgGradient:
        "bg-gradient-to-tr from-purple-500/20 via-purple-500/10 to-transparent",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/manas-pal-a60674309/",
      icon: faLinkedin,
      ariaLabel: "Connect with Manas on LinkedIn",
      hoverClass:
        "hover:border-blue-400/60 hover:text-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.45)]",
      bgGradient:
        "bg-gradient-to-tr from-blue-500/20 via-blue-500/10 to-transparent",
    },
    {
      name: "Instagram",
      href: "https://instagram.com",
      icon: faInstagram,
      ariaLabel: "Follow Manas on Instagram",
      hoverClass:
        "hover:border-pink-500/60 hover:text-pink-400 hover:shadow-[0_0_20px_rgba(236,72,153,0.45)]",
      bgGradient:
        "bg-gradient-to-tr from-pink-500/20 via-rose-500/10 to-transparent",
    },
    {
      name: "Email",
      href: "mailto:manaspal28313@gmail.com",
      isMail: true,
      ariaLabel: "Send an email to Manas",
      hoverClass:
        "hover:border-cyan-400/60 hover:text-cyan-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.45)]",
      bgGradient:
        "bg-gradient-to-tr from-cyan-500/20 via-teal-500/10 to-transparent",
    },
  ];

  return (
    <footer className="relative border-t border-border/50 bg-background/50 backdrop-blur-xl transition-colors">
      {/* Top glowing ambient highlight */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[1.5px] w-full max-w-4xl bg-gradient-to-r from-transparent via-purple-500/60 via-pink-500/40 to-transparent" />
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-10 w-2/3 max-w-2xl bg-purple-500/10 blur-2xl dark:bg-purple-500/20" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Left: Brand + copyright */}
          <div className="flex items-center gap-3">
            <a
              href="#hero"
              className="inline-flex items-center gap-2 group transition-opacity hover:opacity-80"
              aria-label="Back to home"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 via-pink-500 to-cyan-500 text-white font-black text-xs shadow-xs transition-transform duration-200 group-hover:scale-105">
                M
              </div>
              <span className="text-sm font-bold tracking-tight text-foreground">
                <span>Manas</span>{" "}
                <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
                  Pal
                </span>
              </span>
            </a>
            <span className="text-muted-foreground/30 hidden sm:inline">·</span>
            <span className="text-xs text-muted-foreground hidden sm:inline">
              &copy; {currentYear} All rights reserved.
            </span>
          </div>

          {/* Social Links Dock */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl border border-border/70 bg-card/40 backdrop-blur-xl shadow-xs">
            {socialLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                aria-label={item.ariaLabel}
                className={`group relative flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-background/50 text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:scale-105 active:scale-95 ${item.hoverClass}`}
              >
                {/* Floating Tooltip */}
                <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 z-30 px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide bg-foreground text-background opacity-0 shadow-lg transition-all duration-200 group-hover:-translate-y-0.5 group-hover:opacity-100 whitespace-nowrap">
                  {item.name}
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-foreground" />
                </span>

                {/* Ambient background glow gradient */}
                <span
                  className={`absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${item.bgGradient}`}
                />

                {/* Icon */}
                <span className="relative z-10 transition-transform duration-300 group-hover:scale-110">
                  {item.isMail ? (
                    <Mail className="h-4 w-4" />
                  ) : (
                    <FontAwesomeIcon icon={item.icon} className="h-4 w-4" />
                  )}
                </span>
              </a>
            ))}
          </div>

          {/* Right: Back to top */}
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top of page"
            className="group flex items-center gap-1.5 rounded-lg border border-border/60 bg-card/50 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all duration-200 hover:border-foreground/30 hover:bg-muted hover:text-foreground active:scale-95"
          >
            <span>Top</span>
            <ArrowUp className="h-3 w-3 transition-transform duration-200 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Mobile copyright */}
        <p className="sm:hidden text-center text-xs text-muted-foreground pt-2">
          &copy; {currentYear} All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
