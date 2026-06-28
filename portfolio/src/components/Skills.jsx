import React, { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { FiMonitor, FiServer, FiDatabase, FiTool } from 'react-icons/fi';

const skillCategories = [
  {
    title: "Frontend Development",
    icon: <FiMonitor />,
    skills: [
      { name: "React.js", level: 90 },
      { name: "Redux", level: 80 },
      { name: "JavaScript", level: 85 },
      { name: "HTML / CSS", level: 95 },
      { name: "UI / UX Design", level: 75 }
    ]
  },
  {
    title: "Backend Development",
    icon: <FiServer />,
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 85 },
      { name: "Python", level: 70 },
      { name: "PHP", level: 65 },
      { name: "ASP.NET Core MVC", level: 60 }
    ]
  },
  {
    title: "Database",
    icon: <FiDatabase />,
    skills: [
      { name: "MongoDB (Atlas)", level: 90 },
      { name: "MySQL", level: 80 },
      { name: "SQLite", level: 75 }
    ]
  },
  {
    title: "Tools & Architecture",
    icon: <FiTool />,
    skills: [
      { name: "REST APIs & JWT", level: 90 },
      { name: "Cybersecurity / Endpoint", level: 75 },
      { name: "GitHub", level: 85 },
      { name: "Postman", level: 85 },
      { name: "Prompt Design (Vertex AI)", level: 65 }
    ]
  }
];

const SkillBar = ({ name, level }) => {
  const barRef = useRef(null);
  const inView = useInView(barRef, { once: true, margin: "-50px" });

  return (
    <div className="mb-4" ref={barRef}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-textPrimary">{name}</span>
        <span className="text-xs text-textSecondary">{level}%</span>
      </div>
      <div className="h-2 w-full bg-background rounded-full overflow-hidden border border-surfaceBorder">
        <motion.div
          className="h-full bg-purple-gradient relative"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          {/* Animated Glow on the leading edge of the progress bar */}
          <div className="absolute top-0 right-0 bottom-0 w-4 bg-white/30 blur-[2px]" />
        </motion.div>
      </div>
    </div>
  );
};

const Skills = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <section id="skills" className="relative py-24 overflow-hidden" ref={ref}>
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center justify-center gap-4 mb-4">
            <div className="h-[1px] w-8 bg-accent" />
            <h2 className="text-accent font-semibold tracking-wider uppercase text-sm">Technical Arsenal</h2>
            <div className="h-[1px] w-8 bg-accent" />
          </div>
          <h3 className="heading-lg">
            Skills & <span className="text-textSecondary">Technologies</span>
          </h3>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {skillCategories.map((category, index) => (
            <motion.div 
              key={index}
              variants={cardVariants}
              className="interactive-card p-6 md:p-8 flex flex-col h-full group"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-500 shadow-soft-glow">
                {category.icon}
              </div>
              
              <h4 className="text-xl font-bold text-white mb-6 border-b border-surfaceBorder pb-4">
                {category.title}
              </h4>
              
              <div className="flex-grow space-y-2">
                {category.skills.map((skill, idx) => (
                  <SkillBar key={idx} name={skill.name} level={skill.level} />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;