import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowUp } from 'react-icons/fi';
import { socialLinks } from '../data/portfolioData';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="relative bg-surface/30 border-t border-surfaceBorder pt-16 pb-8 overflow-hidden">
      {/* Ambient Bottom Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/5 rounded-t-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          
          {/* Animated Logo */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold tracking-tighter text-textPrimary flex items-center gap-1 group cursor-pointer"
            onClick={scrollToTop}
          >
            <span>Nandanita</span>
            <motion.span 
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-accent group-hover:text-purple-400 transition-colors duration-300"
            >
              .
            </motion.span>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-4"
          >
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a 
                  key={social.id} 
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 rounded-xl glass-panel flex items-center justify-center text-textSecondary hover:text-white hover:border-accent/50 hover:-translate-y-1 transition-all duration-300 shadow-soft-glow"
                  aria-label={social.name}
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </motion.div>

          {/* Back to Top Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            onClick={scrollToTop}
            className="group flex items-center gap-3 text-sm font-medium text-textSecondary hover:text-white transition-colors"
          >
            <span className="uppercase tracking-wider text-xs">Back to top</span>
            <div className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center group-hover:-translate-y-1 group-hover:border-accent/50 group-hover:text-accent transition-all duration-300 shadow-soft-glow">
              <FiArrowUp size={18} />
            </div>
          </motion.button>
        </div>

        {/* Copyright */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center pt-8 border-t border-surfaceBorder/50 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-sm text-textSecondary">
            &copy; {new Date().getFullYear()} Nandanita. All rights reserved.
          </p>
          <p className="text-sm text-textSecondary/60 flex items-center gap-1">
            Engineered with <span className="text-accent">React</span> & <span className="text-accent">Tailwind</span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;