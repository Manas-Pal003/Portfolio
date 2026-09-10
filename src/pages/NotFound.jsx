import { ThemeToggle } from '@/components/ThemeToggle';
import { StarBackground } from '@/components/StarBackground';

export const NotFound = () => {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Theme Toggle Button */}
      <ThemeToggle />

      {/* Global Fixed Star Background across all pages while scrolling */}
      <StarBackground className="fixed inset-0 pointer-events-none z-0 overflow-hidden" />
      Not Found
    </div>
  )
}

export default NotFound
