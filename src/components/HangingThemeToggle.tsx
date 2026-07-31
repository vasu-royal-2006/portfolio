import React, { useState } from 'react';
import { motion } from 'motion/react';

interface HangingThemeToggleProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const HangingThemeToggle: React.FC<HangingThemeToggleProps> = ({
  isDarkMode,
  onToggleTheme,
}) => {
  const [isPulled, setIsPulled] = useState(false);

  const handlePull = () => {
    if (isPulled) return;
    setIsPulled(true);
    
    // Trigger theme toggle after a slight delay to match the pull animation
    setTimeout(() => {
      onToggleTheme();
    }, 150);

    // Reset pull state
    setTimeout(() => {
      setIsPulled(false);
    }, 500);
  };

  return (
    <motion.div
      className="fixed top-0 right-10 md:right-24 z-[100] flex flex-col items-center"
      style={{ transformOrigin: 'top center' }}
      initial={{ rotate: -5 }}
      animate={{
        rotate: isPulled ? 0 : [-3, 3, -3],
      }}
      transition={{
        rotate: {
          repeat: Infinity,
          duration: 4,
          ease: 'easeInOut',
        },
      }}
    >
      {/* Top anchor */}
      <div className="w-6 h-3 bg-slate-800 dark:bg-slate-700 rounded-b-md shadow-lg" />

      {/* String */}
      <motion.div
        className="w-0.5 bg-slate-400 dark:bg-slate-500 origin-top"
        animate={{
          height: isPulled ? 140 : 100,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 15,
        }}
      />

      {/* Handle / Switch */}
      <motion.button
        className="relative group cursor-pointer focus:outline-none"
        onClick={handlePull}
        animate={{
          y: isPulled ? 40 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 15,
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="w-10 h-14 bg-white rounded-3xl shadow-[0_4px_10px_rgba(0,0,0,0.2)] flex items-end justify-center pb-2 border-2 border-slate-200 dark:border-slate-300 transition-colors">
          {/* Inner circle (the "eye") */}
          <div className="w-5 h-5 bg-slate-800 rounded-full flex items-center justify-center shadow-inner">
            <div
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                isDarkMode ? 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]' : 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]'
              }`}
            />
          </div>
        </div>
      </motion.button>
    </motion.div>
  );
};
