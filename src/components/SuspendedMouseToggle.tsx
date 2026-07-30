import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useAnimation } from 'motion/react';
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
  const [isSwinging, setIsSwinging] = useState(false);

  // Motion values for physical rope pull & pendulum rotation
  const dragY = useMotionValue(0);
  const ropeSpringY = useSpring(dragY, { stiffness: 350, damping: 18 });
  const swingAngle = useMotionValue(0);
  const springAngle = useSpring(swingAngle, { stiffness: 120, damping: 8 });
  const controls = useAnimation();

  // Dynamic rope length based on pull
  const ropeLength = useTransform(ropeSpringY, (y) => 130 + y);

  // Ambient pendulum sway effect when idle
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const triggerAmbientSway = () => {
      if (!isPulling) {
        swingAngle.set(Math.random() > 0.5 ? 4 : -4);
        setTimeout(() => swingAngle.set(0), 1200);
      }
      timeout = setTimeout(triggerAmbientSway, 6000);
    };

    timeout = setTimeout(triggerAmbientSway, 3000);
    return () => clearTimeout(timeout);
  }, [isPulling, swingAngle]);

  // Audio feedback on pull
  const playClickSound = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      // Pull tension click
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(isDarkMode ? 520 : 880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(
        isDarkMode ? 960 : 440,
        ctx.currentTime + 0.12
      );

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.13);
    } catch {
      // Ignore audio policy blocks
    }
  };

  const handleToggle = () => {
    playClickSound();
    onToggleTheme();
    // Trigger pendulum recoil swing
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
    <div className="fixed top-16 right-3 sm:right-6 z-[60] flex flex-col items-center pointer-events-auto" style={{pointerEvents: 'auto'}}>
      <motion.div
        initial={{ opacity: 0, y: -8, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className={`mb-2 px-3 py-2 rounded-full border backdrop-blur-xl shadow-lg flex items-center gap-2.5 ${
          isDarkMode
            ? 'bg-slate-900/85 text-slate-100 border-slate-700/80 shadow-cyan-500/10'
            : 'bg-white/90 text-slate-700 border-slate-300 shadow-amber-500/20'
        }`}
      >
        <div
          className={`flex h-7 w-7 items-center justify-center rounded-full border ${
            isDarkMode ? 'border-cyan-400/50 bg-cyan-500/10' : 'border-amber-400/50 bg-amber-500/10'
          }`}
          style={{ borderColor: accentTheme.hex }}
        >
          <Sparkles className={`w-3.5 h-3.5 ${isDarkMode ? 'text-cyan-300' : 'text-amber-600'}`} />
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-[9px] uppercase tracking-[0.35em] font-semibold opacity-70">
            Brightness
          </span>
          <span className="text-[11px] font-semibold">
            {isDarkMode ? 'Night mode ready' : 'Day mode ready'}
          </span>
        </div>
        <div
          className="h-2.5 w-2.5 rounded-full animate-pulse"
          style={{ backgroundColor: accentTheme.hex }}
        />
      </motion.div>

      {/* Ceiling Rope Mount Fixture */}
      <div
        className={`w-7 h-5 rounded-b-xl border-x border-b ${
          isDarkMode
            ? 'bg-slate-800 border-slate-700 shadow-slate-950/80'
            : 'bg-slate-300 border-slate-400 shadow-slate-400/40'
        } shadow-lg relative z-20 flex items-center justify-center`}
      >
        <div
          className="w-2.5 h-2.5 rounded-full transition-colors duration-300"
          style={{ backgroundColor: accentTheme.hex }}
        />
        <div className="absolute -bottom-2.5 w-3.5 h-3.5 rounded-full border-2 border-slate-500 bg-transparent" />
      </div>

      {/* Rope Suspension Group with Pendulum Motion */}
      <motion.div
        style={{ rotate: springAngle }}
        className="flex flex-col items-center origin-top relative z-10"
      >
        {/* Braided Rope String */}
        <motion.div
          className="relative transition-colors duration-300 flex flex-col items-center"
          style={{ height: ropeLength }}
        >
          <svg
            className="w-2.5 h-full overflow-visible"
            preserveAspectRatio="none"
            viewBox="0 0 8 100"
          >
            <path
              d="M4,0 L4,100"
              stroke={isDarkMode ? '#0f172a' : '#cbd5e1'}
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              d="M4,0 L4,100"
              stroke={isDarkMode ? '#475569' : '#94a3b8'}
              strokeWidth="3.5"
              strokeDasharray="4 2"
              strokeLinecap="round"
            />
            <path
              d="M4,0 L4,100"
              stroke={accentTheme.hex}
              strokeWidth="1.5"
              strokeDasharray="2 6"
              strokeOpacity={isDarkMode ? '0.9' : '0.7'}
            />
          </svg>

          <motion.div
            animate={{ y: [0, 110, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="w-3 h-3 absolute rounded-full blur-[1px] opacity-80"
            style={{ backgroundColor: accentTheme.hex }}
          />
        </motion.div>

        <motion.div
          drag="y"
          dragConstraints={{ top: 0, bottom: 55 }}
          dragElastic={0.35}
          dragSnapToOrigin
          onDragStart={() => setIsPulling(true)}
          onDragEnd={(_, info) => {
            setIsPulling(false);
            if (info.offset.y > 25) {
              handleToggle();
            }
          }}
          style={{ y: ropeSpringY }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative group cursor-grab active:cursor-grabbing select-none -mt-1"
        >
          <div
            className={`w-5 h-3.5 mx-auto rounded-t-lg border-t border-x ${
              isDarkMode
                ? 'bg-slate-800 border-slate-700'
                : 'bg-slate-200 border-slate-400'
            }`}
          />

          <div
            className={`relative w-14 h-20 rounded-[1.5rem] p-2.5 transition-all duration-300 shadow-[0_18px_45px_-12px_rgba(15,23,42,0.45)] flex flex-col items-center justify-between border ${
              isDarkMode
                ? 'bg-[#0b0f17] border-slate-700/80 group-hover:border-cyan-400/80'
                : 'bg-white border-slate-300 group-hover:border-amber-400'
            }`}
          >
            <div
              className={`w-full flex-1 rounded-[1.15rem] flex flex-col items-center justify-center transition-all duration-300 relative overflow-hidden border ${
                isDarkMode
                  ? 'bg-slate-900/90 border-slate-800 text-cyan-300'
                  : 'bg-amber-50/90 border-amber-200 text-amber-600'
              }`}
            >
              <motion.div
                animate={isSwinging ? { rotate: [0, 360] } : {}}
                transition={{ duration: 0.6 }}
              >
                {isDarkMode ? (
                  <Moon className="w-6 h-6 text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
                ) : (
                  <Sun className="w-6 h-6 text-amber-500 drop-shadow-[0_0_10px_rgba(245,158,11,0.8)]" />
                )}
              </motion.div>

              <span
                className={`text-[9px] font-mono font-bold tracking-[0.3em] uppercase mt-1 ${
                  isDarkMode ? 'text-cyan-400/90' : 'text-amber-600/90'
                }`}
              >
                {isDarkMode ? 'DARK' : 'LIGHT'}
              </span>

              <div
                className={`absolute inset-0 rounded-[1.15rem] opacity-20 pointer-events-none transition-opacity ${
                  isHovered || isPulling ? 'opacity-45' : 'opacity-20'
                }`}
                style={{
                  background: isDarkMode
                    ? 'radial-gradient(circle, rgba(6,182,212,0.6) 0%, transparent 70%)'
                    : 'radial-gradient(circle, rgba(245,158,11,0.6) 0%, transparent 70%)',
                }}
              />
            </div>

            <div
              className={`w-8 h-2.5 rounded-b-full border-b mt-1.5 transition-colors ${
                isDarkMode
                  ? 'bg-slate-800 border-cyan-400/60'
                  : 'bg-amber-100 border-amber-400'
              }`}
            />

            <div
              className={`absolute -inset-1.5 rounded-[1.5rem] blur-md -z-10 transition-opacity duration-300 ${
                isHovered || isPulling ? 'opacity-90 scale-105' : 'opacity-30'
              }`}
              style={{
                backgroundColor: isDarkMode ? '#06b6d4' : '#f59e0b',
              }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, x: 12, scale: 0.95 }}
            animate={{
              opacity: isHovered || isPulling ? 1 : 0,
              x: isHovered || isPulling ? 0 : 12,
              scale: isHovered || isPulling ? 1 : 0.95,
            }}
            transition={{ duration: 0.2 }}
            className={`absolute right-20 top-1/2 -translate-y-1/2 whitespace-nowrap px-3.5 py-2 rounded-2xl text-xs font-mono shadow-2xl border pointer-events-none flex items-center gap-2.5 ${
              isDarkMode
                ? 'bg-slate-900/95 text-slate-100 border-slate-700/90 shadow-black/80'
                : 'bg-white/95 text-slate-800 border-slate-300 shadow-slate-400/40'
            }`}
          >
            <Sparkles
              className={`w-4 h-4 ${isDarkMode ? 'text-cyan-400' : 'text-amber-500'}`}
            />
            <div className="flex flex-col">
              <span className="font-semibold text-xs">
                {isPulling ? 'Release cord to switch!' : 'Pull rope down to toggle'}
              </span>
              <span className="text-[10px] text-slate-400 font-normal">
                {isDarkMode ? 'Current: Dark Mode' : 'Current: Light Mode'}
              </span>
            </div>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-lg font-bold border uppercase tracking-wider ${
                isDarkMode
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                  : 'bg-amber-500/20 text-amber-700 border-amber-500/40'
              }`}
            >
              {isDarkMode ? 'LIGHT' : 'DARK'}
            </span>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.button
        onClick={() => setSoundEnabled(!soundEnabled)}
        whileTap={{ scale: 0.9 }}
        className={`mt-3 p-1.5 rounded-full text-xs transition-all cursor-pointer border ${
          isDarkMode
            ? 'bg-slate-900/80 text-slate-400 hover:text-white border-slate-800 hover:border-slate-700'
            : 'bg-slate-100 text-slate-600 hover:text-slate-900 border-slate-300 hover:border-slate-400 shadow-sm'
        }`}
        title={soundEnabled ? 'Mute click sound' : 'Enable click sound'}
      >
        {soundEnabled ? (
          <Volume2 className={`w-3.5 h-3.5 ${isDarkMode ? 'text-cyan-400' : 'text-amber-600'}`} />
        ) : (
          <VolumeX className="w-3.5 h-3.5 text-slate-400" />
        )}
      </motion.button>
    </div>
  );
};
