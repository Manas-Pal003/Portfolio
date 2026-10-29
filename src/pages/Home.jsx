import { ThemeToggle } from '@/components/ThemeToggle';
import { StarBackground } from '@/components/StarBackground';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { AboutSection } from '../components/AboutSection';
import { SkillsSection } from '../components/SkillsSection';
import { ProjectsSection } from '../components/ProjectsSection';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';

export const Home = () => {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Theme Toggle Button */}
      <ThemeToggle />

      {/* Global Fixed Star Background across all pages while scrolling */}
      <StarBackground className="fixed inset-0 pointer-events-none z-0 overflow-hidden" />

      {/* Ambient background glow mesh */}
      <div className="pointer-events-none fixed -top-32 left-1/2 -translate-x-1/2 h-[580px] w-full max-w-7xl rounded-full bg-gradient-to-b from-purple-500/15 via-pink-500/10 via-cyan-500/10 to-transparent blur-[140px] dark:from-purple-900/20 dark:via-cyan-900/10 dark:via-transparent z-0" />
      <div className="pointer-events-none fixed top-1/3 -right-40 h-[450px] w-[450px] rounded-full bg-cyan-500/10 blur-[140px] dark:bg-cyan-900/10 z-0" />
      <div className="pointer-events-none fixed bottom-1/4 -left-40 h-[450px] w-[450px] rounded-full bg-purple-500/10 blur-[140px] dark:bg-purple-900/10 z-0" />

      {/* Navigation Bar */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
