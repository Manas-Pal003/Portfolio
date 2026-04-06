import { useState } from "react";
import { cn } from "@/lib/utils";


const skills = [
    //Frontend
  { name: "HTML/CSS", level: 95, category: "Frontend" },
  { name: "JavaScript", level: 90, category: "Frontend" },
  { name: "React", level: 90, category: "Frontend" },
  { name: "TypeCript", level: 85, category: "Frontend" },
  { name: "tailwind CSS", level: 90, category: "Frontend" },
  { name: "Next.js", level: 80, category: "Frontend" },

  //Backend
  { name: "Node.js", level: 80, category: "Backend" },
  { name: "Express.js", level: 75, category: "Backend" },
  { name: "MongoDB", level: 70, category: "Backend" },
  { name: "SQL", level: 70, category: "Backend" },

  //Tools
  { name: "Git", level: 90, category: "Tools" },
  { name: "GitHub", level: 90, category: "Tools" },
  { name: "VS Code", level: 95, category: "Tools" },
  { name: "Antigravity", level: 85, category: "Tools" },
  { name: "IntelliJ", level: 85, category: "Tools" },
];

const categories = ["All", "Frontend", "Backend", "Tools"];

export const SkillsSection = () => {
    const [activeCategory, setActiveCategory] = useState("All");
    const filteredSkills = activeCategory === "All" ? skills : skills.filter(skill => skill.category === activeCategory);
    return (
        <section id="skills" className="py-24 px-4 relative bg-secondary/30">
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                    My <span className="text-primary"> Skills</span>
                </h2>

                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map((category,key) => (
                        <button
                            key={key}
                            onClick={() => setActiveCategory(category)}
                            className= {cn("px-5 py-2 rounded-full transition-colors duration-300 capitalize", activeCategory === category ? "bg-primary text-primary-foreground" : "bg-secondary/70 text-foreground hover:bg-secondary/80 hover:text-primary")}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredSkills.map((skill, key) => (
                        <div key={key} className="bg-card p-6 rounded-lg shadow-xs card-hover">
                            <div className="text-left mb--4">
                                <h3 className="font-semibold text-lg">{skill.name}</h3>
                            </div>
                            <div className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden">
                                <div className="bg-primary h-full rounded-full transition-all duration-500" style={{width: `${skill.level}%`}}>

                                </div>
                            </div>
                            <div className="text-right mt-1">
                                <span className="text-sm text-muted-foreground">{skill.level}%</span>
                            </div>
                        </div>

                    ))}
                </div>
            </div>
        </section>
    );
};
