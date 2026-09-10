import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu } from "lucide-react";
import { cn } from "../lib/utils";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const isClickScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Skip scroll-spy while smooth scrolling from a user click to avoid jumping
      if (isClickScrollingRef.current) return;

      const scrollPosition = window.scrollY + 160;
      for (let i = navItems.length - 1; i >= 0; i--) {
        const id = navItems[i].href.replace("#", "");
        const element = document.getElementById(id);
        if (element && scrollPosition >= element.offsetTop) {
          setActiveSection(navItems[i].name);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const handleNavClick = (e, href, name) => {
    e.preventDefault();
    setActiveSection(name);
    setIsMenuOpen(false);

    // Lock scroll-spy during the smooth scroll animation
    isClickScrollingRef.current = true;
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      isClickScrollingRef.current = false;
    }, 850);

    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: "smooth",
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-6 pt-3 sm:pt-4">
      <nav
        className={cn(
          "mx-auto max-w-5xl flex items-center justify-between rounded-full px-5 sm:px-6 py-2.5 sm:py-3",
          "backdrop-blur-xl border border-border/60 dark:border-white/10",
          "bg-background/70 dark:bg-card/60 shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)]",
          "transition-[background-color,border-color,box-shadow] duration-300",
          isScrolled && "bg-background/85 dark:bg-card/85 shadow-lg border-purple-500/20"
        )}
      >
        {/* Brand Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "#hero", "Home")}
          className="group flex items-center gap-2.5 transition-opacity hover:opacity-90 select-none"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 via-pink-500 to-cyan-400 text-white font-black text-sm shadow-[0_0_12px_rgba(168,85,247,0.35)] transition-transform duration-300 group-hover:scale-105">
            M
          </div>
          <span className="text-base sm:text-lg font-bold tracking-tight text-foreground">
            Manas{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Portfolio
            </span>
          </span>
        </a>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.name;
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href, item.name)}
                className={cn(
                  "relative px-4 py-1.5 text-sm font-medium rounded-full select-none transition-colors duration-200",
                  isActive
                    ? "text-purple-400"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="navbarActivePill"
                    className="absolute inset-0 rounded-full bg-purple-500/15 border border-purple-500/30 shadow-[0_0_12px_rgba(168,85,247,0.2)] pointer-events-none"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.name}</span>
              </a>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="md:hidden p-2 rounded-lg text-foreground hover:bg-white/10 transition-colors"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-2 mx-auto max-w-5xl rounded-2xl backdrop-blur-xl bg-background/95 dark:bg-card/95 border border-border/70 dark:border-white/10 p-3 shadow-xl flex flex-col space-y-1"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.name;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href, item.name)}
                  className={cn(
                    "px-4 py-2.5 rounded-xl text-sm font-medium transition-colors",
                    isActive
                      ? "bg-purple-500/15 text-purple-400 font-medium border border-purple-500/30"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  )}
                >
                  {item.name}
                </a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;


