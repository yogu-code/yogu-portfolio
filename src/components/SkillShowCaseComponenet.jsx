"use client";
import React, { useState } from "react";
import { Code, Database, Palette, Globe, Smartphone, Zap } from "lucide-react";
import { motion, useInView } from "framer-motion";

const skills = [
  {
    id: "Next.js",
    name: "Next.js",
    icon: Code,
    level: 88,
    description:
      "Experienced in building fast, scalable React applications using server-side rendering and modern React features.",
    color: "from-blue-600/90 to-blue-700/90 dark:from-blue-400/90 dark:to-blue-500/90",
  },
  {
    id: "Tailwind CSS",
    name: "Tailwind CSS",
    icon: Palette,
    level: 78,
    description:
      "Skilled in building responsive, utility-first user interfaces quickly with Tailwind CSS.",
    color: "from-cyan-600/90 to-teal-600/90 dark:from-cyan-400/90 dark:to-teal-400/90",
  },
  {
    id: "JavaScript",
    name: "JavaScript",
    icon: Code,
    level: 73,
    description:
      "Good command of core JavaScript concepts and practical experience writing clean, efficient code.",
    color: "from-yellow-600/90 to-orange-600/90 dark:from-yellow-400/90 dark:to-orange-400/90",
  },
  {
    id: "Node.js",
    name: "Node.js",
    icon: Zap,
    level: 68,
    description:
      "Experienced in building RESTful APIs, microservices, and server-side applications.",
    color: "from-green-600/90 to-emerald-600/90 dark:from-green-400/90 dark:to-emerald-400/90",
  },
  {
    id: "MongoDB",
    name: "MongoDB",
    icon: Database,
    level: 73,
    description:
      "Proficient in performing CRUD operations using MongoDB's query language to efficiently retrieve and manipulate data.",
    color: "from-green-700/90 to-green-800/90 dark:from-green-500/90 dark:to-green-600/90",
  },
  {
    id: "Socket.IO",
    name: "Socket.IO",
    icon: Globe,
    level: 55,
    description:
      "Skilled in real-time communication and building interactive apps with WebSocket-based event-driven architecture.",
    color: "from-purple-600/90 to-violet-600/90 dark:from-purple-400/90 dark:to-violet-400/90",
  },
  {
    id: "Express.js",
    name: "Express.js",
    icon: Globe,
    level: 63,
    description:
      "Experienced in building robust backend APIs and middleware with Express.js to support scalable web applications.",
    color: "from-slate-600/90 to-slate-700/90 dark:from-slate-500/90 dark:to-slate-600/90",
  },
];

const SkillCard = ({ skill, isSelected, onClick, index }) => {
  const IconComponent = skill.icon;
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.25, 0, 1],
      }}
      whileHover={{ 
        scale: 1.02, 
        y: -5,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`group relative w-full overflow-hidden rounded-2xl bg-gray-100/60 dark:bg-slate-800/60 backdrop-blur-sm border border-gray-300/50 dark:border-slate-700/50 p-4 sm:p-6 cursor-pointer transition-all duration-300 hover:bg-gray-200/80 dark:hover:bg-slate-800/80 hover:border-gray-400/60 dark:hover:border-slate-600/60 hover:shadow-lg hover:shadow-gray-500/20 dark:hover:shadow-slate-900/20 ${
        isSelected ? 'ring-2 ring-blue-400/50 bg-gray-200/80 dark:bg-slate-800/80 border-gray-400/60 dark:border-slate-600/60' : ''
      }`}
    >
      {/* Background gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-10 dark:opacity-5 group-hover:opacity-20 dark:group-hover:opacity-10 transition-opacity duration-300`} />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <motion.div 
              className={`p-2.5 rounded-xl bg-gradient-to-br ${skill.color} shadow-lg`}
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <IconComponent className="w-5 h-5 text-gray-900 dark:text-white" />
            </motion.div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-slate-100 group-hover:text-gray-800 dark:group-hover:text-white transition-colors">
              {skill.name}
            </h3>
          </div>
          {/* Show percentage only on mobile */}
          <motion.div 
            className="lg:hidden text-xs sm:text-sm font-medium text-gray-600 dark:text-slate-400 bg-gray-200/50 dark:bg-slate-700/50 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            {skill.level}%
          </motion.div>
        </div>
        
        <p className="text-gray-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed line-clamp-3 group-hover:text-gray-700 dark:group-hover:text-slate-300 transition-colors">
          {skill.description}
        </p>
        
        {/* Progress bar - Show only on mobile */}
        <div className="lg:hidden mt-3 sm:mt-4 w-full bg-gray-300/50 dark:bg-slate-700/50 rounded-full h-1 sm:h-1.5 overflow-hidden">
          <motion.div 
            className={`h-full bg-gradient-to-r ${skill.color}`} 
            initial={{ width: "0%" }}
            animate={isInView ? { width: `${skill.level}%` } : { width: "0%" }}
            transition={{
              duration: 1.2,
              delay: index * 0.1 + 0.3,
              ease: "easeOut"
            }}
          />
        </div>
      </div>
      
      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-100/10 dark:via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
    </motion.div>
  );
};

const SkillMeter = ({ level, skillName }) => {
  const circumference = 2 * Math.PI * 90;
  const strokeDashoffset = circumference - (level / 100) * circumference;
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div 
      ref={ref}
      className="relative flex flex-col items-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Circular Progress */}
      <div className="relative w-48 h-48 sm:w-56 sm:h-56">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="rgb(209 213 219)"
            strokeWidth="8"
            className="opacity-30 dark:opacity-50"
          />
          {/* Progress circle */}
          <motion.circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: level > 0 ? strokeDashoffset : circumference }}
            transition={{
              duration: 1.5,
              delay: 0.5,
              ease: "easeOut"
            }}
          />
          {/* Gradient definition */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="50%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div 
            className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-1"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.6, 
              delay: 1.2,
              type: "spring",
              stiffness: 200
            }}
            key={level}
          >
            {level}%
          </motion.div>
          {skillName && (
            <motion.div 
              className="text-gray-600 dark:text-slate-300 text-sm sm:text-lg font-medium text-center px-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.4 }}
              key={skillName}
            >
              {skillName}
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Proficiency level indicator */}
      {level > 0 && (
        <motion.div 
          className="mt-4 sm:mt-6 flex items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.6 }}
        >
          <span className="text-gray-600 dark:text-slate-300 text-sm sm:text-lg font-medium bg-gray-100/50 dark:bg-slate-800/50 px-3 py-1 sm:px-4 sm:py-2 rounded-full border border-gray-300/50 dark:border-slate-700/50">
            {level >= 80 ? 'Expert' : level >= 60 ? 'Advanced' : level >= 40 ? 'Intermediate' : 'Beginner'}
          </span>
        </motion.div>
      )}
    </motion.div>
  );
};

export const SkillShowcase = () => {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const headerRef = React.useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  const handleCardClick = (skillId) => {
    setSelectedSkill(selectedSkill === skillId ? null : skillId);
  };

  const currentSkill = selectedSkill
    ? skills.find((s) => s.id === selectedSkill)
    : null;

  return (
    <div className="min-h-screen px-4 py-16 sm:py-20">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          ref={headerRef}
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            className="inline-flex items-center space-x-2 bg-gray-100/60 dark:bg-slate-800/60 backdrop-blur-sm border border-gray-300/50 dark:border-slate-700/50 rounded-full px-4 py-2 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isHeaderInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div 
              className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-gray-700 dark:text-slate-300 text-sm sm:text-base font-medium">Available for opportunities</span>
          </motion.div>
          
          <motion.h1 
            className="text-3xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Technical
            <motion.span 
              className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 dark:from-blue-400 dark:via-purple-400 dark:to-cyan-400"
              initial={{ opacity: 0, x: -20 }}
              animate={isHeaderInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Expertise
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="text-gray-600 dark:text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Explore my technical skills and proficiency levels. Tap on any technology card to see detailed expertise metrics and real-time visualizations.
          </motion.p>
        </motion.div>

        {/* Mobile Layout */}
        <div className="lg:hidden">
          {/* Mobile Skills Header */}
          <motion.div 
            className="flex items-center justify-between mb-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-1 h-6 bg-gradient-to-b from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 rounded-full" />
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                Technologies & Tools
              </h2>
            </div>
            <div className="text-gray-600 dark:text-slate-400 text-xs sm:text-sm bg-gray-100/50 dark:bg-slate-800/50 px-2.5 py-1 rounded-full border border-gray-300/50 dark:border-slate-700/50">
              {skills.length} Skills
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skills.map((skill, index) => (
              <SkillCard
                key={skill.id}
                skill={skill}
                index={index}
                isSelected={selectedSkill === skill.id}
                onClick={() => handleCardClick(skill.id)}
              />
            ))}
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-5 gap-12 items-start">
          {/* Skill Meter - Left Side (2 columns) */}
          <div className="lg:col-span-2 flex flex-col items-center lg:sticky lg:top-8">
            <motion.div 
              className="w-full bg-gray-100/40 dark:bg-slate-800/40 backdrop-blur-sm border border-gray-300/50 dark:border-slate-700/50 rounded-3xl p-8 mb-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div 
                className="flex items-center space-x-3 mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 rounded-full" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                  Proficiency Meter
                </h2>
              </motion.div>

              <SkillMeter
                level={currentSkill ? currentSkill.level : 0}
                skillName={currentSkill ? currentSkill.name : ""}
              />
            </motion.div>

            {!currentSkill && (
              <motion.div 
                className="w-full bg-gray-100/30 dark:bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-gray-300/30 dark:border-slate-700/30 p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="text-center">
                  <motion.div 
                    className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 dark:from-blue-400/20 dark:to-purple-400/20 rounded-xl flex items-center justify-center mx-auto mb-3"
                    whileHover={{ rotate: 180, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Code className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </motion.div>
                  <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed">
                    Select any technology card to view detailed proficiency metrics and expertise analysis
                  </p>
                </div>
              </motion.div>
            )}
          </div>

          {/* Skills Cards Grid - Right Side (3 columns) */}
          <div className="lg:col-span-3 space-y-8">
            <motion.div 
              className="flex items-center justify-between"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-1 h-8 bg-gradient-to-b from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 rounded-full" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                  Technologies & Tools
                </h2>
              </div>
              <motion.div 
                className="text-gray-600 dark:text-slate-400 text-sm bg-gray-100/50 dark:bg-slate-800/50 px-3 py-1.5 rounded-full border border-gray-300/50 dark:border-slate-700/50"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                {skills.length} Skills
              </motion.div>
            </motion.div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <SkillCard
                  key={skill.id}
                  skill={skill}
                  index={index}
                  isSelected={selectedSkill === skill.id}
                  onClick={() => handleCardClick(skill.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};