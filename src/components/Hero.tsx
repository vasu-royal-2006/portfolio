import React from 'react';
import { motion } from 'motion/react';
import { DEVELOPER_INFO } from '../data/portfolioData';
import { AccentThemeConfig } from '../types';
import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  Download,
  MapPin,
  Terminal,
} from 'lucide-react';

interface HeroProps {
  accentTheme: AccentThemeConfig;
  onExploreProjects: () => void;
  onContactClick: () => void;
  onOpenResume: () => void;
  isDarkMode: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  accentTheme,
  onExploreProjects,
  onContactClick,
  onOpenResume,
  isDarkMode,
}) => {
  return (
    <section
      id="home"
      className={`relative min-h-screen pt-32 pb-20 flex flex-col justify-center items-center px-4 sm:px-8 transition-colors duration-300 overflow-hidden ${
        isDarkMode ? 'bg-[#0a0a0a] text-slate-100' : 'bg-[#f8fafc] text-slate-900'
      }`}
    >
      {/* Refined Ambient Glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full blur-[160px] pointer-events-none opacity-[0.15] transition-all duration-1000"
        style={{ backgroundColor: accentTheme.hex }}
      />

      <div className="max-w-5xl w-full mx-auto z-10 space-y-12 flex flex-col items-center text-center">
        
        {/* Top Minimal Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border ${
            isDarkMode 
              ? 'bg-slate-900/50 border-slate-800 text-slate-300 backdrop-blur-md' 
              : 'bg-white/80 border-slate-200 text-slate-600 backdrop-blur-md shadow-sm'
          }`}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          Available for new opportunities
        </motion.div>

        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6 max-w-4xl"
        >
          <h1
            className={`text-5xl sm:text-7xl md:text-8xl font-black tracking-tight leading-[1.05] ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}
          >
            Building software <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-200" style={{ backgroundImage: `linear-gradient(to right, ${accentTheme.hex}, #94a3b8)` }}>
              that makes an impact.
            </span>
          </h1>
          
          <p
            className={`text-lg sm:text-xl md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed ${
              isDarkMode ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            Hi, I'm {DEVELOPER_INFO.name}. I'm a full-stack engineer focused on building robust, scalable, and pixel-perfect applications.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full sm:w-auto"
        >
          <button
            onClick={onExploreProjects}
            className={`w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-sm text-white flex items-center justify-center gap-2 transition-all hover:scale-105 shadow-xl cursor-pointer bg-gradient-to-r ${accentTheme.accentClass}`}
          >
            View My Work
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onContactClick}
            className={`w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-sm transition-all cursor-pointer border flex items-center justify-center gap-2 ${
              isDarkMode
                ? 'bg-slate-900/40 border-slate-700 text-slate-200 hover:bg-slate-800 hover:text-white backdrop-blur-md'
                : 'bg-white/80 border-slate-300 text-slate-800 hover:bg-slate-50 shadow-sm backdrop-blur-md'
            }`}
          >
            Contact Me
          </button>
        </motion.div>

        {/* Tech Stack & Location Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className={`pt-16 flex flex-wrap items-center justify-center gap-6 text-sm font-medium ${
            isDarkMode ? 'text-slate-500' : 'text-slate-500'
          }`}
        >
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{DEVELOPER_INFO.location}</span>
          </div>
          <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-slate-400 opacity-50" />
          <div className="flex items-center gap-4">
            <div className="flex gap-3">
              <a href={DEVELOPER_INFO.github} target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href={DEVELOPER_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <button onClick={onOpenResume} className="hover:text-slate-900 dark:hover:text-white transition-colors">
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
