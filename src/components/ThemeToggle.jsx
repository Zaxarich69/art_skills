import React, { useEffect, useState } from 'react';

const lightPaletteClasses = ['light-palette-0', 'light-palette-1'];
const darkPaletteClasses = ['dark-palette-0', 'dark-palette-1'];

const ThemeToggle = () => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    try {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        const parsedTheme = JSON.parse(savedTheme);
        // Validate saved theme structure
        if (parsedTheme.mode && parsedTheme.className && (lightPaletteClasses.includes(parsedTheme.className) || darkPaletteClasses.includes(parsedTheme.className))) {
          return parsedTheme;
        }
      }
    } catch (error) {
      console.error("Failed to parse theme from localStorage", error);
    }
    // Default to light theme and first light palette
    return { mode: 'light', className: lightPaletteClasses[0] };
  });

  useEffect(() => {
    applyTheme(currentTheme.className, currentTheme.mode);
  }, [currentTheme]);

  const applyTheme = (themeClassName, themeMode) => {
    const htmlElement = document.documentElement;
    
    // Remove all existing palette classes
    lightPaletteClasses.forEach(p => htmlElement.classList.remove(p));
    darkPaletteClasses.forEach(p => htmlElement.classList.remove(p));

    // Add the new theme class
    htmlElement.classList.add(themeClassName);

    // Manage the 'dark' class based on the mode
    if (themeMode === 'dark') {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
  };

  const getRandomPalette = (palettes) => {
    const randomIndex = Math.floor(Math.random() * palettes.length);
    return palettes[randomIndex];
  };

  const handleLightModeClick = () => {
    const newClassName = getRandomPalette(lightPaletteClasses);
    const newTheme = { mode: 'light', className: newClassName };
    setCurrentTheme(newTheme);
    localStorage.setItem('theme', JSON.stringify(newTheme));
  };

  const handleDarkModeClick = () => {
    const newClassName = getRandomPalette(darkPaletteClasses);
    const newTheme = { mode: 'dark', className: newClassName };
    setCurrentTheme(newTheme);
    localStorage.setItem('theme', JSON.stringify(newTheme));
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={handleLightModeClick}
        className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-full p-1"
        aria-label="Переключить на светлую тему"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6 text-foreground"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      </button>
      <button
        onClick={handleDarkModeClick}
        className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-full p-1"
        aria-label="Переключить на темную тему"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6 text-foreground"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </button>
    </div>
  );
};

export default ThemeToggle;
