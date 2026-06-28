import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { FiMail, FiMapPin, FiSend, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { sendEmail } from '../services/email';
import { socialLinks } from '../data/portfolioData';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // 'idle', 'submitting', 'success', 'error'
  const [errors, setErrors] = useState({});

  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [controls, inView]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus('submitting');
    try {
      await sendEmail(formData);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden" ref={ref}>
      {/* Background Decor */}
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20"
        >
          {/* Left Column: Info */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <motion.div variants={itemVariants} className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-accent" />
              <h2 className="text-accent font-semibold tracking-wider uppercase text-sm">Get In Touch</h2>
            </motion.div>
            
            <motion.h3 variants={itemVariants} className="heading-lg mb-6">
              Let's build something <span className="text-textSecondary">together.</span>
            </motion.h3>
            
            <motion.p variants={itemVariants} className="text-textSecondary text-lg leading-relaxed mb-10">
              Whether you have a question, a project idea, or just want to say hi, I'll try my best to get back to you!
            </motion.p>

            <motion.div variants={itemVariants} className="space-y-6 mb-10">
              <a href="mailto:nandanita25@gmail.com" className="flex items-center gap-4 group w-fit">
                <div className="w-12 h-12 rounded-xl glass-panel flex items-center justify-center text-accent group-hover:bg-accent/10 transition-colors shadow-soft-glow">
                  <FiMail size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-textSecondary uppercase tracking-wider mb-1">Email</h4>
                  <p className="text-white group-hover:text-accent transition-colors font-medium">nandanita25@gmail.com</p>
                </div>
              </a>
              
              <div className="flex items-center gap-4 w-fit">
                <div className="w-12 h-12 rounded-xl glass-panel flex items-center justify-center text-accent shadow-soft-glow">
                  <FiMapPin size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-textSecondary uppercase tracking-wider mb-1">Location</h4>
                  <p className="text-white font-medium">Surat, Gujarat</p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a 
                    key={social.id} 
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-textSecondary hover:text-white hover:border-accent/50 hover:-translate-y-1 transition-all duration-300"
                    aria-label={social.name}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </motion.div>
          </div>

          {/* Right Column: Form */}
          <motion.div variants={itemVariants} className="lg:col-span-7 relative">
            <div className="glass-panel p-8 md:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-gradient opacity-10 rounded-full blur-3xl pointer-events-none" />
              
              <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Input - Floating Label */}
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder=" "
                      className={`peer w-full bg-surface/50 border ${errors.name ? 'border-red-500' : 'border-surfaceBorder'} rounded-xl px-4 pt-6 pb-2 text-white focus:outline-none focus:border-accent/50 focus:bg-white/5 transition-all shadow-inner-light`}
                    />
                    <label 
                      htmlFor="name" 
                      className="absolute text-sm text-textSecondary duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-accent pointer-events-none"
                    >
                      Your Name
                    </label>
                    {errors.name && <span className="absolute -bottom-5 left-2 text-xs text-red-500">{errors.name}</span>}
                  </div>

                  {/* Email Input - Floating Label */}
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder=" "
                      className={`peer w-full bg-surface/50 border ${errors.email ? 'border-red-500' : 'border-surfaceBorder'} rounded-xl px-4 pt-6 pb-2 text-white focus:outline-none focus:border-accent/50 focus:bg-white/5 transition-all shadow-inner-light`}
                    />
                    <label 
                      htmlFor="email" 
                      className="absolute text-sm text-textSecondary duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-accent pointer-events-none"
                    >
                      Email Address
                    </label>
                    {errors.email && <span className="absolute -bottom-5 left-2 text-xs text-red-500">{errors.email}</span>}
                  </div>
                </div>

                {/* Message Input - Floating Label */}
                <div className="relative mt-2">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    placeholder=" "
                    className={`peer w-full bg-surface/50 border ${errors.message ? 'border-red-500' : 'border-surfaceBorder'} rounded-xl px-4 pt-6 pb-2 text-white focus:outline-none focus:border-accent/50 focus:bg-white/5 transition-all shadow-inner-light resize-none`}
                  />
                  <label 
                    htmlFor="message" 
                    className="absolute text-sm text-textSecondary duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-accent pointer-events-none"
                  >
                    Your Message
                  </label>
                  {errors.message && <span className="absolute -bottom-5 left-2 text-xs text-red-500">{errors.message}</span>}
                </div>

                <button 
                  type="submit" 
                  disabled={status === 'submitting'}
                  className="btn-primary mt-4 w-full md:w-auto md:self-end flex items-center justify-center gap-2 min-w-[160px] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Send Message <FiSend className="ml-1" />
                    </>
                  )}
                </button>

                {/* Status Messages */}
                {status === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-background/80 backdrop-blur-md rounded-2xl"
                  >
                    <FiCheckCircle className="text-green-400 text-5xl mb-4" />
                    <h4 className="text-xl font-bold text-white mb-2">Message Sent!</h4>
                    <p className="text-textSecondary">I will get back to you shortly.</p>
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-background/80 backdrop-blur-md rounded-2xl"
                  >
                    <FiAlertCircle className="text-red-400 text-5xl mb-4" />
                    <h4 className="text-xl font-bold text-white mb-2">Oops!</h4>
                    <p className="text-textSecondary">Something went wrong. Please try again later.</p>
                  </motion.div>
                )}

              </form>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;