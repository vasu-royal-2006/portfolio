import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';
import { DEVELOPER_INFO } from '../data/portfolioData';
import { AccentThemeConfig } from '../types';
import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  Download,
  MapPin,
  ChevronDown,
  Sparkles,
} from 'lucide-react';

interface HeroProps {
  accentTheme: AccentThemeConfig;
  onExploreProjects: () => void;
  onContactClick: () => void;
  onOpenResume: () => void;
  isDarkMode: boolean;
}

// Typewriter hook
function useTypewriter(words: string[], speed = 80, pause = 2000) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && text === currentWord) {
      timeout = setTimeout(() => setIsDeleting(true), pause);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    } else {
      timeout = setTimeout(
        () => {
          setText(
            isDeleting
              ? currentWord.substring(0, text.length - 1)
              : currentWord.substring(0, text.length + 1)
          );
        },
        isDeleting ? speed / 2 : speed
      );
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, speed, pause]);

  return text;
}

export const Hero: React.FC<HeroProps> = ({
  accentTheme,
  onExploreProjects,
  onContactClick,
  onOpenResume,
  isDarkMode,
}) => {
  const typedRole = useTypewriter(DEVELOPER_INFO.typewriterRoles, 70, 2500);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const parallaxX = useTransform(mouseX, [-400, 400], [-15, 15]);
  const parallaxY = useTransform(mouseY, [-400, 400], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left - rect.width / 2);
      mouseY.set(e.clientY - rect.top - rect.height / 2);
    }
  };

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`relative min-h-screen pt-28 pb-20 flex flex-col justify-center items-center px-4 sm:px-8 transition-colors duration-500 overflow-hidden ${
        isDarkMode ? 'text-slate-100' : 'text-slate-900'
      }`}
    >
      {/* Hero-specific ambient glow */}
      <motion.div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full blur-[180px] pointer-events-none transition-all duration-1000"
        style={{
          backgroundColor: accentTheme.hex,
          opacity: isDarkMode ? 0.08 : 0.04,
          x: parallaxX,
          y: parallaxY,
        }}
      />

      {/* Floating accent rings */}
      <motion.div
        className="absolute top-20 right-[15%] w-32 h-32 rounded-full border opacity-[0.06] pointer-events-none hidden lg:block"
        style={{
          borderColor: accentTheme.hex,
          x: parallaxX,
          y: parallaxY,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute bottom-32 left-[10%] w-20 h-20 rounded-full border opacity-[0.08] pointer-events-none hidden lg:block"
        style={{
          borderColor: accentTheme.hex,
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      />

      <div className="max-w-5xl w-full mx-auto z-10 space-y-10 flex flex-col items-center text-center">
        
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium border backdrop-blur-xl ${
            isDarkMode 
              ? 'bg-slate-900/40 border-slate-800/50 text-slate-300' 
              : 'bg-white/60 border-slate-200/50 text-slate-600 shadow-sm'
          }`}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          Available for new opportunities
        </motion.div>

        {/* Avatar with glowing rings */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, type: 'spring', stiffness: 150 }}
          className="relative"
        >
          {/* Outer glow ring */}
          <motion.div
            className="absolute inset-[-8px] rounded-full opacity-30"
            style={{
              background: `conic-gradient(from 0deg, ${accentTheme.hex}, #a855f7, #06b6d4, ${accentTheme.hex})`,
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />
          <div className="absolute inset-[-6px] rounded-full bg-[#050505]" style={{ background: isDarkMode ? '#050505' : '#fafbfc' }} />
          
          <img
            src={DEVELOPER_INFO.avatar}
            alt={DEVELOPER_INFO.name}
            referrerPolicy="no-referrer"
            className="relative w-28 h-28 rounded-full object-cover object-top border-2 border-slate-700/50 shadow-2xl"
          />
        </motion.div>

        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-5 max-w-4xl"
        >
          <h1
            className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05] ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}
          >
            Building software <br className="hidden sm:block" />
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: `linear-gradient(135deg, ${accentTheme.hex}, #a855f7, #06b6d4)` }}
            >
              that makes an impact.
            </span>
          </h1>
          
          {/* Typewriter role */}
          <div className={`text-lg sm:text-xl font-medium h-8 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            <span className={accentTheme.textAccentClass}>&lt;</span>
            <span className="font-mono">{typedRole}</span>
            <span className="animate-pulse text-slate-400">|</span>
            <span className={accentTheme.textAccentClass}> /&gt;</span>
          </div>

          <p
            className={`text-base sm:text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed ${
              isDarkMode ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            Hi, I'm {DEVELOPER_INFO.name}. A full-stack engineer focused on building robust, scalable, and pixel-perfect applications.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-8"
        >
          {DEVELOPER_INFO.stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <div className={`text-xl sm:text-2xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {stat.value}
              </div>
              <div className={`text-[10px] sm:text-xs font-mono mt-1 ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 w-full sm:w-auto"
        >
          <motion.button
            onClick={onExploreProjects}
            className={`w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-sm text-white flex items-center justify-center gap-2 shadow-xl cursor-pointer bg-gradient-to-r ${accentTheme.accentClass} glow-hover`}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <Sparkles className="w-4 h-4" />
            View My Work
            <ArrowRight className="w-4 h-4" />
          </motion.button>

          <motion.button
            onClick={onContactClick}
            className={`w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-sm transition-all cursor-pointer border flex items-center justify-center gap-2 backdrop-blur-xl ${
              isDarkMode
                ? 'bg-slate-900/30 border-slate-700/50 text-slate-200 hover:bg-slate-800/50 hover:text-white'
                : 'bg-white/50 border-slate-300/50 text-slate-800 hover:bg-white/80 shadow-sm'
            }`}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            Contact Me
          </motion.button>
        </motion.div>

        {/* Social & Location Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className={`pt-12 flex flex-wrap items-center justify-center gap-6 text-sm font-medium ${
            isDarkMode ? 'text-slate-500' : 'text-slate-500'
          }`}
        >
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{DEVELOPER_INFO.location}</span>
          </div>
          <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-slate-400 opacity-30" />
          <div className="flex items-center gap-4">
            <div className="flex gap-3">
              {[
                { icon: Github, href: DEVELOPER_INFO.github, label: 'GitHub' },
                { icon: Linkedin, href: DEVELOPER_INFO.linkedin, label: 'LinkedIn' },
                { icon: Mail, href: `mailto:${DEVELOPER_INFO.email}`, label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={label !== 'Email' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:text-white hover:bg-slate-800/50' : 'hover:text-slate-900 hover:bg-slate-100'}`}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  title={label}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
              <motion.button
                onClick={onOpenResume}
                className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:text-white hover:bg-slate-800/50' : 'hover:text-slate-900 hover:bg-slate-100'}`}
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.9 }}
                title="Download Resume"
              >
                <Download className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="pt-8"
        >
          <motion.div
            className={`scroll-indicator flex flex-col items-center gap-2 text-xs font-mono ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`}
          >
            <span>scroll</span>
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
