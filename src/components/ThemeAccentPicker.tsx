import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ACCENT_THEMES } from '../data/portfolioData';
import { AccentColor } from '../types';
import { Palette, Check } from 'lucide-react';

interface ThemeAccentPickerProps {
  currentAccent: AccentColor;
  onSelectAccent: (accent: AccentColor) => void;
}

export const ThemeAccentPicker: React.FC<ThemeAccentPickerProps> = ({
  currentAccent,
  onSelectAccent,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full glass-card hover:border-slate-600 text-slate-300 hover:text-white transition-all duration-200 flex items-center justify-center gap-1.5 text-xs font-medium"
        title="Customize Accent Color"
        aria-label="Theme Color Picker"
      >
        <span
          className="w-3.5 h-3.5 rounded-full shadow-sm animate-pulse"
          style={{ backgroundColor: ACCENT_THEMES[currentAccent].hex }}
        />
        <Palette className="w-3.5 h-3.5 text-slate-400" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Click outside backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 z-50 w-48 glass-panel p-3 rounded-xl shadow-2xl border border-slate-700/80"
            >
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 px-1">
                Accent Theme
              </div>
              <div className="space-y-1">
                {Object.values(ACCENT_THEMES).map((theme) => {
                  const isSelected = theme.id === currentAccent;
                  return (
                    <button
                      key={theme.id}
                      onClick={() => {
                        onSelectAccent(theme.id);
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        isSelected
                          ? 'bg-slate-800/90 text-white border border-slate-700'
                          : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: theme.hex }}
                        />
                        <span>{theme.name}</span>
                      </div>
                      {isSelected && (
                        <Check
                          className="w-3.5 h-3.5"
                          style={{ color: theme.hex }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
