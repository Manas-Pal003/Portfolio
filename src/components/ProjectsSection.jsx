

const projects = [
  {
    id: 1,
    title: "Project 1",
    description: "Description 1",
    image: "/public/projects/project1.jpg",
    tags: ["React", "Node", "MongoDB"],
    githubUrl: "#",
  },
  {
    id: 2,
    title: "Project 2",
    description: "Description 2",
    image: "/public/projects/project2.jpg",
    tags: ["React", "Node", "MongoDB"],
    githubUrl: "#",
  },
  {
    id: 3,
    title: "Project 3",
    description: "Description 3",
    image: "/public/projects/project3.jpg",
    tags: ["React", "Node", "MongoDB"],
    githubUrl: "#",
  },
];

export const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Featured <span className="text-primary">Projects</span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Here are some of my recent projects. Each project was carefully
          crafted with attention to detail, using modern technologies and best
          practices.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, key) => (
            <div
              key={key}
              className="group bg-card p-6 rounded-lg overflow-hidden shadow-xs card-hover"
            >
              {/* Project Image */}
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Project Tags */}
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, key) => (
                    <span
                      key={key}
                      className="px-2 py-1 font-medium bg-primary/20 text-secondary-foreground text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Details */}
              <h3 className="font-semibold text-xl mb-1">{project.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {project.description}
              </p>
              <div className="flex justify-between items-center">
                <div className="flex space-x-3">
                  <a
                    href={project.githubUrl}
                    className="text-foreground/80 rounded-lg hover:text-primary transition-colors duration-300"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <a
            href="https://github.com/Manas-Pal003"
            className="cosnic-button w-fit flex items-center justify-center mx-auto gap-2"
            target="_blank"
          >
            Check My GitHub
          </a>
        </div>
      </div>
    </section>
  );
}


