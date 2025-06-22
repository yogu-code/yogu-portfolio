"use client";
import React from "react";
import { Github, ExternalLink, Calendar, Code } from "lucide-react";
import { motion } from "framer-motion";

const ProjectCard = ({
  image,
  title = "Project Title",
  description = "A brief description of what this project does and the technologies used to build it.",
  technologies = ["React", "JavaScript"],
  githubUrl,
  liveUrl,
  date = "2024",
  status = "Completed",
  index = 0,
}) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in progress":
        return "bg-yellow-100 text-yellow-800";
      case "planning":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Animation variants for the card
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1, // Stagger animation based on index
        ease: [0.25, 0.46, 0.45, 0.94], // Custom easing
      },
    },
  };

  // Hover animation variants
  const hoverVariants = {
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  // Image animation variants
  const imageVariants = {
    hidden: { scale: 1.1, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: index * 0.1 + 0.2,
        ease: "easeOut",
      },
    },
  };

  // Content animation variants
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1 + 0.3,
        ease: "easeOut",
      },
    },
  };

  // Button animation variants
  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        delay: index * 0.1 + 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden w-full cursor-pointer"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, amount: 0.1 }}
      custom={hoverVariants}
    >
      {/* Image Section */}
      <div className="relative w-full aspect-video bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden">
        {image ? (
          <motion.img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          />
        ) : (
          <motion.div
            className="flex items-center justify-center h-full"
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Code className="w-16 h-16 text-white/80" />
          </motion.div>
        )}

        {/* Status Badge */}
        <motion.div
          className="absolute top-3 right-3"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.4,
            delay: index * 0.1 + 0.4,
            type: "spring",
            stiffness: 200,
          }}
          viewport={{ once: true }}
        >
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
              status
            )}`}
          >
            {status}
          </span>
        </motion.div>
      </div>

      {/* Content Section */}
      <motion.div
        className="p-6"
        variants={contentVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Title and Date */}
        <div className="flex items-start justify-between mb-3">
          <motion.h3
            className="text-xl font-semibold text-gray-900 flex-1"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1 + 0.4,
            }}
            viewport={{ once: true }}
          >
            {title}
          </motion.h3>
          <motion.div
            className="flex items-center text-gray-500 text-sm ml-2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1 + 0.45,
            }}
            viewport={{ once: true }}
          >
            <Calendar className="w-4 h-4 mr-1" />
            {date}
          </motion.div>
        </div>

        {/* Description */}
        <motion.p
          className="text-gray-600 text-sm leading-relaxed mb-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: index * 0.1 + 0.5,
          }}
          viewport={{ once: true }}
        >
          {description}
        </motion.p>

        {/* Technologies */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: index * 0.1 + 0.55,
          }}
          viewport={{ once: true }}
        >
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, techIndex) => (
              <motion.span
                key={techIndex}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md font-medium"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1 + 0.6 + techIndex * 0.05,
                  type: "spring",
                  stiffness: 200,
                }}
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "#e5e7eb",
                }}
                viewport={{ once: true }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex gap-3"
          variants={buttonVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {githubUrl && githubUrl !== "none" && (
            <motion.a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Github className="w-4 h-4" />
              Code
            </motion.a>
          )}

          {liveUrl && liveUrl !== "none" && (
            <motion.a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <ExternalLink className="w-4 h-4" />
              Live Demo
            </motion.a>
          )}

          {(!githubUrl || githubUrl === "none") &&
            (!liveUrl || liveUrl === "none") && (
              <motion.div
                className="flex-1 flex items-center justify-center gap-2 bg-gray-400 text-white font-medium py-2 px-4 rounded-lg cursor-not-allowed"
                variants={buttonVariants}
              >
                <Code className="w-4 h-4" />
                Coming Soon
              </motion.div>
            )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// Example usage with project portfolio
const App = () => {
  const projects = [
    {
      title: "Portfolio Chatbot",
      description:
        "An AI-powered chatbot built with Python, Flask, Gemini API, and LangChain to enhance user interaction on my portfolio site. It can answer queries, read and extract insights from PDFs, and provide real-time, document-based responses for a more engaging user experience.",
      technologies: ["Python", "Flask", "Gemini API", "LangChain"],
      image: "/images/portfolio-chatbot.png",
      githubUrl: "https://github.com/yogu-code/personal-chat-bot",
      liveUrl: "https://portfolio-yogu.vercel.app",
      date: "2025",
      status: "Completed",
    },
    {
      title: "Chess Game Multiplayer",
      description:
        "A real-time chess game built with the MERN stack and Socket.IO, enabling smooth two-player gameplay with live move syncing, game state management, and a responsive UI.",
      technologies: [
        "MongoDB",
        "Express.js",
        "React.js",
        "Node.js",
        "Socket.IO",
      ],
      // No image provided - will show default gradient with code icon
      githubUrl: "none",
      liveUrl: "none",
      date: "2025",
      status: "In Progress",
    },
    {
      title: "Portfolio Website",
      description:
        "A React-based portfolio built with the MERN stack, focusing on frontend design and project showcases with minimal backend functionality.",
      technologies: ["Next.js", "React.js", "Tailwind CSS"],
      image: "/images/portfolio-website.png",
      githubUrl: "https://github.com/yogu-code/yogu-portfolio",
      liveUrl: "https://portfolio-yogu.vercel.app",
      date: "2025",
      status: "Completed",
    },
  ];

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  // Title animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h1
            className="text-3xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 tracking-tight"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
            viewport={{ once: true }}
          >
            My
            <motion.span
              className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 dark:from-blue-400 dark:via-purple-400 dark:to-cyan-400"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
            >
              Projects
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.4,
              ease: "easeOut",
            }}
            viewport={{ once: true }}
          >
            Showcasing innovative projects built with modern technologies and
            best practices
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              technologies={project.technologies}
              image={project.image}
              githubUrl={project.githubUrl}
              liveUrl={project.liveUrl}
              date={project.date}
              status={project.status}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default App;