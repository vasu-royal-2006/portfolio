import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface FloatingThemeToggleProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const FloatingThemeToggle: React.FC<FloatingThemeToggleProps> = ({
  isDarkMode,
  onToggleTheme,
}) => {
  return (
    <button
      onClick={onToggleTheme}
      className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center ${
        isDarkMode
          ? 'bg-slate-800 text-amber-400 border border-slate-700 hover:bg-slate-700 hover:border-slate-600'
          : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
      }`}
      aria-label="Toggle Theme"
      title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
};
