import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { FiGithub, FiStar, FiGitBranch, FiClock, FiCode, FiExternalLink } from 'react-icons/fi';
import { fetchRepositories } from '../services/github';

const GitHub = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [controls, inView]);

  useEffect(() => {
    const getRepos = async () => {
      try {
        setLoading(true);
        const data = await fetchRepositories(6);
        setRepos(data);
        setError(null);
      } catch (err) {
        setError('Failed to load repositories. Please check back later.');
      } finally {
        setLoading(false);
      }
    };

    getRepos();
  }, []);

  // Utility to format ISO date to readable string
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

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
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <section id="github" className="relative py-24 overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16"
        >
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-[1px] w-8 bg-accent" />
              <h2 className="text-accent font-semibold tracking-wider uppercase text-sm">Open Source</h2>
            </div>
            <h3 className="heading-lg">
              Latest <span className="text-textSecondary">Commits</span>
            </h3>
          </div>
          
          <a 
            href="https://github.com/nandanita251" 
            target="_blank" 
            rel="noreferrer"
            className="btn-secondary group flex items-center gap-2"
          >
            <FiGithub className="group-hover:text-accent transition-colors" /> 
            View Full Profile
          </a>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((skeleton) => (
              <div key={skeleton} className="glass-panel p-6 h-48 animate-pulse flex flex-col justify-between">
                <div>
                  <div className="w-1/2 h-6 bg-white/10 rounded mb-4" />
                  <div className="w-full h-4 bg-white/5 rounded mb-2" />
                  <div className="w-3/4 h-4 bg-white/5 rounded" />
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-4 bg-white/10 rounded" />
                  <div className="w-12 h-4 bg-white/10 rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="glass-panel p-8 text-center text-textSecondary border-red-500/30">
            <p>{error}</p>
          </div>
        )}

        {/* Repositories Grid */}
        {!loading && !error && (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {repos.map((repo) => (
              <motion.a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                variants={cardVariants}
                className="interactive-card p-6 flex flex-col h-full group"
              >
                <div className="flex justify-between items-start mb-4">
                  <FiGithub className="text-3xl text-accent group-hover:-rotate-12 transition-transform duration-300" />
                  <FiExternalLink className="text-textSecondary group-hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0" />
                </div>
                
                <h4 className="text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors">
                  {repo.name}
                </h4>
                
                <p className="text-sm text-textSecondary mb-6 flex-grow line-clamp-3">
                  {repo.description || "No description provided for this repository."}
                </p>
                
                <div className="flex items-center justify-between text-xs font-medium text-textSecondary pt-4 border-t border-surfaceBorder">
                  <div className="flex items-center gap-4">
                    {repo.language && (
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-accent" />
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1 hover:text-white transition-colors">
                      <FiStar /> {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1 hover:text-white transition-colors">
                      <FiGitBranch /> {repo.forks_count}
                    </span>
                  </div>
                  <span className="flex items-center gap-1">
                    <FiClock /> {formatDate(repo.updated_at)}
                  </span>
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default GitHub;