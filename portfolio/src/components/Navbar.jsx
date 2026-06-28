import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { navLinks } from '../data/portfolioData';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Handle scroll effects and active section highlighting
  useEffect(() => {
    const handleScroll = () => {
      // Toggle glassmorphism
      setIsScrolled(window.scrollY > 20);

      // Intersection Observer alternative for active highlighting based on scroll position
      const sections = navLinks.map(link => link.href.substring(1));
      
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Adjust 100 to trigger active state earlier/later
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      const offsetTop = element.offsetTop - 80; // Offset for sticky navbar
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-background/70 backdrop-blur-xl border-b border-surfaceBorder py-4 shadow-glass' 
          : 'bg-transparent py-6 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        
        {/* Logo */}
        <a 
          href="#home" 
          onClick={(e) => handleNavClick(e, '#home')}
          className="relative z-10 text-2xl font-bold tracking-tighter text-textPrimary flex items-center gap-1 group"
        >
          <span>Nandanita Upadhyay</span>
          <span className="text-accent group-hover:text-purple-400 transition-colors duration-300">.</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            
            return (
              <a 
                key={link.name} 
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative px-1 py-2 text-sm font-medium transition-colors duration-300 hover:text-textPrimary ${
                  isActive ? 'text-textPrimary' : 'text-textSecondary'
                }`}
              >
                {link.name}
                
                {/* Framer Motion Animated Underline */}
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute left-0 right-0 -bottom-[19px] h-[2px] bg-purple-gradient shadow-[0_0_8px_rgba(139,92,246,0.6)]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
          
          <a 
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="ml-4 px-5 py-2 text-sm font-medium text-textPrimary bg-surface border border-surfaceBorder rounded-lg hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-glass"
          >
            Let's Talk
          </a>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="relative z-10 md:hidden p-2 text-textSecondary hover:text-textPrimary transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute top-full left-4 right-4 mt-2 p-4 glass-panel flex flex-col gap-2 md:hidden"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              
              return (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`p-4 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-between ${
                    isActive 
                      ? 'bg-white/10 text-textPrimary' 
                      : 'text-textSecondary hover:bg-white/5 hover:text-textPrimary'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div 
                      layoutId="mobile-indicator"
                      className="w-1.5 h-1.5 rounded-full bg-accent shadow-soft-glow"
                    />
                  )}
                </a>
              );
            })}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;