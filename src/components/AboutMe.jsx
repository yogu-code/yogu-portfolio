"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function AboutMe() {
  const sectionRef = useRef(null);

  // Use Framer Motion's useScroll to track scroll progress
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"] // Track from when section enters to when it leaves
  });

  // Transform scroll progress for smooth opacity (1 to 0)
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  // Transform scroll progress for mobile: subtle upward movement and scale
  const mobileTransform = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["translateY(20px) scale(0.95)", "translateY(0px) scale(1)", "translateY(-20px) scale(1.05)"]
  );

  // Detect mobile for conditional transform
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <motion.div
      ref={sectionRef}
      style={{ opacity, ...(isMobile ? { transform: mobileTransform } : {}) }}
      className="h-screen snap-start w-full flex flex-col md:flex-row items-center justify-center px-5 md:px-10 max-w-6xl mx-auto gap-8"
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Title - Mobile */}
      <div className="order-1 md:order-none w-full md:hidden text-center font-robotoFlex">
        <h1 className="text-4xl font-bold mb-6">
          Little Bit <br /> About Me!
        </h1>
      </div>

      {/* Left Side - Text */}
      <div className="order-3 md:order-1 flex-1 max-w-md md:pr-10 flex flex-col justify-center text-center md:text-left font-robotoFlex">
        <h1 className="hidden md:block text-5xl font-bold mb-6 text-gray-900 dark:text-white">
          Little Bit <br className="hidden md:block" /> About Me!
        </h1>
        <p className="text-base md:text-lg text-white dark:text-white">
          Hi, I’m Yogesh Rane — a passionate web developer specializing in
          building modern, responsive websites and applications. I enjoy
          crafting clean, efficient code and creating user-friendly experiences.
          With a solid foundation in React, JavaScript, and backend
          technologies, I love solving problems and continuously learning new
          tools and frameworks.
          <br />
          <br />
          When I’m not coding, I’m exploring new tech trends, working on
          personal projects, or sharing knowledge with the community.
        </p>
      </div>

      {/* Right Side - Image */}
      <div className="order-2 flex-1 flex justify-center items-center w-full md:w-auto">
        <Image
          src="/MySelf.jpeg"
          alt="Yogesh Rane"
          width={400}
          height={400}
          className="rounded-lg shadow-lg object-cover w-full sm:w-auto"
        />
      </div>
    </motion.div>
  );
}