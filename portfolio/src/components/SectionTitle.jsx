import React, { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

const SectionTitle = ({ title, subtitle, align = "left" }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, threshold: 0.5 });

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
      }}
      className={`mb-16 ${align === 'center' ? 'text-center' : 'text-left'}`}
    >
      <div className={`flex items-center gap-4 mb-4 ${align === 'center' ? 'justify-center' : ''}`}>
        <div className="h-[1px] w-8 bg-accent" />
        <h2 className="text-accent font-semibold tracking-wider uppercase text-sm">{subtitle}</h2>
        {align === 'center' && <div className="h-[1px] w-8 bg-accent" />}
      </div>
      <h3 className="heading-lg">
        {title.split(' ')[0]} <span className="text-textSecondary">{title.substring(title.indexOf(' ') + 1)}</span>
      </h3>
    </motion.div>
  );
};

export default SectionTitle;