import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  ArrowRight,
  Sparkles,
  Layers,
  Code2,
  FolderGit2,
} from "lucide-react";
import { GitHubIcon } from "./TechIcons";

const projectCategories = [
  { id: "all", label: "All Projects" },
  { id: "fullstack", label: "Full Stack" },
  { id: "ai", label: "AI & Tools" },
];

const projects = [
  {
    id: 1,
    title: "DevPulse AI",
    subtitle: "AI Developer Workspace & Code Assistant",
    description:
      "A next-generation developer platform featuring smart code generation, multi-file context reasoning, automated testing pipelines, and a responsive markdown chat interface.",
    image: "/projects/devpulse.jpg",
    category: "ai",
    categoryLabel: "AI & Tools",
    badge: "Featured",
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "OpenAI API",
      "Node.js",
    ],
    liveUrl: "https://github.com/Manas-Pal003",
    githubUrl: "https://github.com/Manas-Pal003",
    accentGlow: "rgba(168, 85, 247, 0.35)",
  },
  {
    id: 2,
    title: "TaskFlow Pro",
    subtitle: "Enterprise Agile & Kanban Dashboard",
    description:
      "High-performance collaborative project management platform with real-time drag-and-drop kanban boards, team velocity metrics, interactive timeline charts, and role-based permissions.",
    image: "/projects/taskflow.jpg",
    category: "fullstack",
    categoryLabel: "Full Stack",
    badge: "Popular",
    tags: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Tailwind CSS",
      "Framer Motion",
    ],
    liveUrl: "https://github.com/Manas-Pal003",
    githubUrl: "https://github.com/Manas-Pal003",
    accentGlow: "rgba(6, 182, 212, 0.35)",
  },
  {
    id: 3,
    title: "AuraStore Fintech",
    subtitle: "Luxury Commerce & Revenue Platform",
    description:
      "A modern full-stack e-commerce and analytics platform with real-time sales reporting, dynamic category filtering, cart persistence, secure payment processing, and administrative controls.",
    image: "/projects/aurastore.jpg",
    category: "fullstack",
    categoryLabel: "Full Stack",
    badge: "Production",
    tags: [
      "React",
      "Node.js",
      "PostgreSQL",
      "Stripe",
      "Tailwind CSS",
      "REST APIs",
    ],
    liveUrl: "https://github.com/Manas-Pal003",
    githubUrl: "https://github.com/Manas-Pal003",
    accentGlow: "rgba(236, 72, 153, 0.35)",
  },
];

export const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section
      id="projects"
      className="
        relative
        overflow-hidden
        bg-transparent
        px-6
        py-24
        md:py-32
        transition-colors
        duration-300
      "
    >
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute -left-40 top-20 h-[450px] w-[450px] rounded-full bg-purple-600/10 blur-[150px] dark:bg-purple-600/15" />
      <div className="pointer-events-none absolute -right-40 bottom-10 h-[450px] w-[450px] rounded-full bg-cyan-500/10 blur-[150px] dark:bg-cyan-500/15" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* ================================
            SECTION BADGE
        ================================= */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="
            mb-4
            flex
            items-center
            gap-3
            text-xs
            sm:text-sm
            uppercase
            tracking-[0.25em]
            text-muted-foreground
          "
        >
          <span className="font-semibold text-purple-600 dark:text-purple-400">
            04
          </span>
          <span className="h-px w-12 bg-gradient-to-r from-purple-500 to-cyan-400" />
          <span className="font-medium">Projects</span>
        </motion.div>

        {/* ================================
            HEADING & CATEGORY FILTERS
        ================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="
                text-3xl
                sm:text-5xl
                md:text-6xl
                font-extrabold
                tracking-tight
                text-foreground
              "
            >
              Featured{" "}
              <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
            <p className="mt-3 text-base sm:text-lg font-medium text-muted-foreground max-w-2xl">
              A curated selection of full-stack applications, intelligent AI
              systems, and responsive web platforms I've designed and built.
            </p>
          </motion.div>

          {/* FILTER TABS */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="
              flex
              flex-wrap
              items-center
              gap-1.5
              sm:gap-2
              p-1.5
              rounded-2xl
              border
              border-border
              bg-card/70
              backdrop-blur-md
              shadow-xs
            "
          >
            {projectCategories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`
                    relative
                    px-4
                    py-2
                    rounded-xl
                    text-xs
                    sm:text-sm
                    font-medium
                    transition-all
                    duration-200
                    cursor-pointer
                    ${
                      isActive
                        ? "text-white"
                        : "text-muted-foreground hover:text-foreground hover:bg-zinc-100 dark:hover:bg-white/[0.04]"
                    }
                  `}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeProjectTab"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                      className="
                        absolute
                        inset-0
                        rounded-xl
                        bg-gradient-to-r
                        from-purple-600
                        to-indigo-600
                        shadow-sm
                        shadow-purple-500/20
                      "
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* ================================
            PROJECTS GRID
        ================================= */}
        <motion.div
          layout
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
            gap-6
            sm:gap-8
          "
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -6,
                  transition: { duration: 0.25 },
                }}
                className="
                  group
                  flex
                  flex-col
                  rounded-2xl
                  border
                  border-border
                  bg-card/90
                  shadow-xs
                  overflow-hidden
                  transition-all
                  duration-300
                  hover:border-purple-400/50
                  hover:shadow-2xl
                  hover:shadow-purple-500/10
                  dark:bg-[#13141a]/90
                  dark:border-white/[0.08]
                  dark:hover:border-purple-400/40
                  dark:hover:bg-[#171822]
                  backdrop-blur-xs
                "
              >
                {/* PROJECT IMAGE CONTAINER */}
                <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-muted">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="
                      h-full
                      w-full
                      object-cover
                      object-top
                      transition-transform
                      duration-700
                      ease-out
                      group-hover:scale-108
                    "
                  />

                  {/* Gradient Overlay */}
                  <div
                    className="
                      absolute
                      inset-0
                      bg-gradient-to-t
                      from-black/80
                      via-black/20
                      to-transparent
                      opacity-80
                      group-hover:opacity-60
                      transition-opacity
                      duration-300
                    "
                  />

                  {/* Top Badges */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                    <span
                      className="
                        inline-flex
                        items-center
                        gap-1.5
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        font-semibold
                        bg-black/60
                        backdrop-blur-md
                        text-white
                        border
                        border-white/15
                        shadow-sm
                      "
                    >
                      <Layers className="w-3 h-3 text-cyan-400" />
                      {project.categoryLabel}
                    </span>

                    <span
                      className="
                        px-2.5
                        py-0.5
                        rounded-full
                        text-xs
                        font-medium
                        bg-purple-500/80
                        backdrop-blur-md
                        text-white
                        shadow-sm
                      "
                    >
                      {project.badge}
                    </span>
                  </div>
                </div>

                {/* PROJECT CONTENT */}
                <div className="flex flex-col flex-1 p-6">
                  {/* TECH STACK BADGES */}
                  <div className="flex flex-wrap gap-1.5 mb-3.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="
                          inline-flex
                          items-center
                          px-2.5
                          py-1
                          rounded-md
                          text-xs
                          font-medium
                          bg-purple-500/10
                          text-purple-700
                          border
                          border-purple-500/20
                          dark:bg-purple-500/15
                          dark:text-purple-300
                          dark:border-purple-500/30
                        "
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* TITLE */}
                  <h3
                    className="
                      text-xl
                      font-bold
                      tracking-tight
                      text-foreground
                      transition-colors
                      duration-200
                      group-hover:text-purple-600
                      dark:group-hover:text-purple-300
                    "
                  >
                    {project.title}
                  </h3>

                  {/* SUBTITLE */}
                  <p className="text-xs font-semibold uppercase tracking-wider text-purple-600/80 dark:text-cyan-400/90 mt-1 mb-3">
                    {project.subtitle}
                  </p>

                  {/* DESCRIPTION */}
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1 line-clamp-3 mb-6">
                    {project.description}
                  </p>

                  {/* ACTION BUTTONS */}
                  <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="
                        inline-flex
                        items-center
                        gap-1.5
                        text-sm
                        font-medium
                        text-purple-600
                        hover:text-purple-700
                        dark:text-purple-400
                        dark:hover:text-purple-300
                        transition-colors
                      "
                    >
                      <span>Live Preview</span>
                      <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="
                        inline-flex
                        items-center
                        gap-1.5
                        text-sm
                        font-medium
                        text-muted-foreground
                        hover:text-foreground
                        transition-colors
                      "
                    >
                      <GitHubIcon className="w-4 h-4" />
                      <span>Code</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ================================
            BOTTOM GITHUB CTA
        ================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-2 pl-4 pr-3 rounded-full border border-border bg-card/60 backdrop-blur-md shadow-xs">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FolderGit2 className="w-4 h-4 text-purple-500" />
              <span>Looking for more open-source projects &amp; experiments?</span>
            </div>

            <a
              href="https://github.com/Manas-Pal003"
              target="_blank"
              rel="noreferrer"
              className="
                inline-flex
                items-center
                gap-2
                px-5
                py-2.5
                rounded-full
                bg-gradient-to-r
                from-purple-600
                to-indigo-600
                text-white
                text-sm
                font-medium
                shadow-md
                shadow-purple-500/25
                hover:shadow-lg
                hover:shadow-purple-500/40
                hover:scale-105
                active:scale-95
                transition-all
                duration-200
              "
            >
              <span>Explore GitHub</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
