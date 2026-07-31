import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

interface ScrollProgressProps {
  accentHex?: string;
}

export const ScrollProgress: React.FC<ScrollProgressProps> = ({
  accentHex = '#6366f1',
}) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="scroll-progress-bar"
      style={{
        scaleX,
        background: `linear-gradient(90deg, ${accentHex}, #a855f7, #06b6d4)`,
      }}
    />
  );
};
