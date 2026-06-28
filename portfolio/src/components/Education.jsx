import React, { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { FiBookOpen, FiAward, FiCalendar, FiCheckCircle } from 'react-icons/fi';

const educationData = [
  {
    id: 1,
    degree: "B.Tech Computer Science and Engineering",
    institution: "Asha M. Tarsadia Institute of Computer Science and Technology",
    duration: "Present",
    grade: "CGPA: 8.00/10 (upto 5th Sem)",
    status: "Ongoing",
    coursework: [
      "Full-Stack Web Development",
      "Cybersecurity Fundamentals",
      "Database Management Systems",
      "Compiler Design & Automata",
      "Data Structures & Algorithms"
    ]
  },
  {
    id: 2,
    degree: "Higher Secondary Certificate (HSC)",
    institution: "Shree Vasishtha Vidyalaya",
    duration: "Completed",
    grade: "Percentage: 69%",
    status: "Completed",
    coursework: [
      "Physics",
      "Chemistry",
      "Mathematics",
      "Computer Science"
    ]
  }
];

const Education = () => {
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
      transition: { staggerChildren: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <section id="education" className="relative py-24 overflow-hidden" ref={ref}>
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-purple-600/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center justify-center gap-4 mb-4">
            <div className="h-[1px] w-8 bg-accent" />
            <h2 className="text-accent font-semibold tracking-wider uppercase text-sm">Academic Background</h2>
            <div className="h-[1px] w-8 bg-accent" />
          </div>
          <h3 className="heading-lg">
            Education & <span className="text-textSecondary">Qualifications</span>
          </h3>
        </motion.div>

        {/* Education Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {educationData.map((edu) => (
            <motion.div 
              key={edu.id}
              variants={cardVariants}
              className="interactive-card p-8 flex flex-col h-full relative overflow-hidden group"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-purple-gradient opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent text-2xl group-hover:scale-110 group-hover:bg-accent/10 transition-all duration-500 shadow-soft-glow">
                  <FiBookOpen />
                </div>
                <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-textSecondary flex items-center gap-1.5">
                  <FiCalendar className="text-accent" /> {edu.duration}
                </span>
              </div>

              <h4 className="text-2xl font-bold text-white mb-2 group-hover:text-accent transition-colors duration-300">
                {edu.degree}
              </h4>
              <h5 className="text-lg font-medium text-textSecondary mb-6">
                {edu.institution}
              </h5>

              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-lg text-accent font-semibold text-sm w-fit mb-8">
                <FiAward size={16} />
                {edu.grade}
              </div>

              <div className="mt-auto">
                <h6 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Relevant Coursework</h6>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {edu.coursework.map((course, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-textSecondary group/item">
                      <FiCheckCircle className="text-accent/50 mt-0.5 group-hover/item:text-accent transition-colors" />
                      <span className="group-hover/item:text-white transition-colors">{course}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Education;