import React from 'react';
import { motion, useInView } from 'motion/react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  delay?: number;
  staggerChildren?: number;
  animation?: 'word' | 'character' | 'fade';
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
  as: Tag = 'span',
  delay = 0,
  staggerChildren = 0.04,
  animation = 'word',
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  if (animation === 'fade') {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        <Tag className={className}>{text}</Tag>
      </motion.div>
    );
  }

  const items = animation === 'word' ? text.split(' ') : text.split('');

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {items.map((item, index) => (
        <motion.span
          key={`${item}-${index}`}
          className="inline-block"
          initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{
            duration: 0.5,
            delay: delay + index * staggerChildren,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {item}
          {animation === 'word' && index < items.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </Tag>
  );
};
