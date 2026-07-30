import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Sun, Moon, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { AccentThemeConfig } from '../types';

interface SuspendedMouseToggleProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  accentTheme: AccentThemeConfig;
}

export const SuspendedMouseToggle: React.FC<SuspendedMouseToggleProps> = ({
  isDarkMode,
  onToggleTheme,
  accentTheme,
}) => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isPulling, setIsPulling] = useState(false);

  // Motion physics for dragging/pulling the mouse cord
  const dragY = useMotionValue(0);
  const springY = useSpring(dragY, { stiffness: 300, damping: 20 });

  // Transform cable height based on spring pull
  const cableHeight = useTransform(springY, (y) => 130 + y);

  // Play a sleek synthetic click sound using Web Audio API
  const playClickSound = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(isDarkMode ? 880 : 440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(
        isDarkMode ? 1320 : 660,
        ctx.currentTime + 0.08
      );

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    } catch {
      // Ignore audio policy blocks
    }
  };

  const handleToggle = () => {
    playClickSound();
    onToggleTheme();
  };

  return (
    <div className="fixed top-0 right-4 sm:right-16 z-50 flex flex-col items-center pointer-events-auto">
      {/* Top Mounting Bracket */}
      <div
        className={`w-4 h-2.5 rounded-b-md ${
          isDarkMode
            ? 'bg-slate-800 border-x border-b border-slate-700'
            : 'bg-slate-300 border-x border-b border-slate-400'
        } shadow-md relative z-10 flex items-center justify-center`}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
      </div>

      {/* Hanging Cable */}
      <motion.div
        className="w-[2px] transition-colors duration-300 relative"
        style={{
          height: cableHeight,
          background: isDarkMode
            ? `linear-gradient(to bottom, #3b82f6 0%, #1e293b 70%, ${accentTheme.hex} 100%)`
            : `linear-gradient(to bottom, #2563eb 0%, #cbd5e1 70%, #3b82f6 100%)`,
        }}
      >
        {/* Glow bead traveling down cable */}
        <motion.div
          animate={{ y: [0, 130, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="w-1.5 h-1.5 -left-[2px] absolute rounded-full bg-blue-400 blur-[1px] opacity-80"
        />
      </motion.div>

      {/* Hanging Mouse Device */}
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 60 }}
        dragElastic={0.4}
        dragSnapToOrigin
        onDragStart={() => setIsPulling(true)}
        onDragEnd={(_, info) => {
          setIsPulling(false);
          if (info.offset.y > 30) {
            handleToggle();
          }
        }}
        style={{ y: springY }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="relative group cursor-grab active:cursor-grabbing select-none"
      >
        {/* Mouse Device Shell */}
        <div
          className={`relative w-12 h-20 rounded-full p-1.5 transition-all duration-300 shadow-2xl flex flex-col items-center justify-between border ${
            isDarkMode
              ? 'bg-[#0d1117] border-slate-700/80 shadow-blue-500/10 group-hover:border-blue-500/50 group-hover:shadow-blue-500/20'
              : 'bg-white border-slate-300 shadow-slate-400/30 group-hover:border-blue-400 group-hover:shadow-blue-500/20'
          }`}
        >
          {/* Cable Port */}
          <div className="w-2 h-1.5 rounded-t-sm bg-slate-500/60 -mt-2.5 mb-1" />

          {/* Mouse Buttons Line */}
          <div className="w-full flex items-center justify-between px-1 pt-0.5">
            <div
              className={`w-3.5 h-4 rounded-tl-lg border-b border-r ${
                isDarkMode ? 'border-slate-800' : 'border-slate-200'
              }`}
            />

            {/* Scroll Wheel Button */}
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                handleToggle();
              }}
              whileTap={{ scale: 0.85, rotate: 180 }}
              whileHover={{ scale: 1.15 }}
              title="Click Wheel or Pull Cable to Toggle Mode"
              className={`w-4 h-7 rounded-full flex items-center justify-center transition-all duration-300 shadow-inner cursor-pointer relative z-10 ${
                isDarkMode
                  ? 'bg-blue-600/30 text-cyan-300 border border-blue-400/50 hover:bg-blue-500 hover:text-white shadow-blue-500/30'
                  : 'bg-amber-100 text-amber-600 border border-amber-300 hover:bg-amber-400 hover:text-white shadow-amber-500/20'
              }`}
            >
              {isDarkMode ? (
                <Moon className="w-2.5 h-2.5 drop-shadow-[0_0_4px_rgba(6,182,212,0.8)]" />
              ) : (
                <Sun className="w-2.5 h-2.5 drop-shadow-[0_0_4px_rgba(245,158,11,0.8)]" />
              )}
            </motion.button>

            <div
              className={`w-3.5 h-4 rounded-tr-lg border-b border-l ${
                isDarkMode ? 'border-slate-800' : 'border-slate-200'
              }`}
            />
          </div>

          {/* Sensor LED & Text */}
          <div className="my-auto flex flex-col items-center gap-1">
            <div
              className={`w-1.5 h-1.5 rounded-full ${
                isDarkMode
                  ? 'bg-cyan-400 shadow-[0_0_8px_#06b6d4]'
                  : 'bg-blue-500 shadow-[0_0_8px_#3b82f6]'
              }`}
            />
            <span
              className={`text-[8px] font-mono tracking-tighter uppercase ${
                isDarkMode ? 'text-slate-500' : 'text-slate-400'
              }`}
            >
              {isDarkMode ? 'DARK' : 'LIGHT'}
            </span>
          </div>

          {/* Bottom Curve */}
          <div
            className={`w-8 h-3 rounded-b-xl border-t ${
              isDarkMode ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-slate-100'
            }`}
          />

          {/* Ambient Glow */}
          <div
            className={`absolute -inset-1 rounded-full blur-md -z-10 transition-opacity duration-300 ${
              isHovered || isPulling ? 'opacity-80' : 'opacity-20'
            }`}
            style={{ backgroundColor: accentTheme.hex }}
          />
        </div>

        {/* Tooltip */}
        <motion.div
          initial={{ opacity: 0, x: 10, scale: 0.95 }}
          animate={{
            opacity: isHovered || isPulling ? 1 : 0,
            x: isHovered || isPulling ? 0 : 10,
            scale: isHovered || isPulling ? 1 : 0.95,
          }}
          transition={{ duration: 0.2 }}
          className={`absolute right-14 top-1/2 -translate-y-1/2 whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-mono shadow-xl border pointer-events-none flex items-center gap-2 ${
            isDarkMode
              ? 'bg-slate-900/95 text-slate-200 border-slate-700/80 shadow-black/50'
              : 'bg-white/95 text-slate-800 border-slate-200 shadow-slate-300/50'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span>{isPulling ? 'Release to toggle!' : 'Click wheel or pull cord'}</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30 font-bold">
            {isDarkMode ? 'LIGHT MODE' : 'DARK MODE'}
          </span>
        </motion.div>
      </motion.div>

      {/* Audio Mute/Unmute */}
      <motion.button
        onClick={() => setSoundEnabled(!soundEnabled)}
        whileTap={{ scale: 0.9 }}
        className={`mt-2 p-1.5 rounded-full text-xs transition-all cursor-pointer border ${
          isDarkMode
            ? 'bg-slate-900/80 text-slate-400 hover:text-white border-slate-800'
            : 'bg-slate-100 text-slate-600 hover:text-slate-900 border-slate-300'
        }`}
        title={soundEnabled ? 'Mute click sound' : 'Enable click sound'}
      >
        {soundEnabled ? (
          <Volume2 className="w-3 h-3 text-blue-400" />
        ) : (
          <VolumeX className="w-3 h-3 text-slate-500" />
        )}
      </motion.button>
    </div>
  );
};
