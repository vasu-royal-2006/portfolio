import React from 'react';
import { motion } from 'motion/react';
import { DEVELOPER_INFO } from '../data/portfolioData';
import { AccentThemeConfig } from '../types';
import { ArrowUp, Code2, Heart } from 'lucide-react';

interface FooterProps {
  accentTheme: AccentThemeConfig;
  setActiveSection: (section: string) => void;
  isDarkMode?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ accentTheme, setActiveSection, isDarkMode = true }) => {
  const scrollToTop = () => {
    setActiveSection('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className={`relative pt-16 pb-12 px-4 sm:px-8 z-10 transition-colors overflow-hidden ${
        isDarkMode
          ? 'text-slate-400'
          : 'text-slate-600'
      }`}
    >
      {/* Premium gradient border top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

      {/* Subtle background glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full blur-[120px] pointer-events-none"
        style={{ backgroundColor: accentTheme.hex, opacity: isDarkMode ? 0.03 : 0.02 }}
      />

      <div className="max-w-7xl mx-auto space-y-12 relative">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand Info */}
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <Code2 className={`w-5 h-5 ${accentTheme.textAccentClass}`} />
              <span className={`text-lg font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {DEVELOPER_INFO.name}
              </span>
            </div>
            <p className={`text-xs max-w-sm ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>
              {DEVELOPER_INFO.shortBio}
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className={`flex items-center gap-6 text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            {['home', 'about', 'projects', 'contact'].map((id) => (
              <motion.button
                key={id}
                onClick={() => {
                  setActiveSection(id);
                  const el = document.getElementById(id);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`capitalize transition-colors cursor-pointer relative group ${
                  isDarkMode ? 'hover:text-white' : 'hover:text-slate-900 font-semibold'
                }`}
                whileHover={{ y: -1 }}
              >
                {id}
                {/* Underline reveal animation */}
                <span className={`absolute -bottom-0.5 left-0 w-0 h-px transition-all duration-300 group-hover:w-full ${
                  isDarkMode ? 'bg-white' : 'bg-slate-900'
                }`} />
              </motion.button>
            ))}
          </div>

          {/* Back To Top Button */}
          <motion.button
            onClick={scrollToTop}
            className={`p-3 rounded-2xl transition-all flex items-center gap-2 text-xs font-semibold cursor-pointer border backdrop-blur-xl ${
              isDarkMode
                ? 'bg-slate-900/30 border-slate-800/50 text-slate-300 hover:text-white hover:border-slate-700/50'
                : 'bg-white/50 border-slate-200/50 text-slate-700 hover:text-slate-900 shadow-sm'
            }`}
            title="Scroll back to top"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Bottom Bar */}
        <div
          className={`pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${
            isDarkMode ? 'border-slate-800/30 text-slate-500' : 'border-slate-200 text-slate-500'
          }`}
        >
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} {DEVELOPER_INFO.name}. Crafted with</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
            <span>using React, TypeScript & Tailwind CSS.</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className={`font-mono text-[11px] ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
