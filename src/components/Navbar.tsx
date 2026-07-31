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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-3.5 px-4 sm:px-8 ${
        isScrolled
          ? isDarkMode
            ? 'bg-[#050505]/70 backdrop-blur-2xl border-b border-white/[0.04] shadow-[0_4px_30px_rgba(0,0,0,0.3)]'
            : 'bg-white/60 backdrop-blur-2xl border-b border-slate-200/50 shadow-[0_4px_30px_rgba(0,0,0,0.05)]'
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
          <motion.div
            className={`p-2 rounded-xl transition-all border ${
              isDarkMode
                ? 'bg-slate-900/80 border-slate-800 group-hover:border-slate-700'
                : 'bg-slate-100 border-slate-200 group-hover:border-slate-300'
            }`}
            whileHover={{ scale: 1.05, rotate: 3 }}
            whileTap={{ scale: 0.95 }}
          >
            <Code2 className={`w-5 h-5 ${accentTheme.textAccentClass}`} />
          </motion.div>
          <div className="flex flex-col">
            <span className={`text-base font-bold tracking-tight flex items-center gap-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Nallamsetty Vasu
              <span className={`w-1.5 h-1.5 rounded-full inline-block ${accentTheme.badgeClass} animate-pulse`} />
            </span>
            <span className={`text-[10px] font-mono tracking-wider ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>FULL STACK DEV</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav
          className={`hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full border transition-all ${
            isDarkMode
              ? 'bg-slate-900/40 backdrop-blur-2xl border-slate-800/50'
              : 'bg-white/50 backdrop-blur-2xl border-slate-200/50 shadow-sm'
          }`}
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-200 cursor-pointer ${
                  isActive
                    ? isDarkMode ? 'text-white font-semibold' : 'text-slate-900 font-semibold'
                    : isDarkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="navbar-active-pill"
                    className={`absolute inset-0 rounded-full border ${
                      isDarkMode
                        ? `${accentTheme.bgGlowClass} border-slate-700/60`
                        : 'bg-slate-100 border-slate-200/80'
                    }`}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Action Items */}
        <div className="hidden md:flex items-center gap-2">
          {/* Light / Dark Mode Toggle Button */}
          <motion.button
            onClick={onToggleTheme}
            className={`p-2 rounded-xl text-xs font-medium border transition-all flex items-center gap-1.5 cursor-pointer ${
              isDarkMode
                ? 'bg-slate-900/60 border-slate-800/60 text-amber-400 hover:bg-slate-800 hover:border-slate-700'
                : 'bg-white/60 border-slate-200/60 text-slate-700 hover:bg-white hover:border-slate-300 shadow-sm'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            <span className="text-[11px] font-mono uppercase font-semibold">
              {isDarkMode ? 'Light' : 'Dark'}
            </span>
          </motion.button>

          {/* Theme Color Accent Picker */}
          <ThemeAccentPicker currentAccent={accentTheme.id} onSelectAccent={onSelectAccent} />

          <motion.button
            onClick={onOpenResume}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 border transition-all shadow-xs cursor-pointer ${
              isDarkMode
                ? 'border-slate-700/60 bg-slate-900/60 hover:bg-slate-800 text-slate-200 hover:text-white'
                : 'border-slate-200/60 bg-white/60 hover:bg-white text-slate-800'
            } ${accentTheme.borderHoverClass}`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <FileText className={`w-3.5 h-3.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`} />
            <span>Resume</span>
          </motion.button>
        </div>

        {/* Mobile Menu Controls */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onToggleTheme}
            className={`p-2 rounded-lg border transition-all ${
              isDarkMode
                ? 'bg-slate-900/60 border-slate-800 text-amber-400'
                : 'bg-white/60 border-slate-200 text-slate-700'
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
                ? 'bg-slate-900/60 border-slate-800 text-slate-300'
                : 'bg-white/60 border-slate-200 text-slate-700'
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
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={`md:hidden mt-3 rounded-2xl border overflow-hidden ${
              isDarkMode
                ? 'bg-[#0a0a0e]/90 backdrop-blur-2xl border-slate-800/50'
                : 'bg-white/80 backdrop-blur-2xl border-slate-200/50 shadow-lg'
            }`}
          >
            <div className="p-4 space-y-2">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-between ${
                      isActive
                        ? isDarkMode
                          ? `bg-slate-800/60 ${accentTheme.textAccentClass} border border-slate-700/60`
                          : `bg-slate-100 text-slate-900 border border-slate-200`
                        : isDarkMode
                          ? 'text-slate-300 hover:bg-slate-800/30'
                          : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>{item.label}</span>
                    <Terminal className={`w-3.5 h-3.5 ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`} />
                  </motion.button>
                );
              })}

              <div className={`pt-2 border-t ${isDarkMode ? 'border-slate-800/50' : 'border-slate-200'}`}>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenResume();
                  }}
                  className={`w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border ${
                    isDarkMode
                      ? 'bg-slate-900/60 border-slate-700/60 text-slate-200'
                      : 'bg-slate-100 border-slate-200 text-slate-800'
                  } ${accentTheme.textAccentClass}`}
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
