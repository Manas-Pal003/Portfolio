import {
  ArrowDown,
  Download,
  ArrowUpRight,
  Mail,
  Sparkles,
} from "lucide-react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faReact,
  faNodeJs,
  faTailwindCss,
} from "@fortawesome/free-brands-svg-icons";
import { motion } from "framer-motion";
import Hero3D from "./three/Hero3D";
import ShinyText from "./shinytext/ShinyText";

export const HeroSection = () => {
  const techStack = [
    {
      name: "React.js",
      border: "border-cyan-500/30",
      text: "text-cyan-700 dark:text-cyan-300",
      bg: "bg-cyan-500/10",
      hoverShadow: "hover:shadow-[0_0_15px_rgba(6,182,212,0.35)]",
      icon: <FontAwesomeIcon icon={faReact} className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />,
    },
    {
      name: "Next.js",
      border: "border-border/80 dark:border-white/20",
      text: "text-foreground dark:text-neutral-200",
      bg: "bg-muted/70 dark:bg-white/5",
      hoverShadow: "hover:shadow-[0_0_15px_rgba(168,85,247,0.25)]",
      icon: (
        <svg className="w-3.5 h-3.5 text-foreground dark:text-white fill-current" viewBox="0 0 24 24">
          <path d="M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z" />
        </svg>
      ),
    },
    {
      name: "Tailwind CSS",
      border: "border-sky-500/30",
      text: "text-sky-700 dark:text-sky-300",
      bg: "bg-sky-500/10",
      hoverShadow: "hover:shadow-[0_0_15px_rgba(14,165,233,0.35)]",
      icon: <FontAwesomeIcon icon={faTailwindCss} className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />,
    },
    {
      name: "Node.js",
      border: "border-emerald-500/30",
      text: "text-emerald-700 dark:text-emerald-300",
      bg: "bg-emerald-500/10",
      hoverShadow: "hover:shadow-[0_0_15px_rgba(168,85,247,0.35)]",
      icon: <FontAwesomeIcon icon={faNodeJs} className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />,
    },
    {
      name: "AI",
      border: "border-purple-500/30",
      text: "text-purple-700 dark:text-purple-300",
      bg: "bg-purple-500/10",
      hoverShadow: "hover:shadow-[0_0_15px_rgba(168,85,247,0.35)]",
      icon: <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />,
    },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center px-6 overflow-hidden"
    >
      <div className="container max-w-7xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center z-10 pt-24 pb-16">
        {/* LEFT SIDE */}
        <motion.div
          initial={{
            opacity: 0,
            x: -60,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          className="space-y-6 text-left flex flex-col items-start"
        >
          {/* BADGE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-xs sm:text-sm font-medium backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.15)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-purple-700 dark:text-purple-300 font-semibold tracking-wide">
              Full Stack Developer
            </span>
          </motion.div>


          {/* TITLE */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.15] text-left">
            <ShinyText text="Hi, I'm" disabled={false} speed={3.5} /> <br />
            <ShinyText text="Manas" disabled={false} speed={3.5} className="mr-3" />
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 dark:from-purple-400 dark:via-pink-400 dark:to-cyan-400 bg-clip-text text-transparent">
              Kumar Pal
            </span>
          </h1>

          {/* DESCRIPTION */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-gray-300 max-w-xl leading-relaxed text-left font-normal">
            I build modern, scalable web experiences and AI-powered solutions that turn ideas into meaningful digital products.
          </p>

          {/* TECH STACK */}
          <div className="flex flex-wrap gap-2.5 justify-start">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ scale: 1.08, y: -3 }}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border backdrop-blur-xl text-xs sm:text-sm font-medium transition-all duration-300 ${tech.bg} ${tech.border} ${tech.text} ${tech.hoverShadow}`}
              >
                {tech.icon}
                <span>{tech.name}</span>
              </motion.div>
            ))}
          </div>

          {/* BUTTONS */}
          <div className="flex gap-4 flex-wrap items-center justify-start pt-2">
            <a
              href="#projects"
              className="cosmic-button flex items-center gap-2 font-medium"
            >
              <span className="text-white font-semibold">View My Work</span>
              <ArrowUpRight size={18} className="text-white" />
            </a>

            <a
              href="/Manas Pal - Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-full border border-slate-200/90 bg-white/90 dark:border-white/20 dark:bg-white/5 backdrop-blur-md flex items-center gap-2 hover:bg-purple-50 dark:hover:bg-white/10 hover:border-purple-400/60 dark:hover:border-white/40 hover:text-purple-700 dark:hover:text-white transition duration-300 text-sm font-medium text-slate-800 dark:text-white cursor-pointer shadow-sm dark:shadow-xs"
            >
              <span className="font-medium">Download CV</span>
              <Download size={18} />
            </a>
          </div>

          {/* SOCIAL / CONNECT */}
          <div className="space-y-2.5 pt-2 text-left">
            <p className="text-xs font-semibold text-slate-500 dark:text-muted-foreground uppercase tracking-wider">
              Connect with me
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/Manas-Pal003"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="w-10 h-10 rounded-full bg-white/90 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-purple-400 hover:bg-purple-500/10 hover:text-purple-600 dark:hover:text-purple-400 flex items-center justify-center text-slate-600 dark:text-gray-300 shadow-sm dark:shadow-xs transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <FontAwesomeIcon icon={faGithub} className="w-5 h-5" />
              </a>

              <a
                href="https://www.linkedin.com/in/manas-pal-a60674309/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full bg-white/90 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-purple-400 hover:bg-purple-500/10 hover:text-purple-600 dark:hover:text-purple-400 flex items-center justify-center text-slate-600 dark:text-gray-300 shadow-sm dark:shadow-xs transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <FontAwesomeIcon icon={faLinkedin} className="w-5 h-5" />
              </a>

              <a
                href="mailto:manaspal28313@gmail.com"
                aria-label="Email"
                className="w-10 h-10 rounded-full bg-white/90 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-purple-400 hover:bg-purple-500/10 hover:text-purple-600 dark:hover:text-purple-400 flex items-center justify-center text-slate-600 dark:text-gray-300 shadow-sm dark:shadow-xs transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>







        {/* RIGHT 3D SECTION */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
            x: 50,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            x: 0,
          }}
          transition={{
            duration: 0.9,
            ease: "easeOut",
          }}
          className="flex justify-center items-center relative py-4"
        >
          <Hero3D />
        </motion.div>



      </div>








      {/* SCROLL INDICATOR */}


      <div
      className="
      absolute
      bottom-8
      left-1/2
      -translate-x-1/2
      flex
      flex-col
      items-center
      animate-bounce
      "
      >

        <span className="text-sm font-medium text-slate-500 dark:text-muted-foreground">
          Scroll
        </span>


        <ArrowDown
        className="
        h-5
        w-5
        text-purple-600
        dark:text-purple-400
        "
        />


      </div>




    </section>

  );
};