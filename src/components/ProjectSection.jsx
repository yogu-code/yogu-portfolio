import React from "react";
import { Github, ExternalLink, Calendar, Code } from "lucide-react";

const ProjectCard = ({
  image,
  title = "Project Title",
  description = "A brief description of what this project does and the technologies used to build it.",
  technologies = ["React", "JavaScript"],
  githubUrl,
  liveUrl,
  date = "2024",
  status = "Completed",
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

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full hover:shadow-xl transition-shadow duration-300">
      {/* Image Section */}
      <div className="relative w-full aspect-video bg-gradient-to-br from-blue-500 to-purple-600">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="flex items-center justify-center h-full">
            <Code className="w-16 h-16 text-white/80" />
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
              status
            )}`}
          >
            {status}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Title and Date */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold text-gray-900 flex-1">
            {title}
          </h3>
          <div className="flex items-center text-gray-500 text-sm ml-2">
            <Calendar className="w-4 h-4 mr-1" />
            {date}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {description}
        </p>

        {/* Technologies */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          {githubUrl && githubUrl !== "none" && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              <Github className="w-4 h-4" />
              Code
            </a>
          )}

          {liveUrl && liveUrl !== "none" && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              <ExternalLink className="w-4 h-4" />
              Live Demo
            </a>
          )}

          {(!githubUrl || githubUrl === "none") &&
            (!liveUrl || liveUrl === "none") && (
              <div className="flex-1 flex items-center justify-center gap-2 bg-gray-400 text-white font-medium py-2 px-4 rounded-lg cursor-not-allowed">
                <Code className="w-4 h-4" />
                Coming Soon
              </div>
            )}
        </div>
      </div>
    </div>
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

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 tracking-tight">
            My
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 dark:from-blue-400 dark:via-purple-400 dark:to-cyan-400">
              Projects
            </span>
          </h1>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Showcasing innovative projects built with modern technologies and
            best practices
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
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
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
