import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import manasImg from "../../assets/manas.png";

export default function Hero3D() {
  const [isHovered, setIsHovered] = useState(false);

  // Normalized mouse coordinates from -0.5 to 0.5
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Silky smooth spring damping for 60fps 3D tilt
  const springConfig = { damping: 24, stiffness: 220, mass: 0.55 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // 3D rotation angles
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-12, 12]);

  // Dynamic holographic glare effect tracking cursor position
  const glareX = useTransform(smoothMouseX, [-0.5, 0.5], [15, 85]);
  const glareY = useTransform(smoothMouseY, [-0.5, 0.5], [15, 85]);
  const glareBackground = useTransform(
    [glareX, glareY],
    ([gx, gy]) =>
      `radial-gradient(circle 380px at ${gx}% ${gy}%, rgba(255, 255, 255, 0.26), transparent 70%), linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(6, 182, 212, 0.15))`
  );

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(px);
    mouseY.set(py);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const handleContactClick = (e) => {
    e.stopPropagation();
    const contactElement = document.getElementById("contact");
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "mailto:manaspal28313@gmail.com";
    }
  };

  return (
    <div
      className="relative w-[320px] sm:w-[380px] md:w-[415px] lg:w-[440px] aspect-[860/1040] flex items-center justify-center select-none"
      style={{ perspective: "1300px" }}
    >
      {/* 1. Ambient Floor Reflection & Glow */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[85%] h-14 bg-gradient-to-t from-transparent via-cyan-500/25 to-purple-600/30 blur-2xl rounded-full opacity-80 pointer-events-none" />

      {/* 2. Outer Ambient Neon Backglow */}
      <div className="absolute -inset-6 rounded-[52px] bg-gradient-to-tr from-cyan-500/30 via-indigo-600/30 to-fuchsia-500/35 blur-3xl opacity-75 transition-opacity duration-700 pointer-events-none" />

      {/* 3. Floating 3D Neon Orbs (Background Atmosphere) */}
      {/* Upper-Left Purple Orb */}
      <motion.div
        animate={{
          y: [-6, 6, -6],
          x: [-3, 3, -3],
          scale: [1, 1.08, 1],
        }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-3 -left-3 sm:-top-5 sm:-left-5 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-fuchsia-400 to-purple-700 shadow-[0_0_22px_#c026d3,0_0_10px_#a855f7] z-20 pointer-events-none"
      >
        <span className="absolute top-1 left-1 w-1.5 h-1.5 rounded-full bg-white/70 blur-[0.5px]" />
      </motion.div>

      {/* Mid-Right Cyan Orb */}
      <motion.div
        animate={{
          y: [6, -6, 6],
          x: [2, -3, 2],
          scale: [1, 1.12, 1],
        }}
        transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute top-1/2 -right-3 sm:-right-5 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-br from-cyan-300 to-blue-600 shadow-[0_0_20px_#06b6d4,0_0_8px_#38bdf8] z-20 pointer-events-none"
      >
        <span className="absolute top-0.5 left-0.5 w-1.5 h-1.5 rounded-full bg-white/80 blur-[0.5px]" />
      </motion.div>

      {/* Lower-Right Magenta Orb */}
      <motion.div
        animate={{
          y: [-5, 5, -5],
          scale: [0.95, 1.05, 0.95],
        }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-20 -right-4 sm:-right-6 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-br from-pink-400 to-purple-600 shadow-[0_0_18px_#e879f9] z-20 pointer-events-none"
      >
        <span className="absolute top-0.5 left-0.5 w-1 h-1 rounded-full bg-white/80" />
      </motion.div>

      {/* Ambient Celestial Sparkles */}
      <div className="absolute top-[22%] right-[8%] w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#06b6d4] animate-pulse pointer-events-none" />
      <div className="absolute top-[52%] left-[4%] w-1 h-1 rounded-full bg-purple-300 shadow-[0_0_6px_#a855f7] animate-pulse pointer-events-none" />
      <div className="absolute bottom-[28%] right-[5%] w-1.5 h-1.5 rounded-full bg-fuchsia-300 shadow-[0_0_8px_#d946ef] animate-pulse pointer-events-none" />

      {/* Ambient Orbital Rings behind the Card */}
      <svg
        className="absolute -inset-10 w-[calc(100%+80px)] h-[calc(100%+80px)] pointer-events-none opacity-40 z-0"
        viewBox="0 0 500 600"
        fill="none"
      >
        <ellipse
          cx="250"
          cy="300"
          rx="220"
          ry="170"
          stroke="url(#orbitGradient)"
          strokeWidth="1"
          strokeDasharray="4 8"
          transform="rotate(-25 250 300)"
        />
        <ellipse
          cx="250"
          cy="300"
          rx="240"
          ry="190"
          stroke="url(#orbitGradient2)"
          strokeWidth="0.8"
          transform="rotate(35 250 300)"
        />
        <defs>
          <linearGradient id="orbitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="orbitGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#c026d3" stopOpacity="0.2" />
          </linearGradient>
        </defs>
      </svg>

      {/* 4. Main 3D Tilting Card Container with Spring Physics */}
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        animate={isHovered ? { y: 0 } : { y: [0, -10, 0] }}
        transition={
          isHovered
            ? { duration: 0.25 }
            : { duration: 5.5, repeat: Infinity, ease: "easeInOut" }
        }
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="group relative w-full h-full rounded-[40px] cursor-pointer select-none p-[2.5px] bg-gradient-to-br from-fuchsia-500 via-purple-600 to-cyan-400 shadow-[0_0_35px_rgba(6,182,212,0.5),0_0_65px_rgba(192,38,211,0.4)]"
      >
        {/* Glowing Neon Border Rim Refraction */}
        <div
          className="relative w-full h-full rounded-[37.5px] overflow-hidden bg-[#090b20]/90 backdrop-blur-2xl border border-white/10"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* Inner Vignette and Glass Base Tint */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#140e32]/65 via-[#080c22]/75 to-[#040818]/90 pointer-events-none" />

          {/* Vibrant Radial Backlight Glow Behind Subject */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle 340px at 58% 38%, rgba(20, 115, 255, 0.62) 0%, rgba(147, 51, 234, 0.45) 42%, rgba(9, 11, 32, 0) 72%)",
            }}
          />

          {/* Secondary Electric Cyan Edge Rim Flare */}
          <div
            className="absolute -bottom-10 -right-8 w-64 h-64 pointer-events-none rounded-full"
            style={{
              background:
                "radial-gradient(circle at center, rgba(6, 182, 212, 0.4) 0%, transparent 65%)",
            }}
          />

          {/* Top-Left Vibrant Neon Magenta Flare */}
          <div
            className="absolute -top-10 -left-8 w-64 h-64 pointer-events-none rounded-full"
            style={{
              background:
                "radial-gradient(circle at center, rgba(217, 70, 239, 0.35) 0%, transparent 65%)",
            }}
          />

          {/* 5. TOP BADGE: "Available For Work" */}
          <div
            className="absolute top-5 left-5 sm:top-6 sm:left-6 z-30"
            style={{ transform: "translateZ(50px)" }}
          >
            {/* <div className="inline-flex items-center gap-2.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-slate-900/65 backdrop-blur-md border border-cyan-400/35 shadow-[0_4px_20px_rgba(0,0,0,0.4),0_0_15px_rgba(6,182,212,0.2)]">
              <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-emerald-500 shadow-[0_0_10px_#10b981]" />
              </span>
              <span className="text-white/95 text-[11px] sm:text-xs font-medium tracking-wide">
                Available For Work
              </span>
            </div> */}
          </div>

          {/* 6. SUBJECT PORTRAIT: manas.png in 3D Parallax Space */}
          <div
            className="absolute inset-0 flex items-end justify-center pointer-events-none overflow-hidden"
            style={{
              transform: "translateZ(30px)",
            }}
          >
            <img
              src={manasImg}
              alt="Manas Kumar Pal"
              className="w-[124%] sm:w-[128%] max-w-none h-auto object-contain select-none drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)]"
              style={{
                marginBottom: "-38px",
              }}
            />
          </div>

          {/* 7. BOTTOM DOCK OVERLAY: Floating Glass Widget */}
          <div
            className="absolute bottom-4 sm:bottom-5 left-4 right-4 sm:left-5 sm:right-5 z-40"
            style={{ transform: "translateZ(65px)" }}
          >
            <div className="p-2.5 sm:p-3 rounded-[22px] sm:rounded-[26px] bg-[#0c1028]/85 backdrop-blur-2xl border border-cyan-500/45 shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(6,182,212,0.3)] flex items-center justify-between gap-2 sm:gap-3">
              {/* Left Profile Details */}
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                {/* Circular Mini Avatar with Neon Halo */}
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full p-[2px] bg-gradient-to-tr from-fuchsia-500 via-purple-500 to-cyan-400 shadow-[0_0_12px_rgba(168,85,247,0.6)] shrink-0">
                  <div className="w-full h-full rounded-full overflow-hidden bg-slate-950 flex items-center justify-center">
                    <img
                      src={manasImg}
                      alt="Manas avatar"
                      className="w-full h-full object-cover pointer-events-none"
                      style={{
                        transform: "scale(2) translateY(24%)",
                        transformOrigin: "center center",
                      }}
                    />
                  </div>
                </div>

                {/* Name & Online Status */}
                <div className="flex flex-col text-left truncate">
                  <span className="text-white font-bold text-xs sm:text-sm tracking-tight leading-snug truncate">
                    @manaspal
                  </span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
                    <span className="text-emerald-400 text-[10px] sm:text-xs font-medium">
                      Online
                    </span>
                  </div>
                </div>
              </div>

              {/* Right CTA Button: Contact Me */}
              <button
                type="button"
                onClick={handleContactClick}
                className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full border border-purple-500/70 hover:border-cyan-400 bg-gradient-to-r from-purple-600/25 to-indigo-600/25 hover:from-purple-600/45 hover:to-cyan-600/45 transition-all duration-300 shadow-[0_0_16px_rgba(168,85,247,0.35)] hover:shadow-[0_0_24px_rgba(6,182,212,0.5)] flex items-center gap-1.5 group/btn cursor-pointer active:scale-95 shrink-0"
              >
                <span className="text-white text-xs sm:text-sm font-semibold">
                  Contact Me
                </span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white transition-transform duration-300 group-hover/btn:translate-x-1" />
              </button>
            </div>
          </div>

          {/* 8. Dynamic Specular Holographic Glare Layer */}
          <motion.div
            className="pointer-events-none absolute inset-0 z-50 transition-opacity duration-300 rounded-[37.5px]"
            style={{
              background: glareBackground,
              opacity: isHovered ? 0.6 : 0.12,
              transform: "translateZ(75px)",
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}
