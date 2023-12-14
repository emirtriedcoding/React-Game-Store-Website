import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa6";

export default function BackToTop() {
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowArrow(scrollY > 125);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function scrolltopTopHandler() {
    window.scrollTo(0, 0);
  }

  return (
    <FaArrowUp
      className={`hidden lg:block  bg-[#00CED1] text-black p-2 rounded-full fixed bottom-5 right-5 cursor-pointer opacity-0 duration-300 z-50 ${
        showArrow && "opacity-100"
      }`}
      size={35}
      onClick={scrolltopTopHandler}
    />
  );
}
