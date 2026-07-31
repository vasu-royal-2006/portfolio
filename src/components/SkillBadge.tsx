import React, { useState } from 'react';
import { motion, useInView } from 'motion/react';
import { Skill, AccentThemeConfig } from '../types';
import * as Icons from 'lucide-react';

interface SkillBadgeProps {
  skill: Skill;
  accentTheme: AccentThemeConfig;
  isDarkMode?: boolean;
  index?: number;
}

export const SkillBadge: React.FC<SkillBadgeProps> = ({ skill, accentTheme, isDarkMode = true, index = 0 }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });
  const [isHovered, setIsHovered] = useState(false);
  
  // Dynamic Lucide icon lookup
  const IconComponent = (Icons as unknown as Record<string, React.ElementType>)[skill.icon] || Icons.Code2;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 15 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.03, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.03, y: -3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`premium-card p-4 rounded-xl cursor-default group relative overflow-hidden ${accentTheme.borderHoverClass}`}
    >
      {/* Top Row: Icon + Name */}
      <div className="flex items-center gap-3 mb-3">
        <motion.div
          className={`p-2 rounded-lg border transition-colors flex items-center justify-center shrink-0 ${
            isDarkMode
              ? 'bg-slate-900/80 border-slate-800/60 text-slate-300'
              : 'bg-slate-100 border-slate-200 text-slate-700'
          }`}
          animate={isHovered ? { rotate: [0, -10, 10, 0], scale: 1.1 } : {}}
          transition={{ duration: 0.4 }}
        >
          <IconComponent className="w-4 h-4" />
        </motion.div>
        <div className="min-w-0 flex-1">
          <div
            className={`text-xs font-semibold truncate ${
              isDarkMode ? 'text-slate-200 group-hover:text-white' : 'text-slate-900'
            }`}
          >
            {skill.name}
          </div>
          <div
            className={`text-[10px] font-mono flex items-center gap-1.5 mt-0.5 ${
              isDarkMode ? 'text-slate-500' : 'text-slate-500'
            }`}
          >
            <span>{skill.category}</span>
            <span>•</span>
            <span>{skill.years}</span>
          </div>
        </div>
        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border shrink-0 ${accentTheme.badgeClass}`}>
          {skill.level}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className={`h-1 rounded-full overflow-hidden ${isDarkMode ? 'bg-slate-800/60' : 'bg-slate-200'}`}>
        <motion.div
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${accentTheme.hex}, ${accentTheme.hex}88)`,
          }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: 0.3 + index * 0.03, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </motion.div>
  );
};
