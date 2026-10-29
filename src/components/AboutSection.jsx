import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { ArrowUpRight, Download, Sparkles } from "lucide-react";

// Smooth animated number counter component
const Counter = ({
  value,
  duration = 2,
  decimals = 0,
  prefix = "",
  suffix = "",
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        setDisplayValue(latest);
      },
      onComplete: () => {
        setDisplayValue(value);
      },
    });

    return () => controls.stop();
  }, [isInView, value, duration]);

  const formattedNumber =
    decimals > 0
      ? displayValue.toFixed(decimals)
      : Math.round(displayValue);

  return (
    <span ref={ref} className="inline-flex items-center">
      {prefix}
      {formattedNumber}
      {suffix}
    </span>
  );
};

export const AboutSection = () => {
  const stats = [
    {
      numericValue: 3,
      suffix: "+",
      decimals: 0,
      label: "Projects Finished",
    },
    {
      numericValue: 20,
      suffix: "+",
      decimals: 0,
      label: "Technologies Worked With",
    },
    {
      numericValue: 8.35,
      suffix: "",
      decimals: 2,
      label: "CGPA",
    },
  ];

  return (
    <section
      id="about"
      className="relative overflow-hidden px-6 py-24 md:py-32 bg-transparent"
    >
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[450px] w-[450px] rounded-full bg-purple-600/10 blur-[140px]" />
      <div className="pointer-events-none absolute -left-40 top-20 h-[320px] w-[320px] rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* SECTION BADGE */}
        {/* <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex items-center gap-3"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs sm:text-sm font-medium backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.15)]">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>About Me</span>
          </div>
          <span className="h-px w-12 bg-gradient-to-r from-purple-500/40 to-transparent" />
        </motion.div> */}

        {/* MAIN CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* HEADING */}
          <h2 className="text-4xl sm:text-6xl font-extrabold leading-[1.1] tracking-tight text-left">
            About{" "}
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 dark:from-purple-400 dark:via-pink-400 dark:to-cyan-400 bg-clip-text text-transparent">
              Me
            </span>
          </h2>

          {/* DESCRIPTION */}
          <div className="mt-8 space-y-5 text-base sm:text-lg leading-relaxed text-slate-600 dark:text-gray-300 text-left max-w-4xl">
            <p>
              I'm{" "}
              <span className="font-semibold text-slate-900 dark:text-foreground">
                Manas Kumar Pal
              </span>
              , a{" "}
              <span className="font-semibold bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 dark:from-purple-400 dark:via-pink-400 dark:to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(168,85,247,0.25)]">
                B.Tech
              </span>{" "}
              graduate and{" "}
              <span className="font-semibold text-slate-900 dark:text-foreground">
                Full Stack Developer
              </span>{" "}
              passionate about building modern, high-performance web applications with intuitive,
              engaging user experiences.
            </p>

            <p>
              I specialize in full-stack technologies including{" "}
              <span className="text-cyan-700 dark:text-cyan-300 font-semibold">React</span>,{" "}
              <span className="text-slate-900 dark:text-neutral-200 font-semibold">Next.js</span>,{" "}
              <span className="text-sky-700 dark:text-sky-300 font-semibold">Tailwind CSS</span>,{" "}
              <span className="text-emerald-700 dark:text-emerald-300 font-semibold">Node.js</span>, and{" "}
              <span className="text-purple-700 dark:text-purple-300 font-semibold">
                Artificial Intelligence
              </span>
              , blending creativity with technical precision to architect scalable,
              elegant digital products.
            </p>

            <p>
              With hands-on experience developing real-world projects and
              AI-powered applications, I am committed to continuous learning,
              solving complex engineering challenges, and building software that delivers
              tangible impact.
            </p>
          </div>

          {/* STATS COUNTER */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 rounded-2xl border border-slate-200/90 bg-white/90 dark:border-white/10 dark:bg-white/[0.02] backdrop-blur-md overflow-hidden shadow-lg shadow-purple-500/5 dark:shadow-none">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                className={`group p-6 sm:p-8 flex flex-col items-start hover:bg-purple-500/[0.03] dark:hover:bg-white/[0.04] transition-all duration-300 ${
                  index !== 0
                    ? "border-t border-slate-200/90 dark:border-white/10 sm:border-l sm:border-t-0"
                    : ""
                }`}
              >
                <div className="text-4xl sm:text-5xl font-extrabold tracking-tight transition-transform duration-300 group-hover:scale-105">
                  <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 dark:from-purple-400 dark:via-pink-400 dark:to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(168,85,247,0.25)]">
                    <Counter
                      value={stat.numericValue}
                      decimals={stat.decimals}
                      suffix={stat.suffix}
                    />
                  </span>
                </div>

                <p className="mt-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.08em] text-slate-500 dark:text-muted-foreground group-hover:text-slate-900 dark:group-hover:text-neutral-200 transition-colors">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* QUOTE BANNER */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 via-background/40 to-cyan-500/10 border border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 backdrop-blur-sm"
          >
            <div>
              <p className="text-lg md:text-xl italic text-gray-300">
                "Building ideas into real-world solutions."
              </p>
              <div className="mt-3 flex items-center gap-2.5">
                <span className="h-0.5 w-8 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full" />
                <span className="text-xs sm:text-sm font-medium text-purple-300">
                  Manas Kumar Pal
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1.5 rounded-full w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10b981]" />
              Available for Opportunities
            </div>
          </motion.div> */}
        </motion.div>
      </div>
    </section>
  );
};






