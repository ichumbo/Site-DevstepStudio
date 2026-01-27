"use client";
import { useRef } from "react";
import { gsap } from "gsap";

export default function Magnetic({ children }) {
  const magneticRef = useRef(null);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = magneticRef.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    
    gsap.to(magneticRef.current, { x: x * 0.35, y: y * 0.35, duration: 1, ease: "elastic.out(1, 0.3)" });
  };

  const handleMouseLeave = () => {
    gsap.to(magneticRef.current, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.3)" });
  };

  return (
    <div 
      className="inline-block"
      ref={magneticRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}