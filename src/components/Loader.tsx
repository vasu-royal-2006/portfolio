import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoaderProps {
  onComplete: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Check if already loaded this session
    if (sessionStorage.getItem('portfolio-loaded')) {
      onComplete();
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsExiting(true);
          setTimeout(() => {
            sessionStorage.setItem('portfolio-loaded', 'true');
            onComplete();
          }, 600);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  const clampedProgress = Math.min(progress, 100);

  return (
    <AnimatePresence>
      {!isExiting ? (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #050505 0%, #0a0a14 50%, #050510 100%)',
          }}
          exit={{
            opacity: 0,
            filter: 'blur(20px)',
            scale: 1.05,
          }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Background aurora blobs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute w-96 h-96 rounded-full blur-[120px] opacity-20"
              style={{
                background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)',
                top: '20%',
                left: '20%',
                animation: 'aurora-shift 8s ease-in-out infinite',
              }}
            />
            <div
              className="absolute w-80 h-80 rounded-full blur-[100px] opacity-15"
              style={{
                background: 'radial-gradient(circle, #a855f7 0%, transparent 70%)',
                bottom: '20%',
                right: '20%',
                animation: 'aurora-shift-2 10s ease-in-out infinite',
              }}
            />
          </div>

          {/* Logo / Name */}
          <motion.div
            className="relative z-10 flex flex-col items-center gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Code icon */}
            <motion.div
              className="w-16 h-16 rounded-2xl border border-slate-700/50 bg-slate-900/50 backdrop-blur-xl flex items-center justify-center"
              initial={{ scale: 0.8, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: 'spring', stiffness: 200 }}
            >
              <span className="text-2xl font-black gradient-text">NV</span>
            </motion.div>

            {/* Name reveal */}
            <div className="text-center space-y-2">
              <motion.h1
                className="text-2xl sm:text-3xl font-bold text-white tracking-tight"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Nallamsetty Vasu
              </motion.h1>
              <motion.p
                className="text-xs font-mono text-slate-500 uppercase tracking-widest"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Loading Portfolio
              </motion.p>
            </div>

            {/* Progress bar */}
            <div className="w-48 sm:w-64 space-y-3">
              <div className="h-0.5 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #6366f1, #a855f7, #06b6d4)',
                    width: `${clampedProgress}%`,
                  }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <motion.p
                className="text-center text-xs font-mono text-slate-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {Math.round(clampedProgress)}%
              </motion.p>
            </div>
          </motion.div>

          {/* Noise */}
          <div className="noise-overlay" />
        </motion.div>
      ) : (
        <motion.div
          key="loader-exit"
          className="fixed inset-0 z-[9999]"
          style={{
            background: 'linear-gradient(135deg, #050505 0%, #0a0a14 50%, #050510 100%)',
          }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0, filter: 'blur(20px)' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />
      )}
    </AnimatePresence>
  );
};
