import { motion } from "framer-motion";
import { ArrowUpRight, Download, Sparkles } from "lucide-react";

export const AboutSection = () => {
  const stats = [
    {
      value: "3+",
      label: "Projects Finished",
    },
    {
      value: "20+",
      label: "Technologies Worked With",
    },
    {
      value: "8.35",
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
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Me
            </span>
          </h2>

          {/* DESCRIPTION */}
          <div className="mt-8 space-y-5 text-base sm:text-lg leading-relaxed text-muted-foreground text-left max-w-4xl">
            <p>
              I'm{" "}
              <span className="font-semibold text-foreground">
                Manas Kumar Pal
              </span>
              , a B.Tech graduate and Full Stack Developer passionate about
              building modern, high-performance web applications with intuitive,
              engaging user experiences.
            </p>

            <p>
              I specialize in full-stack technologies including{" "}
              <span className="text-cyan-300 font-medium">React</span>,{" "}
              <span className="text-neutral-200 font-medium">Next.js</span>,{" "}
              <span className="text-sky-300 font-medium">Tailwind CSS</span>,{" "}
              <span className="text-emerald-300 font-medium">Node.js</span>, and{" "}
              <span className="text-purple-300 font-medium">
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

          {/* ACTION BUTTONS */}
          {/* <div className="flex flex-wrap items-center gap-4 mt-8">
            <a
              href="#contact"
              className="cosmic-button inline-flex items-center gap-2 font-medium"
            >
              Get in Touch
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href="/resume.pdf"
              download
              className="px-6 py-2.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center gap-2 hover:bg-white/10 hover:border-white/40 transition duration-300 text-sm font-medium text-white"
            >
              Download CV
              <Download className="w-4 h-4" />
            </a>
          </div> */}

          {/* STATS */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm overflow-hidden">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                className={`p-6 sm:p-8 flex flex-col items-start ${
                  index !== 0
                    ? "border-t border-white/10 sm:border-l sm:border-t-0"
                    : ""
                }`}
              >
                <div className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                    {stat.value}
                  </span>
                </div>

                <p className="mt-2 text-xs sm:text-sm font-medium uppercase tracking-[0.08em] text-muted-foreground">
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