
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = () => {
  // For now, we'll just toggle a class on the document element
  // In a real app, this would be connected to a theme context
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // This is just a placeholder for theme toggling
    // In a real implementation, we would use a theme context
    // and properly manage the theme state
  }, [isDark]);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setIsDark(!isDark)}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all" />
      )}
    </Button>
  );
};

export default ThemeToggle;
