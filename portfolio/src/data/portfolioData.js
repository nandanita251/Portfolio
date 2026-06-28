import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

export const personalInfo = {
  name: "Nandanita Upadhyay",
  role: "Software Engineer",
  tagline: "Engineering secure, scalable, and intuitive digital experiences.",
  bio: "I am a B.Tech Computer Science and Engineering student with a deep-rooted passion for the MERN stack and cybersecurity. I thrive in the space where robust backend architecture meets intuitive, highly optimized frontend design.",
  email: "nandanita25@gmail.com",
  phone: "9824962501",
  location: "Surat, Gujarat",
  resumeUrl: "/resume.pdf", 
};

export const socialLinks = [
  {
    id: 1,
    name: "GitHub",
    icon: FiGithub,
    url: "https://github.com/nandanita251",
  },
  {
    id: 2,
    name: "LinkedIn",
    icon: FiLinkedin,
    url: "https://linkedin.com/in/nandanita-upadhyay-216ba6301",
  },
  {
    id: 3,
    name: "Email",
    icon: FiMail,
    url: "mailto:nandanita25@gmail.com",
  }
];

export const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];