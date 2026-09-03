import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import selfImage from "../../assets/manas.png";

export default function Hero3D() {
  const [isHovered, setIsHovered] = useState(false);

  // Normalized mouse coordinates from -0.5 to 0.5
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Silky smooth spring damping for 60fps tilt
  const springConfig = { damping: 24, stiffness: 220, mass: 0.6 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // 3D rotation angles
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [16, -16]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-16, 16]);

  // Dynamic holographic glare effect tracking cursor position
  const glareX = useTransform(smoothMouseX, [-0.5, 0.5], [15, 85]);
  const glareY = useTransform(smoothMouseY, [-0.5, 0.5], [15, 85]);
  const glareBackground = useTransform(
    [glareX, glareY],
    ([gx, gy]) =>
      `radial-gradient(circle 360px at ${gx}% ${gy}%, rgba(255, 255, 255, 0.22), transparent 70%), linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(6, 182, 212, 0.15))`
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

  return (
    <div
      className="relative w-[360px] sm:w-[410px] md:w-[430px] h-[530px] sm:h-[560px] flex items-center justify-center"
      style={{ perspective: "1200px" }}
    >
      {/* Ambient Neon Backglow */}
      <div className="absolute -inset-4 rounded-[40px] bg-gradient-to-tr from-cyan-500/25 via-purple-600/35 to-pink-500/25 blur-3xl opacity-60 transition-opacity duration-700 pointer-events-none" />

      {/* Main 3D Tilting Card with Idle Levitation when not hovered */}
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
        className="group relative w-full h-full rounded-[34px] p-[2px] bg-gradient-to-b from-cyan-400/60 via-purple-500/50 to-pink-500/60 shadow-[0_25px_60px_-15px_rgba(15,23,42,0.9),0_0_50px_rgba(168,85,247,0.3)] cursor-pointer select-none"
      >
        {/* Inner Card Body */}
        <div
          className="relative w-full h-full rounded-[32px] overflow-hidden bg-[#070b1e] border border-white/10"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Portrait Image Layer with 3D Depth */}
          <div
            className="relative w-full h-full overflow-hidden"
            style={{
              transform: "translateZ(35px)",
              transformStyle: "preserve-3d",
            }}
          >
            <img
              src={selfImage}
              alt="Manas Kumar Pal"
              className="w-full h-full object-cover object-[center_15%] scale-105"
            />

            {/* Dark Blend Vignettes */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/35 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_45%,rgba(5,8,22,0.85)_100%)]" />


          </div>

          {/* Dynamic Specular Holographic Glare Layer */}
          <motion.div
            className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300"
            style={{
              background: glareBackground,
              opacity: isHovered ? 0.75 : 0.15,
              transform: "translateZ(20px)",
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}
