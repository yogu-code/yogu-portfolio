"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const sectionRef = useRef(null);

  // Use Framer Motion's useScroll to track scroll progress
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center start"], // Adjusted: start fading in when section enters, peak at center
    container: typeof document !== "undefined" ? document.getElementById("scrollContainer") || undefined : undefined
  });

  // Transform scroll progress for smooth opacity (0 to 1, no fade out)
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <motion.div
      ref={sectionRef}
      style={{ opacity }}
      className="snap-start relative flex flex-col gap-6 sm:gap-8 items-center justify-center px-6 sm:px-8 h-screen w-full min-h-screen bg-zinc-50 dark:bg-zinc-900"
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="text-4xl sm:text-5xl md:text-7xl font-bold dark:text-white text-center font-robotoFlex">
        Yogesh Rane
      </div>
      <div className="font-extralight text-xl sm:text-2xl md:text-4xl dark:text-neutral-200 py-6 sm:py-8 text-center font-robotoFlex">
        Web developer
      </div>
    </motion.div>
  );
}