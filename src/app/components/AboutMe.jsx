"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function AboutMe() {
  const sectionRef = useRef(null);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate how far the section has moved off screen
      const distanceFromTop = Math.abs(rect.top);
      const fadeDistance = windowHeight / 2; // Start fading after half screen

      let newOpacity = 1 - distanceFromTop / fadeDistance;
      newOpacity = Math.max(newOpacity, 0);
      setOpacity(newOpacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={sectionRef}
      style={{ opacity }}
      className="transition-opacity duration-300 ease-out h-screen snap-start w-full flex flex-col md:flex-row items-center justify-center px-5 md:px-10 max-w-6xl mx-auto gap-8"
    >
      {/* Title - Mobile */}
      <div className="order-1 md:order-none w-full md:hidden text-center font-robotoFlex">
        <h1 className="text-4xl font-bold mb-6">
          Little Bit <br /> About Me!
        </h1>
      </div>

      {/* Left Side - Text */}
      <div className="order-3 md:order-1 flex-1 max-w-md md:pr-10 flex flex-col justify-center text-center md:text-left font-robotoFlex">
        <h1 className="hidden md:block text-5xl font-bold mb-6">
          Little Bit <br className="hidden md:block" /> About Me!
        </h1>
        <p className="text-base md:text-lg text-gray-700 dark:text-gray-300">
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
          src="./portfolio/MySelf.jpeg"
          alt="Yogesh Rane"
          width={400}
          height={400}
          className="rounded-lg shadow-lg object-cover w-full sm:w-auto"
        />
      </div>
    </div>
  );
}
