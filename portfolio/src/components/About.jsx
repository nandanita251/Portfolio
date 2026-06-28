import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { FiCode, FiShield, FiMonitor, FiAward, FiBriefcase } from 'react-icons/fi';

// Custom Animated Counter Component
const AnimatedCounter = ({ from, to, duration = 2, suffix = "" }) => {
  const [count, setCount] = useState(from);
  const nodeRef = useRef(null);
  const inView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView) {
      let startTime;
      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        setCount(Math.floor(progress * (to - from) + from));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [inView, from, to, duration]);

  return <span ref={nodeRef}>{count}{suffix}</span>;
};

const About = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, threshold: 0.2 });

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  const stats = [
    { label: "Full-Stack Apps", value: 3, suffix: "+", icon: <FiMonitor /> },
    { label: "Months Experience", value: 6, suffix: "+", icon: <FiBriefcase /> },
    { label: "Industry Certifications", value: 6, suffix: "+", icon: <FiShield /> },
    { label: "Core Technologies", value: 12, suffix: "+", icon: <FiCode /> },
  ];

  const timeline = [
    {
      year: "2025",
      role: "MERN Stack Developer",
      company: "Banana Soft Infotech",
      description: "Engineered scalable React components, integrated live database APIs with debounced searching, and drastically reduced load times using lazy loading and code splitting."
    },
    {
      year: "Present",
      role: "B.Tech Computer Science & Engineering",
      company: "Asha M. Tarsadia Institute",
      description: "Maintaining an 8.0 CGPA while mastering core principles of secure application development and scalable backend architectures."
    },
    {
      year: "2024 - Present",
      role: "Professional Certifications",
      company: "IBM, Cisco, Google & Deloitte",
      description: "Completed 6+ industry credentials focusing on cybersecurity fundamentals, endpoint security, and AI prompt design."
    }
  ];

  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden" ref={ref}>
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20"
        >
          {/* Left Column: Story & Goals */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <motion.div variants={itemVariants} className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-accent" />
              <h2 className="text-accent font-semibold tracking-wider uppercase text-sm">About Me</h2>
            </motion.div>
            
            <motion.h3 variants={itemVariants} className="heading-lg mb-8">
              Engineering logic, <br />
              <span className="text-textSecondary">designing experiences.</span>
            </motion.h3>
            
            <motion.div variants={itemVariants} className="space-y-6 text-textSecondary text-lg leading-relaxed">
              <p>
                I am a B.Tech Computer Science and Engineering student with a deep-rooted passion for the MERN stack and cybersecurity. I thrive in the space where robust backend architecture meets intuitive, highly optimized frontend design.
              </p>
              <p>
                Whether I'm building AI-powered hyper-local marketplaces, securing RESTful endpoints, or reducing front-end perceived load times, my goal is always to write clean, accessible, production-ready code. 
              </p>
              <p>
                Beyond the terminal, my experience as a stage actor provides a unique edge: it helps me deeply empathize with end-users, ensuring that the digital platforms I build are not just functional, but genuinely engaging.
              </p>
            </motion.div>

            {/* Stats Grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 mt-12">
              {stats.map((stat, index) => (
                <div key={index} className="glass-panel p-6 flex flex-col gap-2">
                  <div className="text-accent mb-2">{stat.icon}</div>
                  <div className="text-3xl font-bold text-white">
                    <AnimatedCounter from={0} to={stat.value} duration={2.5} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-textSecondary font-medium">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Timeline */}
          <div className="lg:col-span-7 lg:pl-10 relative">
            <motion.div variants={itemVariants} className="mb-10">
              <h4 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                <FiAward className="text-accent" /> Career Journey
              </h4>
              <p className="text-textSecondary">My academic and professional timeline.</p>
            </motion.div>

            <div className="relative border-l border-surfaceBorder pl-8 ml-4 space-y-12">
              {timeline.map((item, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  className="relative group"
                >
                  {/* Timeline Dot */}
                  <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-background border-2 border-accent group-hover:bg-accent transition-colors duration-300 shadow-soft-glow" />
                  
                  <div className="interactive-card p-6 md:p-8">
                    <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-bold rounded-full mb-4">
                      {item.year}
                    </span>
                    <h5 className="text-xl font-bold text-white mb-1">{item.role}</h5>
                    <h6 className="text-sm font-medium text-textSecondary mb-4">{item.company}</h6>
                    <p className="text-textSecondary leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default About;