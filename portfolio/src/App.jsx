import { useState, useEffect, Suspense, lazy } from 'react';import { motion, AnimatePresence } from 'framer-motion';

// Eagerly loaded components (critical for initial paint)
import LoadingScreen from './components/LoadingScreen';
import ScrollProgress from './components/ScrollProgress';
import CursorGlow from './components/CursorGlow';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

// Lazy loaded components (Code Splitting for Performance)
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Experience = lazy(() => import('./components/Experience'));
const Education = lazy(() => import('./components/Education'));
const GitHub = lazy(() => import('./components/GitHub'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial data fetching/asset loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-textPrimary selection:bg-accent/30 selection:text-accent font-sans antialiased">
      
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loader" />}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Global UI Overlays */}
          <ScrollProgress />
          <div className="hidden lg:block">
            <CursorGlow />
          </div>
          <Navbar />

          {/* Main Content */}
          <main className="relative z-10 flex flex-col items-center w-full overflow-hidden">
            <Hero />
            
            {/* Suspense boundary for lazy loaded chunks */}
            <Suspense fallback={<div className="h-screen w-full flex items-center justify-center text-accent animate-pulse">Loading section...</div>}>
              <About />
              <Skills />
              <Projects />
              <Experience />
              <Education />
              <GitHub />
              <Contact />
            </Suspense>
          </main>

          <Suspense fallback={null}>
            <Footer />
          </Suspense>
        </motion.div>
      )}
    </div>
  );
};

export default App;