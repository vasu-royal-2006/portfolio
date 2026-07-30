import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useAnimation } from 'motion/react';
import { Sun, Moon, Volume2, VolumeX } from 'lucide-react';
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
  const [isSwinging, setIsSwinging] = useState(false);
  const [topOffset, setTopOffset] = useState<number | null>(56);

  // Motion values
  const dragY = useMotionValue(0);
  const ropeSpringY = useSpring(dragY, { stiffness: 350, damping: 18 });
  const swingAngle = useMotionValue(0);
  const springAngle = useSpring(swingAngle, { stiffness: 120, damping: 8 });

  // Rope length based on drag
  const ropeLength = useTransform(ropeSpringY, (y) => 110 + y);

  // Ambient sway
  useEffect(() => {
    let t: NodeJS.Timeout;
    const sway = () => {
      if (!isPulling) {
        swingAngle.set(Math.random() > 0.5 ? 4 : -4);
        setTimeout(() => swingAngle.set(0), 1200);
      }
      t = setTimeout(sway, 6000);
    };
    t = setTimeout(sway, 2000);
    return () => clearTimeout(t);
  }, [isPulling, swingAngle]);

  // Compute header height to align rope under navbar
  useEffect(() => {
    const compute = () => {
      const header = document.querySelector('header');
      const h = header ? Math.round(header.getBoundingClientRect().height) : 56;
      setTopOffset(h + 6);
    };
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);

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

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(isDarkMode ? 520 : 880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(isDarkMode ? 960 : 440, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.13);
    } catch {
      // ignore
    }
  };

  const handleToggle = () => {
    playClickSound();
    onToggleTheme();
    setIsSwinging(true);
    swingAngle.set(12);
    setTimeout(() => {
      swingAngle.set(-8);
      setTimeout(() => {
        swingAngle.set(4);
        setTimeout(() => {
          swingAngle.set(0);
          setIsSwinging(false);
        }, 300);
      }, 300);
    }, 300);
  };

  return (
    <div
      className="fixed right-6 z-[60] flex flex-col items-center pointer-events-auto"
      style={{ top: topOffset ? `${topOffset}px` : undefined, transition: 'top 180ms ease' }}
    >
      <motion.div style={{ rotate: springAngle }} className="flex flex-col items-center origin-top relative z-10">
        {/* Rope */}
        <motion.div className="relative flex flex-col items-center" style={{ height: ropeLength }}>
          <svg className="w-2.5 h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 8 100">
            <path d="M4,0 L4,100" stroke={isDarkMode ? '#0f172a' : '#cbd5e1'} strokeWidth="5" strokeLinecap="round" />
            <path d="M4,0 L4,100" stroke={isDarkMode ? '#475569' : '#94a3b8'} strokeWidth="3.5" strokeDasharray="4 2" strokeLinecap="round" />
            <path d="M4,0 L4,100" stroke={accentTheme.hex} strokeWidth="1.5" strokeDasharray="2 6" strokeOpacity={isDarkMode ? '0.9' : '0.7'} />
          </svg>

          <motion.div animate={{ y: [0, 110, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} className="w-3 h-3 absolute rounded-full blur-[1px] opacity-80" style={{ backgroundColor: accentTheme.hex }} />
        </motion.div>

        {/* Knob (icons-only) */}
        <motion.div
          drag="y"
          dragConstraints={{ top: 0, bottom: 60 }}
          dragElastic={0.35}
          dragSnapToOrigin
          onDragStart={() => setIsPulling(true)}
          onDragEnd={(_, info) => {
            setIsPulling(false);
            if (info.offset.y > 25) handleToggle();
          }}
          style={{ y: ropeSpringY }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          className="relative group cursor-grab active:cursor-grabbing select-none -mt-1"
        >
          <div className={`relative w-14 h-20 rounded-[1.5rem] p-2.5 transition-all duration-300 shadow-[0_18px_45px_-12px_rgba(15,23,42,0.45)] flex items-center justify-center border ${
            isDarkMode ? 'bg-[#0b0f17] border-slate-700/80' : 'bg-white border-slate-300'
          }`}>
            <div className={`flex items-center justify-center w-full h-full rounded-[1.15rem] ${isDarkMode ? 'text-cyan-300' : 'text-amber-600'}`}>
              {isDarkMode ? (
                <Moon className="w-8 h-8 text-cyan-400 drop-shadow-[0_0_12px_rgba(6,182,212,0.85)]" />
              ) : (
                <Sun className="w-8 h-8 text-amber-500 drop-shadow-[0_0_12px_rgba(245,158,11,0.85)]" />
              )}
            </div>

            <div className={`absolute -inset-1.5 rounded-[1.5rem] blur-md -z-10 transition-opacity duration-300 ${isHovered || isPulling ? 'opacity-90 scale-105' : 'opacity-30'}`} style={{ backgroundColor: isDarkMode ? '#06b6d4' : '#f59e0b' }} />
          </div>
        </motion.div>
      </motion.div>

      <motion.button onClick={() => setSoundEnabled(!soundEnabled)} whileTap={{ scale: 0.9 }} className={`mt-3 p-1.5 rounded-full text-xs transition-all cursor-pointer border ${isDarkMode ? 'bg-slate-900/80 text-slate-400 hover:text-white border-slate-800 hover:border-slate-700' : 'bg-slate-100 text-slate-600 hover:text-slate-900 border-slate-300 hover:border-slate-400 shadow-sm'}`} title={soundEnabled ? 'Mute click sound' : 'Enable click sound'}>
        {soundEnabled ? (
          <Volume2 className={`w-3.5 h-3.5 ${isDarkMode ? 'text-cyan-400' : 'text-amber-600'}`} />
        ) : (
          <VolumeX className="w-3.5 h-3.5 text-slate-400" />
        )}
      </motion.button>
    </div>
  );
};
