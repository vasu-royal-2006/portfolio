import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AccentThemeConfig, AccentColor } from '../types';
import { ThemeAccentPicker } from './ThemeAccentPicker';
import { FileText, Menu, X, Terminal, Code2, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  accentTheme: AccentThemeConfig;
  onSelectAccent: (accent: AccentColor) => void;
  onOpenResume: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  setActiveSection,
  accentTheme,
  onSelectAccent,
  onOpenResume,
  isDarkMode,
  onToggleTheme,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3.5 px-4 sm:px-8 ${
        isScrolled
          ? 'bg-[#050505]/85 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <div className="p-2 rounded-xl transition-all border bg-slate-900 border-slate-800 group-hover:border-slate-700">
            <Code2 className={`w-5 h-5 ${accentTheme.textAccentClass}`} />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight flex items-center gap-1 text-white">
              Nallamsetty Vasu
              <span className={`w-1.5 h-1.5 rounded-full inline-block ${accentTheme.badgeClass}`} />
            </span>
            <span className="text-[10px] font-mono tracking-wider text-slate-400">FULL STACK DEV</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full border transition-all bg-[#0d1117]/80 backdrop-blur-md border-slate-800/80">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-200 cursor-pointer ${
                  isActive ? 'text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="navbar-active-pill"
                    className={`absolute inset-0 rounded-full ${accentTheme.bgGlowClass} border border-slate-700/80`}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Action Items */}
        <div className="hidden md:flex items-center gap-3">
          {/* Light / Dark Mode Toggle Button */}
          <button
            onClick={onToggleTheme}
            className={`p-2 rounded-xl text-xs font-medium border transition-all flex items-center gap-1.5 cursor-pointer ${
              isDarkMode
                ? 'bg-slate-900/80 border-slate-800 text-amber-400 hover:bg-slate-800 hover:border-slate-700'
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200 hover:border-slate-300 shadow-xs'
            }`}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            <span className="text-[11px] font-mono uppercase font-semibold">
              {isDarkMode ? 'Light' : 'Dark'}
            </span>
          </button>

          {/* Theme Color Accent Picker */}
          <ThemeAccentPicker currentAccent={accentTheme.id} onSelectAccent={onSelectAccent} />

          <button
            onClick={onOpenResume}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 border transition-all shadow-xs cursor-pointer ${
              isDarkMode
                ? 'border-slate-700/80 bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white'
                : 'border-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-800'
            } ${accentTheme.borderHoverClass}`}
          >
            <FileText className="w-3.5 h-3.5 text-slate-400" />
            <span>Resume</span>
          </button>
        </div>

        {/* Mobile Menu Controls */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onToggleTheme}
            className={`p-2 rounded-lg border transition-all ${
              isDarkMode
                ? 'bg-slate-900 border-slate-800 text-amber-400'
                : 'bg-slate-100 border-slate-200 text-slate-700'
            }`}
            title="Toggle Theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>
          <ThemeAccentPicker currentAccent={accentTheme.id} onSelectAccent={onSelectAccent} />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-lg border ${
              isDarkMode
                ? 'bg-slate-900 border-slate-800 text-slate-300'
                : 'bg-slate-100 border-slate-200 text-slate-700'
            }`}
            aria-label="Toggle Mobile Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden glass-panel mt-3 rounded-2xl border border-slate-800 overflow-hidden"
          >
            <div className="p-4 space-y-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-between ${
                      isActive
                        ? `bg-slate-800/80 ${accentTheme.textAccentClass} border border-slate-700`
                        : 'text-slate-300 hover:bg-slate-800/40'
                    }`}
                  >
                    <span>{item.label}</span>
                    <Terminal className="w-3.5 h-3.5 text-slate-500" />
                  </button>
                );
              })}

              <div className="pt-2 border-t border-slate-800">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenResume();
                  }}
                  className={`w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 bg-slate-900 border border-slate-700 text-slate-200 ${accentTheme.textAccentClass}`}
                >
                  <FileText className="w-4 h-4" />
                  <span>View / Download Resume</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
