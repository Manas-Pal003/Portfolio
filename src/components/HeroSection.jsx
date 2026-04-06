import { ArrowDown } from "lucide-react";
export const HeroSection = () => {
    return (
        <section id="hero" className=" relative min-h-screen flex flex-col items-center justify-center px-4">
            <div className="container max-w-4xl max-auto text-center z-10">
                <div className="space-y-6">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                        <span className="opacity-0 animate-fade-in">Hi, I'm</span>
                        <span className="text-primary opacity-0 animate-fade-in"> Manas</span>
                        <span className=" opacity-0 animate-fade-in"> Kumar</span>
                        <span className=" text-gradient ml-2 opacity-0 animate-fade-in text-red-500"> Pal</span>
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-2-2xl mx-auto opacity-0 animate-fade-in">
                        I'm a passionate software developer specializing in building web applications. With a strong foundation in JavaScript and React, I create dynamic and responsive user interfaces. I enjoy solving complex problems and continuously learning new technologies to enhance my skills.
                    </p>

                    <div className="pt-4">
                        <a href="#projects" className="cosmic-button">
                            View My Work
                        </a>
                    </div>
                </div>
                <div className="absolute bottom-8 left-1/2 transfrom -translate-x-1/2 flex flex-col items-center animate-bounce">
                <span className="text-sm text-muted-foreground mb-2">Scroll</span>
                <ArrowDown className="h-5 w-5 text-primary" />
                </div>
            </div>
        </section>
    );
}
