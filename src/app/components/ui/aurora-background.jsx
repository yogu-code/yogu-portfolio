"use client"
import { cn } from "../../lib/utils";
import React, { useState, useEffect } from "react";

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}) => {
  // State to track scroll position as a percentage of viewport height
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    // Function to update scroll progress
    const handleScroll = () => {
      // Calculate how far the user has scrolled as a percentage of viewport height
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      
      // Calculate progress as a value between 0 and 1
      const progress = Math.min(currentScroll / window.innerHeight, 1);
      setScrollProgress(progress);
    };
    
    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);
    
    // Initial calculation
    handleScroll();
    
    // Clean up event listener
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Calculate interpolated colors based on scroll progress
  const getInterpolatedGradient = () => {
    // First aurora gradient (blue/purple tones)
    const gradient1 = "repeating-linear-gradient(100deg,#3b82f6 10%,#a5b4fc 15%,#93c5fd 20%,#ddd6fe 25%,#60a5fa 30%)";
    
    // Second aurora gradient (green/teal tones)
    const gradient2 = "repeating-linear-gradient(100deg,#10b981 10%,#5eead4 15%,#34d399 20%,#a7f3d0 25%,#2dd4bf 30%)";
    
    // Return the mixed gradient based on scroll progress
    return scrollProgress < 1
      ? `repeating-linear-gradient(100deg,
          color-mix(in srgb, #3b82f6 ${100 - scrollProgress * 100}%, #10b981 ${scrollProgress * 100}%) 10%,
          color-mix(in srgb, #a5b4fc ${100 - scrollProgress * 100}%, #5eead4 ${scrollProgress * 100}%) 15%,
          color-mix(in srgb, #93c5fd ${100 - scrollProgress * 100}%, #34d399 ${scrollProgress * 100}%) 20%,
          color-mix(in srgb, #ddd6fe ${100 - scrollProgress * 100}%, #a7f3d0 ${scrollProgress * 100}%) 25%,
          color-mix(in srgb, #60a5fa ${100 - scrollProgress * 100}%, #2dd4bf ${scrollProgress * 100}%) 30%)`
      : gradient2;
  };

  return (
    <>
      {/* Fixed background div */}
      <div
        className={cn(
          "fixed inset-0 pointer-events-none bg-zinc-50 dark:bg-zinc-900 transition-bg",
          className
        )}
        style={{
          "--aurora": getInterpolatedGradient(),
          "--dark-gradient":
            "repeating-linear-gradient(100deg,#000 0%,#000 7%,transparent 10%,transparent 12%,#000 16%)",
          "--white-gradient":
            "repeating-linear-gradient(100deg,#fff 0%,#fff 7%,transparent 10%,transparent 12%,#fff 16%)",
          "--transparent": "transparent",
        }}
        {...props}
      >
        <div
          className={cn(
            `after:animate-aurora absolute inset-0 max-h-screen
             [background-image:var(--white-gradient),var(--aurora)]
             [background-size:200%,_150%] [background-position:50%_50%,50%_50%]
             opacity-40 blur-[8px] invert filter will-change-transform
             after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)]
             after:[background-size:150%,_80%] after:[background-attachment:fixed]
             after:mix-blend-difference after:content-[""]
             dark:[background-image:var(--dark-gradient),var(--aurora)]
             dark:invert-0 after:dark:[background-image:var(--dark-gradient),var(--aurora)]`,
            showRadialGradient && `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_60%)]`
          )}
        ></div>
      </div>

      {/* Content container above background */}
      <main className="relative z-10">{children}</main>
    </>
  );
};