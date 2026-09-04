import { motion } from "framer-motion";
import { listTools } from "../data";

export const SkillsSection = () => {
  return (
    <section
      id="skills"
      className="
        relative
        overflow-hidden
        bg-transparent
        px-6
        py-24
        md:py-32
      "
    >
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute -left-40 top-10 h-[350px] w-[350px] rounded-full bg-purple-500/5 blur-[130px] dark:bg-purple-500/10 z-0" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[350px] w-[350px] rounded-full bg-cyan-500/5 blur-[130px] dark:bg-cyan-500/10 z-0" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* HEADING */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
          }}
        >
          <h2
            className="
              text-4xl
              font-bold
              leading-tight
              tracking-tight
              text-foreground
              sm:text-5xl
            "
          >
            Tools &amp; Technologies
          </h2>

          <p
            className="
              mt-3
              text-base
              text-muted-foreground
              sm:text-lg
            "
          >
            My Profesional Skills
          </p>
        </motion.div>

        {/* TOOLS GRID */}
        <div
          className="
            mt-14
            grid
            grid-cols-1
            gap-4
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
          "
        >
          {listTools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
              }}
              whileHover={{
                y: -5,
              }}
              className="
                group
                flex
                items-center
                gap-4
                rounded-xl
                border
                border-border
                bg-card/90
                backdrop-blur-xs
                p-4
                shadow-xs
                transition-all
                duration-300

                hover:border-purple-400/40
                hover:shadow-lg
                hover:shadow-purple-500/5

                dark:bg-white/[0.03]
                dark:border-white/[0.08]
                dark:hover:bg-white/[0.06]
                dark:hover:border-purple-400/30
                dark:hover:shadow-purple-500/10
              "
            >
              {/* TOOL IMAGE */}
              <div
                className="
                  flex
                  h-14
                  w-14
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-border
                  bg-muted
                  p-2.5
                  transition-all
                  duration-300

                  group-hover:border-purple-400/30
                  group-hover:bg-purple-500/10
                  dark:border-white/[0.06]
                  dark:bg-white/[0.04]
                "
              >
                <img
                  src={tool.gambar}
                  alt={tool.nama}
                  className="
                    h-full
                    w-full
                    object-contain
                    transition-transform
                    duration-300
                    group-hover:scale-110
                  "
                />
              </div>

              {/* TOOL INFORMATION */}
              <div
                className="
                  flex
                  min-w-0
                  flex-col
                  overflow-hidden
                "
              >
                <h3
                  className="
                    truncate
                    text-base
                    font-semibold
                    text-foreground
                    transition-colors
                    duration-200
                    group-hover:text-purple-600
                    dark:group-hover:text-purple-300
                    sm:text-lg
                  "
                >
                  {tool.nama}
                </h3>

                <p
                  className="
                    mt-1
                    truncate
                    text-sm
                    text-muted-foreground
                  "
                >
                  {tool.ket}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;