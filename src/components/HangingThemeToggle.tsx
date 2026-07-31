import React from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';

interface HangingThemeToggleProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const HangingThemeToggle: React.FC<HangingThemeToggleProps> = ({
  isDarkMode,
  onToggleTheme,
}) => {
  const y = useMotionValue(0);
  // String length starts at 100px and extends up to 150px as you pull down 50px
  const stringHeight = useTransform(y, [0, 50], [100, 150]);

  // info is of type PanInfo, but we can safely use 'any' to avoid type issues here
  const handleDragEnd = (event: any, info: any) => {
    // If the switch is pulled down by at least 30 pixels
    if (info.offset.y > 30) {
      onToggleTheme();
    }
  };

  return (
    <motion.div
      className="fixed top-0 right-16 md:right-32 z-[100] flex flex-col items-center"
      style={{ transformOrigin: 'top center' }}
      initial={{ rotate: -5 }}
      animate={{
        rotate: [-3, 3, -3],
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
      <div className="w-6 h-3 bg-slate-800 dark:bg-slate-700 rounded-b-md shadow-lg pointer-events-none" />

      {/* String */}
      <motion.div
        className="w-0.5 bg-slate-400 dark:bg-slate-500 origin-top pointer-events-none"
        style={{ height: stringHeight }}
      />

      {/* Handle / Switch */}
      <motion.div
        className="relative group cursor-grab active:cursor-grabbing focus:outline-none"
        drag="y"
        dragConstraints={{ top: 0, bottom: 50 }}
        dragElastic={0.2}
        dragSnapToOrigin={true}
        style={{ y }}
        onDragEnd={handleDragEnd}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="w-10 h-14 bg-white rounded-3xl shadow-[0_4px_10px_rgba(0,0,0,0.2)] flex items-end justify-center pb-2 border-2 border-slate-200 dark:border-slate-300 transition-colors pointer-events-none">
          {/* Inner circle (the "eye") */}
          <div className="w-5 h-5 bg-slate-800 rounded-full flex items-center justify-center shadow-inner pointer-events-none">
            <div
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                isDarkMode ? 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]' : 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]'
              }`}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
