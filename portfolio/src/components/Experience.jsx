import React, { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { FiBriefcase, FiCalendar, FiMapPin, FiCode } from 'react-icons/fi';

// Experience Data (Could also be moved to src/data/experience.js)
const experiences = [
  {
    id: 1,
    role: "MERN Stack Developer",
    company: "Banana Soft Infotech",
    duration: "07/2025 - 12/2025",
    location: "Surat, Gujarat",
    icon: <FiBriefcase />,
    description: [
      "Developed MovieFlix with 20+ reusable React components and reduced load time through lazy loading and code splitting.",
      "Integrated a live movie database API and implemented debounced client-side search with efficient querying to minimize API calls.",
      "Collaborated with backend engineers to design secure RESTful endpoints, authentication flows and robust error handling."
    ]
  },
  {
    id: 2,
    role: "Full-Stack Developer",
    company: "Independent Projects",
    duration: "2024 - Present",
    location: "Remote",
    icon: <FiCode />,
    description: [
      "Architected LocalConnect AI, a full-stack MERN marketplace with JWT authentication and role-based access control.",
      "Built an ASP.NET Core MVC Student Attendance System utilizing SQLite and Bootstrap 5.",
      "Developed a responsive salon platform with server-side booking validation using PHP and MySQL."
    ]
  }
];

const ExperienceCard = ({ experience, index }) => {
  const cardRef = useRef(null);
  const inView = useInView(cardRef, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;

  return (
    <div ref={cardRef} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group w-full mb-12">
      
      {/* Timeline Dot (Center on Desktop, Left on Mobile) */}
      <div className="absolute left-[28px] md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-surface border-4 border-background flex items-center justify-center z-20 shadow-[0_0_15px_rgba(59,130,246,0.3)] group-hover:border-accent group-hover:scale-110 transition-all duration-300">
        <div className="text-accent group-hover:text-white transition-colors duration-300">
          {experience.icon}
        </div>
      </div>

      {/* Empty space for alternating layout on desktop */}
      <div className="hidden md:block w-5/12" />

      {/* Content Card */}
      <motion.div 
        initial={{ opacity: 0, x: isEven ? 50 : -50, y: 20 }}
        animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: isEven ? 50 : -50, y: 20 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 20 }}
        className="w-[calc(100%-5rem)] md:w-5/12 ml-auto md:ml-0"
      >
        <div className="interactive-card p-6 md:p-8 relative overflow-hidden">
          {/* Subtle background glow on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10">
            <h4 className="text-xl md:text-2xl font-bold text-white mb-1 group-hover:text-accent transition-colors">
              {experience.role}
            </h4>
            <h5 className="text-lg font-medium text-textSecondary mb-4">
              {experience.company}
            </h5>
            
            <div className="flex flex-wrap gap-4 mb-6 text-sm font-medium text-textSecondary border-b border-surfaceBorder pb-4">
              <span className="flex items-center gap-1.5">
                <FiCalendar className="text-accent" /> {experience.duration}
              </span>
              <span className="flex items-center gap-1.5">
                <FiMapPin className="text-accent" /> {experience.location}
              </span>
            </div>

            <ul className="space-y-3">
              {experience.description.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm md:text-base text-textSecondary leading-relaxed">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent/50 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Experience = () => {
  const lineRef = useRef(null);
  const lineInView = useInView(lineRef, { once: true, margin: "0px" });
  const controls = useAnimation();

  useEffect(() => {
    if (lineInView) controls.start('visible');
  }, [lineInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <section id="experience" className="relative py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mb-20 text-center md:text-left"
        >
          <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
            <div className="h-[1px] w-8 bg-accent" />
            <h2 className="text-accent font-semibold tracking-wider uppercase text-sm">Experience</h2>
            <div className="h-[1px] w-8 bg-accent md:hidden" />
          </div>
          <h3 className="heading-lg">
            Professional <span className="text-textSecondary">Journey</span>
          </h3>
        </motion.div>

        {/* Timeline Container */}
        <div ref={lineRef} className="relative">
          {/* Animated Vertical Line */}
          <div className="absolute left-[46px] md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-surfaceBorder">
            <motion.div
              initial={{ height: "0%" }}
              animate={lineInView ? { height: "100%" } : { height: "0%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="w-full bg-purple-gradient shadow-[0_0_10px_rgba(139,92,246,0.5)]"
            />
          </div>

          {/* Timeline Events */}
          <div className="relative z-10 pt-8 pb-8">
            {experiences.map((experience, index) => (
              <ExperienceCard key={experience.id} experience={experience} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;