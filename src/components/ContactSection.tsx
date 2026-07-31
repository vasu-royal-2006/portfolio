import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DEVELOPER_INFO } from '../data/portfolioData';
import { AccentThemeConfig } from '../types';
import { AnimatedText } from './effects/AnimatedText';
import {
  MessageSquare,
  Mail,
  Phone,
  Send,
  Check,
  Copy,
  Clock,
  Github,
  Linkedin,
} from 'lucide-react';

interface ContactSectionProps {
  accentTheme: AccentThemeConfig;
  isDarkMode?: boolean;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  accentTheme,
  isDarkMode = true,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Project Inquiry',
    message: '',
  });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [timeString, setTimeString] = useState<string>('');

  const subjectPresets = [
    'Project Inquiry',
    'Role Opportunity',
    'Consulting',
    'General Chat',
  ];

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setTimeString(new Date().toLocaleTimeString('en-US', options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(DEVELOPER_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(DEVELOPER_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: 'Project Inquiry', message: '' });
    }, 1200);
  };

  return (
    <section id="contact" className="py-32 px-4 sm:px-8 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border backdrop-blur-xl ${
            isDarkMode ? 'bg-slate-900/40 border-slate-800/50 text-slate-300' : 'bg-white/60 border-slate-200/50 text-slate-600 shadow-sm'
          }`}
        >
          <MessageSquare className={`w-4 h-4 ${accentTheme.textAccentClass}`} />
          <span className="text-xs font-semibold uppercase tracking-wider">
            Get in touch
          </span>
        </motion.div>

        <AnimatedText
          text="Let's build something extraordinary."
          as="h2"
          className={`text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}
          animation="word"
          staggerChildren={0.04}
        />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className={`text-lg sm:text-xl font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}
        >
          Have a project in mind, a job opportunity, or just want to talk engineering? My inbox is always open.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Left Column: Direct Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          {/* Email Copy Card */}
          <div className={`premium-card p-8 rounded-3xl`}>
            <div className={`flex items-center gap-3 mb-6 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              <Mail className={`w-5 h-5 ${accentTheme.textAccentClass}`} />
              <span className="text-sm font-bold uppercase tracking-wider">Direct Email</span>
            </div>

            <div className={`flex items-center justify-between p-4 rounded-2xl border mb-6 ${
              isDarkMode ? 'bg-slate-900/40 border-slate-800/40' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className={`text-sm sm:text-base font-medium truncate ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                {DEVELOPER_INFO.email}
              </span>
              <motion.button
                onClick={handleCopyEmail}
                className={`p-2.5 rounded-xl transition-all cursor-pointer shrink-0 flex items-center gap-2 text-sm font-medium ${
                  isDarkMode ? 'bg-slate-800/60 text-slate-300 hover:text-white hover:bg-slate-700/60' : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200 shadow-sm'
                }`}
                title="Copy Email Address"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-500" />
                    <span className="text-emerald-500">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-400" />
                    <span>Copy</span>
                  </>
                )}
              </motion.button>
            </div>

            <motion.a
              href={`mailto:${DEVELOPER_INFO.email}?subject=${encodeURIComponent('Hello Nallamsetty Vasu')}`}
              className={`w-full py-4 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 cursor-pointer bg-gradient-to-r ${accentTheme.accentClass} shadow-lg glow-hover`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Send className="w-4 h-4" />
              <span>Open Native Mail Client</span>
            </motion.a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Timezone Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className={`premium-card p-6 rounded-3xl`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  <Clock className={`w-4 h-4 ${accentTheme.textAccentClass}`} />
                  <span>Local Time</span>
                </div>
              </div>
              <div className={`text-2xl font-bold tracking-tight mb-2 font-mono ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {timeString || '12:00 PM'}
              </div>
              <p className={`text-xs font-medium ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                India Standard Time (IST)
              </p>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className={`premium-card p-6 rounded-3xl flex flex-col justify-center gap-4`}
            >
              {[
                { icon: Github, href: DEVELOPER_INFO.github, label: 'vasu-royal-2006' },
                { icon: Linkedin, href: DEVELOPER_INFO.linkedin, label: 'n-vasu' },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-2xl border transition-all flex items-center gap-3 text-sm font-semibold ${
                    isDarkMode
                      ? 'bg-slate-900/40 border-slate-800/40 text-slate-300 hover:text-white hover:border-slate-700/50'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-300'
                  }`}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className="w-5 h-5" />
                  <span>{label}</span>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Right Column: Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className={`premium-card p-8 sm:p-10 rounded-3xl relative overflow-hidden`}
        >
          {/* Background glow */}
          <div
            className="absolute -top-20 -right-20 w-60 h-60 rounded-full blur-[100px] pointer-events-none opacity-[0.06]"
            style={{ backgroundColor: accentTheme.hex }}
          />

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { label: 'Name', type: 'text', placeholder: 'John Doe', key: 'name' as const },
                { label: 'Email', type: 'email', placeholder: 'john@example.com', key: 'email' as const },
              ].map((field) => (
                <div key={field.key} className="space-y-2">
                  <label className={`text-sm font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{field.label}</label>
                  <input
                    type={field.type}
                    required
                    placeholder={field.placeholder}
                    value={formData[field.key]}
                    onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                    className={`w-full px-4 py-3.5 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 ${
                      isDarkMode
                        ? 'bg-slate-900/30 border border-slate-800/40 text-white placeholder-slate-600 focus:ring-slate-600/30 focus:border-slate-700'
                        : 'bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:ring-blue-400/20 focus:border-blue-400'
                    }`}
                  />
                </div>
              ))}
            </div>

            {/* Subject Preset Buttons */}
            <div className="space-y-3">
              <label className={`text-sm font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>What is this regarding?</label>
              <div className="flex flex-wrap gap-2">
                {subjectPresets.map((preset) => {
                  const isSelected = formData.subject === preset;
                  return (
                    <motion.button
                      key={preset}
                      type="button"
                      onClick={() => setFormData({ ...formData, subject: preset })}
                      className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? isDarkMode
                            ? 'bg-slate-800/60 text-white border border-slate-700/50 shadow-md'
                            : 'bg-slate-900 text-white border border-slate-800 shadow-md'
                          : isDarkMode
                          ? 'bg-slate-900/20 text-slate-400 border border-slate-800/40 hover:text-slate-200 hover:bg-slate-900/40'
                          : 'bg-slate-50 text-slate-600 border border-slate-200 hover:text-slate-900 hover:bg-white'
                      }`}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {preset}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <label className={`text-sm font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Message</label>
              <textarea
                required
                rows={6}
                placeholder="Tell me about your project, timeline, or idea..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className={`w-full px-4 py-4 rounded-xl text-sm transition-all resize-none focus:outline-none focus:ring-2 ${
                  isDarkMode
                    ? 'bg-slate-900/30 border border-slate-800/40 text-white placeholder-slate-600 focus:ring-slate-600/30 focus:border-slate-700'
                    : 'bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:ring-blue-400/20 focus:border-blue-400'
                }`}
              />
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 shadow-xl cursor-pointer bg-gradient-to-r ${accentTheme.accentClass} glow-hover ${
                isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
              }`}
              whileHover={!isSubmitting ? { scale: 1.02 } : {}}
              whileTap={!isSubmitting ? { scale: 0.98 } : {}}
            >
              {isSubmitting ? (
                <>
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </>
              )}
            </motion.button>
          </form>

          {/* Success Banner Overlay */}
          <AnimatePresence>
            {submitted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                className={`absolute inset-0 backdrop-blur-2xl rounded-3xl p-8 flex flex-col items-center justify-center text-center space-y-6 z-20 border ${
                  isDarkMode ? 'bg-[#050505]/90 border-slate-800/40' : 'bg-white/95 border-slate-200'
                }`}
              >
                <motion.div
                  className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                >
                  <Check className="w-8 h-8" />
                </motion.div>
                <h3 className={`text-3xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Message Sent</h3>
                <p className={`text-base font-medium max-w-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  Thanks for reaching out! I'll get back to you within 24-48 hours.
                </p>
                <motion.button
                  onClick={() => setSubmitted(false)}
                  className={`px-6 py-3 rounded-xl text-sm font-bold cursor-pointer transition-all ${
                    isDarkMode ? 'bg-slate-800/60 text-white hover:bg-slate-700/60' : 'bg-slate-200 text-slate-900 hover:bg-slate-300'
                  }`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Done
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
