import React from 'react';
import { DEVELOPER_INFO } from '../data/portfolioData';
import { AccentThemeConfig } from '../types';
import { ArrowUp, Github, Linkedin, Twitter, Mail, Code2, Heart } from 'lucide-react';

interface FooterProps {
  accentTheme: AccentThemeConfig;
  setActiveSection: (section: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ accentTheme, setActiveSection }) => {
  const scrollToTop = () => {
    setActiveSection('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/90 pt-16 pb-12 px-4 sm:px-8 relative z-10">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand Info */}
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <Code2 className={`w-5 h-5 ${accentTheme.textAccentClass}`} />
              <span className="text-lg font-extrabold text-white">{DEVELOPER_INFO.name}</span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm">
              {DEVELOPER_INFO.shortBio}
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="flex items-center gap-6 text-xs font-medium text-slate-400">
            {['home', 'about', 'projects', 'contact'].map((id) => (
              <button
                key={id}
                onClick={() => {
                  setActiveSection(id);
                  const el = document.getElementById(id);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-white capitalize transition-colors cursor-pointer"
              >
                {id}
              </button>
            ))}
          </div>

          {/* Back To Top Button */}
          <button
            onClick={scrollToTop}
            className="p-3 rounded-2xl glass-card text-slate-300 hover:text-white hover:border-slate-600 transition-all flex items-center gap-2 text-xs font-semibold cursor-pointer"
            title="Scroll back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} {DEVELOPER_INFO.name}. Crafted with React, TypeScript & Tailwind CSS.</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-[11px] text-slate-400">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
