import React from 'react';
import { FiBriefcase, FiCode } from 'react-icons/fi';

export const experiences = [
  {
    id: 1,
    role: "MERN Stack Developer",
    company: "Banana Soft Infotech",
    duration: "07/2025 - 12/2025",
    location: "Surat, Gujarat",
    icon: <FiBriefcase />,
    description: [
      "Developed MovieFlix with 20+ reusable React components and reduced load time through lazy loading and code splitting.",
      "Integrated a live movie database API and implemented debounced client-side search with efficient querying to minimize API calls.",
      "Collaborated with backend engineers to design secure RESTful endpoints, authentication flows and robust error handling."
    ]
  },
  {
    id: 2,
    role: "Full-Stack Developer",
    company: "Independent Projects",
    duration: "2024 - Present",
    location: "Remote",
    icon: <FiCode />,
    description: [
      "Architected LocalConnect AI, a full-stack MERN marketplace with JWT authentication and role-based access control.",
      "Built an ASP.NET Core MVC Student Attendance System utilizing SQLite and Bootstrap 5.",
      "Developed a responsive salon platform with server-side booking validation using PHP and MySQL."
    ]
  }
];