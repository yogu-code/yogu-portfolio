"use client"
import React, { useEffect, useRef, useState } from "react";

export default function Hero() {
  const sectionRef = useRef(null);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const scrollContainer = document.getElementById("scrollContainer");
    if (!scrollContainer) return;

    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const containerScrollTop = scrollContainer.scrollTop;
      const containerHeight = scrollContainer.clientHeight;
      const sectionOffsetTop = section.offsetTop;

      // Calculate how far the section is from the current scroll position
      const distance = Math.abs(containerScrollTop - sectionOffsetTop);

      const fadeDistance = containerHeight / 2;
      let newOpacity = 1 - distance / fadeDistance;
      newOpacity = Math.max(newOpacity, 0);
      setOpacity(newOpacity);
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    // call once on mount to set initial opacity correctly
    handleScroll();

    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={sectionRef}
      style={{ opacity }}
      className="snap-start relative flex flex-col gap-4 items-center justify-center px-4 h-screen w-full transition-opacity duration-300 ease-out"
    >
      <div className="text-3xl md:text-7xl font-bold dark:text-white text-center font-robotoFlex">
        Yogesh Rane
      </div>
      <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4 text-center font-robotoFlex">
        Web developer
      </div>
    </div>
  );
}
