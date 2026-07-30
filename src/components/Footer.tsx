import React from 'react';
import { DEVELOPER_INFO } from '../data/portfolioData';
import { AccentThemeConfig } from '../types';
import { ArrowUp, Code2 } from 'lucide-react';

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
      className={`border-t pt-16 pb-12 px-4 sm:px-8 relative z-10 transition-colors ${
        isDarkMode
          ? 'border-slate-800/80 bg-slate-950/90 text-slate-400'
          : 'border-slate-200 bg-slate-100/90 text-slate-600'
      }`}
    >
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand Info */}
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <Code2 className={`w-5 h-5 ${accentTheme.textAccentClass}`} />
              <span className={`text-lg font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {DEVELOPER_INFO.name}
              </span>
            </div>
            <p className={`text-xs max-w-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {DEVELOPER_INFO.shortBio}
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className={`flex items-center gap-6 text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            {['home', 'about', 'projects', 'contact'].map((id) => (
              <button
                key={id}
                onClick={() => {
                  setActiveSection(id);
                  const el = document.getElementById(id);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`capitalize transition-colors cursor-pointer ${
                  isDarkMode ? 'hover:text-white' : 'hover:text-slate-900 font-semibold'
                }`}
              >
                {id}
              </button>
            ))}
          </div>

          {/* Back To Top Button */}
          <button
            onClick={scrollToTop}
            className={`p-3 rounded-2xl glass-card transition-all flex items-center gap-2 text-xs font-semibold cursor-pointer ${
              isDarkMode
                ? 'text-slate-300 hover:text-white border-slate-800'
                : 'text-slate-700 hover:text-slate-900 border-slate-300 shadow-sm'
            }`}
            title="Scroll back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Bar */}
        <div
          className={`pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${
            isDarkMode ? 'border-slate-900 text-slate-500' : 'border-slate-200 text-slate-600'
          }`}
        >
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} {DEVELOPER_INFO.name}. Crafted with React, TypeScript & Tailwind CSS.</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className={`font-mono text-[11px] ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
