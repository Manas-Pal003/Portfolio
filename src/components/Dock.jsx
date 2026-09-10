"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  Children,
  cloneElement,
  useEffect,
  useRef,
  useState,
} from "react";
import { Home, CircleUserRound, Archive } from "lucide-react";

import "./Dock.css";

function DockItem({
  children,
  className = "",
  onClick,
  mouseX,
  spring,
  distance,
  magnification,
  baseItemSize,
  hoverClass = "",
  bgGradient = "",
}) {
  const ref = useRef(null);
  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mouseX, (val) => {
    const rect = ref.current?.getBoundingClientRect() ?? {
      x: 0,
      width: baseItemSize,
    };
    return val - rect.x - baseItemSize / 2;
  });

  const targetSize = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [baseItemSize, magnification, baseItemSize]
  );
  const size = useSpring(targetSize, spring);

  return (
    <motion.div
      ref={ref}
      style={{
        width: size,
        height: size,
        position: "relative",
        zIndex: 2,
      }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      onClick={onClick}
      className={`group dock-item ${hoverClass} ${className}`}
      tabIndex={0}
      role="button"
    >
      {/* Background gradient on hover */}
      {bgGradient && (
        <span
          className={`
            absolute inset-0 rounded-xl
            opacity-0
            transition-opacity duration-300
            group-hover:opacity-100
            ${bgGradient}
          `}
        />
      )}

      {Children.map(children, (child) =>
        cloneElement(child, { isHovered })
      )}
    </motion.div>
  );
}

function DockLabel({ children, className = "", ...rest }) {
  const { isHovered } = rest;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isHovered) return;
    const unsubscribe = isHovered.on("change", (latest) => {
      setIsVisible(latest === 1);
    });
    return () => unsubscribe();
  }, [isHovered]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 4, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: 2, x: "-50%" }}
          transition={{ duration: 0.18 }}
          className={`dock-label ${className}`}
          role="tooltip"
          style={{
            pointerEvents: "none",
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DockIcon({ children, className = "" }) {
  return <div className={`dock-icon ${className}`}>{children}</div>;
}

const defaultDockItems = [
  {
    label: "Home",
    icon: <Home className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />,
    hoverClass:
      "hover:border-purple-500/60 hover:text-purple-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]",
    bgGradient:
      "bg-gradient-to-tr from-purple-500/20 via-purple-500/10 to-transparent",
    onClick: () => {
      const el = document.getElementById("hero");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    },
  },
  {
    label: "About",
    icon: <CircleUserRound className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />,
    hoverClass:
      "hover:border-blue-400/60 hover:text-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.45)]",
    bgGradient:
      "bg-gradient-to-tr from-blue-500/20 via-blue-500/10 to-transparent",
    onClick: () => {
      const el = document.getElementById("about");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    },
  },
  {
    label: "Projects",
    icon: <Archive className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />,
    hoverClass:
      "hover:border-pink-500/60 hover:text-pink-400 hover:shadow-[0_0_20px_rgba(236,72,153,0.45)]",
    bgGradient:
      "bg-gradient-to-tr from-pink-500/20 via-rose-500/10 to-transparent",
    onClick: () => {
      const el = document.getElementById("projects");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    },
  },
];

export function Dock({
  items = defaultDockItems,
  className = "",
  spring = { mass: 0.1, stiffness: 160, damping: 14 },
  magnification = 48,
  distance = 110,
  panelHeight = 52,
  baseItemSize = 40,
}) {
  const mouseX = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);

  return (
    <motion.div className="dock-outer" style={{ overflow: "visible" }}>
      <motion.div
        onMouseMove={(e) => {
          isHovered.set(1);
          mouseX.set(e.clientX ?? e.pageX);
        }}
        onMouseLeave={() => {
          isHovered.set(0);
          mouseX.set(Infinity);
        }}
        className={`dock-panel ${className}`}
        style={{
          height: panelHeight,
          overflow: "visible",
        }}
        role="toolbar"
      >
        {items.map((item, index) => (
          <DockItem
            key={index}
            onClick={item.onClick}
            className={item.className}
            hoverClass={item.hoverClass}
            bgGradient={item.bgGradient}
            mouseX={mouseX}
            spring={spring}
            distance={distance}
            magnification={magnification}
            baseItemSize={baseItemSize}
          >
            <DockIcon>{item.icon}</DockIcon>
            <DockLabel>{item.label}</DockLabel>
          </DockItem>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default Dock;
