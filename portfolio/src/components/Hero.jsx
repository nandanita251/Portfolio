import { useState, useEffect , useMemo } from "react";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiDownload,
} from "react-icons/fi";
import { personalInfo, socialLinks } from "../data/portfolioData";

const Hero = () => {
  // --- Mouse Glow Effect ---
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { currentTarget, clientX, clientY } = e;
    const { left, top } = currentTarget.getBoundingClientRect();
    setMousePosition({
      x: clientX - left,
      y: clientY - top,
    });
  };

  // --- Typewriter Effect ---
  const roles = useMemo(() => [
  "React Developer",
  "MERN Developer",
  "Frontend Developer",
], []);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 100;
    const currentRole = roles[currentRoleIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting && currentText === currentRole) {
        setTimeout(() => setIsDeleting(true), 1500); // Pause at end of word
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      } else {
        const nextText = isDeleting
          ? currentRole.substring(0, currentText.length - 1)
          : currentRole.substring(0, currentText.length + 1);
        setCurrentText(nextText);
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentRoleIndex, roles]);

  // --- Animations ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  // Generate random particles
  const [particles] = useState(() =>
  Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }))
);// The empty array [] ensures this math only runs once!

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Dynamic Mouse Glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 opacity-50"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.12), transparent 40%)`,
        }}
      />

      {/* Static Background Gradient Blobs */}
      <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />

      {/* Floating Particles */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-white/20"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: ["0%", "-50%", "0%"],
              x: ["0%", "20%", "0%"],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column: Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl text-left"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-6 border-accent/20"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-medium text-textSecondary">
              Available for Placements
            </span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="heading-xl mb-4">
            Hi, I'm{" "}
            <span className="text-gradient">
              {personalInfo.name.split(" ")[0]}
            </span>
            .
          </motion.h1>

          <motion.div variants={itemVariants} className="h-12 md:h-16 mb-6">
            <h2 className="text-2xl md:text-4xl font-semibold text-textSecondary flex items-center">
              A passionate&nbsp;
              <span className="text-white">
                {currentText}
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="inline-block ml-[2px] w-[3px] h-8 md:h-10 bg-accent translate-y-1 md:translate-y-2"
                />
              </span>
            </h2>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-lg text-textSecondary mb-10 leading-relaxed max-w-xl"
          >
            {personalInfo.bio}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 mb-12"
          >
            <a href="#projects" className="btn-primary group">
              View Projects
              <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              // Line 184
              href="/Nandanita_Upadhyay_Resume (2).pdf"
              target="_blank"
              rel="noreferrer"
              className="btn-secondary group"
            >
              Resume
              <FiDownload className="ml-2 group-hover:-translate-y-1 transition-transform" />
            </a>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex gap-6 items-center"
          >
            <div className="w-12 h-[1px] bg-surfaceBorder" />
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-textSecondary hover:text-white hover:-translate-y-1 transition-all duration-300 p-2 glass-panel hover:border-accent/30 hover:shadow-soft-glow"
                  aria-label={social.name}
                >
                  <Icon size={20} />
                </a>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Right Column: Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="relative hidden lg:flex justify-center items-center"
        >
          {/* Decorative rings */}
          <div className="absolute inset-0 bg-glow-conic rounded-full blur-3xl opacity-30 animate-pulse-glow" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute w-[420px] h-[420px] rounded-full border border-dashed border-white/10"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute w-[350px] h-[350px] rounded-full border border-white/5"
          />

          <div className="relative w-80 h-80 rounded-full p-2 glass-panel shadow-2xl overflow-hidden group">
            <div className="absolute inset-0 bg-purple-gradient opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
            {/* Make sure to place your actual image in public/profile.webp */}
            <img
            
              src="/Profile.jpeg"
              alt={personalInfo.name}
              className="w-full h-full object-cover rounded-full filter grayscale hover:grayscale-0 transition-all duration-700"
              onError={(e) => {
                // Fallback if image doesn't exist yet
                e.target.src = `https://ui-avatars.com/api/?name=${personalInfo.name.replace(" ", "+")}&size=512&background=3B82F6&color=fff`;
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-textSecondary hover:text-white transition-colors"
      >
        <span className="text-xs uppercase tracking-[0.2em]">Scroll</span>
        <div className="w-6 h-10 rounded-full border border-surfaceBorder flex justify-center p-1 glass-panel">
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-accent"
          />
        </div>
      </motion.a>
    </section>
  );
};

export default Hero;
