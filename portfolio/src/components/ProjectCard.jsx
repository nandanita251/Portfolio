import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiStar } from 'react-icons/fi';

const ProjectCard = ({ project }) => {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`interactive-card group flex flex-col overflow-hidden ${
        project.featured ? 'md:col-span-2 md:flex-row' : ''
      }`}
    >
      {/* Image Section */}
      <div className={`relative overflow-hidden ${project.featured ? 'md:w-1/2' : 'w-full h-48 md:h-56'}`}>
        <div className="absolute inset-0 bg-accent/20 mix-blend-overlay group-hover:bg-transparent transition-colors duration-500 z-10" />
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
        />
        {project.featured && (
          <div className="absolute top-4 left-4 z-20 glass-panel px-3 py-1 flex items-center gap-1.5 rounded-full border-accent/30 bg-background/50 backdrop-blur-md">
            <FiStar className="text-accent fill-accent" size={14} />
            <span className="text-xs font-semibold text-white tracking-wide uppercase">Featured</span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className={`p-6 md:p-8 flex flex-col flex-grow ${project.featured ? 'md:w-1/2 justify-center' : ''}`}>
        <h4 className="text-2xl font-bold text-white mb-3 group-hover:text-accent transition-colors duration-300">
          {project.title}
        </h4>
        
        <p className="text-textSecondary text-sm md:text-base leading-relaxed mb-6 flex-grow">
          {project.description}
        </p>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.techStack.map((tech, index) => (
            <span 
              key={index}
              className="px-3 py-1 text-xs font-medium text-textPrimary bg-white/5 border border-white/10 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 mt-auto pt-4 border-t border-surfaceBorder">
          {project.github && (
            <a 
              href={project.github} 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-textSecondary hover:text-white transition-colors"
            >
              <FiGithub size={18} /> Code
            </a>
          )}
          {project.live && (
            <a 
              href={project.live} 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-accent hover:text-purple-400 transition-colors ml-auto"
            >
              Live Demo <FiExternalLink size={18} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;