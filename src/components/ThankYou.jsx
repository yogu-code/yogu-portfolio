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

  return (
    <div
      ref={sectionRef}
      style={{ opacity }}
      className="snap-start relative flex flex-col gap-6 items-center justify-center px-4 h-screen w-full transition-opacity duration-700"
    >
      <div className="text-3xl md:text-7xl font-bold dark:text-white text-center font-robotoFlex">
        Thank You 😁 !!
      </div>
      <p className="text-lg md:text-2xl dark:text-gray-300 text-center max-w-md">
        We appreciate your time and feedback. Have a great day!
      </p>
      <button
        onClick={() => (window.location.href = "/")}
        className="px-6 py-3 hover:bg-white hover:border-black hover:text-black underline
         text-white border-white rounded-md transition"
      >
        Back to Home
      </button>
    </div>
  );
}
