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
} from "@fortawesome/free-brands-svg-icons";
import { motion } from "framer-motion";
import Hero3D from "./three/Hero3D";

export const HeroSection = () => {
  const techStack = [
    {
      name: "React.js",
      border: "border-cyan-500/30",
      text: "text-cyan-300",
      bg: "bg-cyan-500/10",
      hoverShadow: "hover:shadow-[0_0_15px_rgba(6,182,212,0.35)]",
      icon: <FontAwesomeIcon icon={faReact} className="w-3.5 h-3.5 text-cyan-400" />,
    },
    {
      name: "Node.js",
      border: "border-emerald-500/30",
      text: "text-emerald-300",
      bg: "bg-emerald-500/10",
      hoverShadow: "hover:shadow-[0_0_15px_rgba(16,185,129,0.35)]",
      icon: <FontAwesomeIcon icon={faNodeJs} className="w-3.5 h-3.5 text-emerald-400" />,
    },
    {
      name: "Express.js",
      border: "border-gray-500/30",
      text: "text-gray-200",
      bg: "bg-gray-500/10",
      hoverShadow: "hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]",
      icon: (
        <span className="font-bold text-[10px] px-1 py-0.2 rounded bg-white/10 text-white border border-white/15 leading-none">
          ex
        </span>
      ),
    },
    {
      name: "MongoDB",
      border: "border-green-500/30",
      text: "text-green-300",
      bg: "bg-green-500/10",
      hoverShadow: "hover:shadow-[0_0_15px_rgba(34,197,94,0.35)]",
      icon: (
        <svg className="w-3.5 h-3.5 text-green-400 fill-current" viewBox="0 0 24 24">
          <path d="M17.193 9.555c-1.264-5.24-4.804-7.555-5.193-7.555 0 0-3.93 2.315-5.193 7.555-1.42 5.882 1.942 10.428 5.193 12.445 3.251-2.017 6.613-6.563 5.193-12.445zm-5.193 10.373c-2.313-1.464-4.707-4.887-3.642-9.3 1.066-4.414 3.642-6.512 3.642-6.512s2.576 2.098 3.642 6.512c1.065 4.413-1.329 7.836-3.642 9.3z" />
        </svg>
      ),
    },
    {
      name: "AI",
      border: "border-purple-500/30",
      text: "text-purple-300",
      bg: "bg-purple-500/10",
      hoverShadow: "hover:shadow-[0_0_15px_rgba(168,85,247,0.35)]",
      icon: <Sparkles className="w-3.5 h-3.5 text-purple-400" />,
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
            y: [0, -6, 0],
          }}
          transition={{
            opacity: { duration: 0.8 },
            x: { duration: 0.8 },
            y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          }}
          className="space-y-6 text-left flex flex-col items-start"
        >
          {/* BADGE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs sm:text-sm font-medium backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.15)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Full Stack Developer
          </motion.div>

          {/* TITLE */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.15] text-left">
            Hi, I'm <br />
            <span className="text-white">Manas </span>
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Kumar Pal
            </span>
          </h1>

          {/* DESCRIPTION */}
          <p className="text-base sm:text-lg text-gray-300 max-w-xl leading-relaxed text-left">
            Final-year Computer Science student and Full Stack Developer
            building modern web applications, AI-powered solutions, and
            scalable backend systems using React, Node.js, and databases.
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
              View My Work
              <ArrowUpRight size={18} />
            </a>

            <a
              href="/resume.pdf"
              className="px-6 py-2.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center gap-2 hover:bg-white/10 hover:border-white/40 transition duration-300 text-sm font-medium text-white"
            >
              Download CV
              <Download size={18} />
            </a>
          </div>

          {/* SOCIAL / CONNECT */}
          <div className="space-y-2.5 pt-2 text-left">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Connect with me
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/Manas-Pal003"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-purple-400 hover:bg-purple-500/10 hover:text-purple-400 flex items-center justify-center text-gray-300 transition-all duration-300"
              >
                <FontAwesomeIcon icon={faGithub} className="w-5 h-5" />
              </a>

              <a
                href="https://www.linkedin.com/in/manas-pal-a60674309/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-purple-400 hover:bg-purple-500/10 hover:text-purple-400 flex items-center justify-center text-gray-300 transition-all duration-300"
              >
                <FontAwesomeIcon icon={faLinkedin} className="w-5 h-5" />
              </a>

              <a
                href="mailto:manaspal28313@gmail.com"
                aria-label="Email"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-purple-400 hover:bg-purple-500/10 hover:text-purple-400 flex items-center justify-center text-gray-300 transition-all duration-300"
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

        <span className="text-sm text-muted-foreground">
          Scroll
        </span>


        <ArrowDown
        className="
        h-5
        w-5
        text-purple-400
        "
        />


      </div>




    </section>

  );
};