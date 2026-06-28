import React from 'react';
import { FiMonitor, FiServer, FiDatabase, FiTool } from 'react-icons/fi';

export const skillCategories = [
  {
    title: "Frontend Development",
    icon: <FiMonitor />,
    skills: [
      { name: "React.js", level: 90 },
      { name: "Redux", level: 80 },
      { name: "JavaScript", level: 85 },
      { name: "HTML / CSS", level: 95 }
    ]
  },
  {
    title: "Backend Development",
    icon: <FiServer />,
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 85 },
      { name: "Python", level: 70 },
      { name: "ASP.NET Core MVC", level: 65 },
      { name: "PHP", level: 60 }
    ]
  },
  {
    title: "Database",
    icon: <FiDatabase />,
    skills: [
      { name: "MongoDB (Atlas)", level: 90 },
      { name: "MySQL", level: 80 },
      { name: "SQLite", level: 75 }
    ]
  },
  {
    title: "Tools & Security",
    icon: <FiTool />,
    skills: [
      { name: "REST APIs & JWT", level: 90 },
      { name: "Cybersecurity Basics", level: 80 },
      { name: "GitHub", level: 85 },
      { name: "Postman", level: 85 }
    ]
  }
];