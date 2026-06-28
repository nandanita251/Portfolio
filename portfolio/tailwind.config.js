/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#050816', // Deep Space Primary
        accent: '#3B82F6',     // Core Accent
        accentHover: '#2563EB',
        surface: 'rgba(255, 255, 255, 0.02)',       // Ultra-subtle glass background
        surfaceBorder: 'rgba(255, 255, 255, 0.08)', // Linear-style subtle borders
        textPrimary: '#F8FAFC',
        textSecondary: '#94A3B8',
      },
      backgroundImage: {
        'purple-gradient': 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
        'glass-gradient': 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
        'glow-conic': 'conic-gradient(from 180deg at 50% 50%, rgba(59, 130, 246, 0.15) 0deg, rgba(139, 92, 246, 0.15) 180deg, transparent 360deg)',
      },
      boxShadow: {
        'soft-glow': '0 10px 40px -10px rgba(59,130,246,0.3)', // Vercel-style hover glow
        'glass': '0 4px 30px rgba(0, 0, 0, 0.3)',              // Apple-style drop shadow
        'inner-light': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.05)', 
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards', // Framer-style spring curve
        'pulse-glow': 'pulseGlow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        }
      }
    },
  },
  plugins: [],
}