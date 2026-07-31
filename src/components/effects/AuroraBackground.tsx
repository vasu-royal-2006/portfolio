import React, { useEffect, useRef } from 'react';

interface AuroraBackgroundProps {
  isDarkMode: boolean;
  accentHex?: string;
}

export const AuroraBackground: React.FC<AuroraBackgroundProps> = ({
  isDarkMode,
  accentHex = '#6366f1',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate particles
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 20}s`,
    duration: `${15 + Math.random() * 20}s`,
    size: `${1 + Math.random() * 2}px`,
  }));

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {/* Aurora Blob 1 — Primary accent */}
      <div
        className="aurora-blob aurora-blob-1"
        style={{
          width: '600px',
          height: '600px',
          top: '-10%',
          left: '10%',
          background: isDarkMode
            ? `radial-gradient(circle, ${accentHex}18 0%, transparent 70%)`
            : `radial-gradient(circle, ${accentHex}0a 0%, transparent 70%)`,
        }}
      />

      {/* Aurora Blob 2 — Purple */}
      <div
        className="aurora-blob aurora-blob-2"
        style={{
          width: '500px',
          height: '500px',
          top: '30%',
          right: '-5%',
          background: isDarkMode
            ? 'radial-gradient(circle, rgba(168, 85, 247, 0.08) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(168, 85, 247, 0.04) 0%, transparent 70%)',
        }}
      />

      {/* Aurora Blob 3 — Cyan */}
      <div
        className="aurora-blob aurora-blob-3"
        style={{
          width: '450px',
          height: '450px',
          bottom: '0%',
          left: '30%',
          background: isDarkMode
            ? 'radial-gradient(circle, rgba(6, 182, 212, 0.06) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(6, 182, 212, 0.03) 0%, transparent 70%)',
        }}
      />

      {/* Mesh gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: isDarkMode
            ? 'radial-gradient(ellipse at 20% 50%, rgba(99, 102, 241, 0.04) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(168, 85, 247, 0.03) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(6, 182, 212, 0.03) 0%, transparent 50%)'
            : 'radial-gradient(ellipse at 20% 50%, rgba(99, 102, 241, 0.02) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(168, 85, 247, 0.015) 0%, transparent 50%)',
        }}
      />

      {/* Floating Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            bottom: '-5%',
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}

      {/* Noise overlay */}
      <div className="noise-overlay" />
    </div>
  );
};
