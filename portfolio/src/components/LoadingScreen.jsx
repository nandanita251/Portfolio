import { motion } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-background"
    >
      <div className="relative w-24 h-24 flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border-t-2 border-accent border-r-2 border-r-transparent"
        />
        <motion.span 
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="text-2xl font-bold text-white tracking-tighter"
        >
          N<span className="text-accent">.</span>
        </motion.span>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;