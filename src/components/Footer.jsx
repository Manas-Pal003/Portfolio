import { ArrowUp } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="bg-secondary/30 py-12 px-4 bg-card realtive border-t border-border mt-12 pt-8 flex flex-wrap justify-between">
                <p className="text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} Manas Pal. All rights reserved.
                </p>
                <a href="#hero" className="p-2 bg-primary/10 rounded-full hover:bg-primary/20 text-primary transition-colors">
                    <ArrowUp size={20} />
                </a>
        </footer>
    );
};
