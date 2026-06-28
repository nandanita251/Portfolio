import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useInView, useAnimation } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { projects, filterCategories } from '../data/projects';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [controls, inView]);


const filteredProjects = useMemo(() => {
  return activeFilter === "All"
    ? projects
    : projects.filter(project => project.category === activeFilter);
}, [activeFilter]);

  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <section id="projects" className="relative py-24 md:py-32 overflow-hidden" ref={ref}>
      {/* Ambient Grid Background */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] mask-radial-faded pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16"
        >
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-[1px] w-8 bg-accent" />
              <h2 className="text-accent font-semibold tracking-wider uppercase text-sm">Portfolio</h2>
            </div>
            <h3 className="heading-lg">
              Featured <span className="text-textSecondary">Projects</span>
            </h3>
          </div>

          {/* Filtering System */}
          <div className="flex flex-wrap gap-2 glass-panel p-1.5 rounded-2xl w-fit">
            {filterCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 ${
                  activeFilter === category ? 'text-white' : 'text-textSecondary hover:text-white hover:bg-white/5'
                }`}
              >
                {activeFilter === category && (
                  <motion.div
                    layoutId="active-filter"
                    className="absolute inset-0 bg-white/10 rounded-xl border border-white/10 shadow-sm"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{category}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};

export default Projects;