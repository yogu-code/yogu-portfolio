"use client";
import React, { useEffect, useRef, useState } from "react";

export default function ThankYou() {
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

      const distance = Math.abs(containerScrollTop - sectionOffsetTop);

      const fadeDistance = containerHeight / 2;
      let newOpacity = 1 - distance / fadeDistance;
      newOpacity = Math.max(newOpacity, 0);
      setOpacity(newOpacity);
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBackToTop = () => {
    const scrollContainer = document.getElementById("scrollContainer");
    if (scrollContainer) {
      scrollContainer.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div
      ref={sectionRef}
      style={{ opacity }}
      className="snap-start relative flex flex-col gap-6 items-center justify-center px-4 h-screen w-full transition-opacity duration-700"
    >
      <div className="text-3xl md:text-7xl font-bold text-gray-900 dark:text-white text-center font-robotoFlex">
        Thank You 😁 !!
      </div>
      <p className="text-lg md:text-2xl text-gray-700 dark:text-gray-300 text-center max-w-md">
        We appreciate your time and feedback. Have a great day!
      </p>
      <button
        onClick={handleBackToTop}
        className="px-6 py-3 text-gray-900 dark:text-white border border-gray-900 dark:border-white rounded-md hover:bg-gray-900 dark:hover:bg-white hover:text-white dark:hover:text-gray-900 transition"
      >
        Back to Top
      </button>
    </div>
  );
}