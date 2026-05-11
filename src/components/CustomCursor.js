"use client";
import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  
  const mouseX = useSpring(0, { stiffness: 500, damping: 28 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 28 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target;
      const isClickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.closest('.clickable') ||
        target.closest('.asset-card') ||
        target.classList.contains('hover-target');

      setIsHovering(!!isClickable);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] hidden items-center justify-center rounded-full pointer-events-none md:flex"
      style={{
        x: mouseX,
        y: mouseY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        width: isHovering ? 58 : 16,
        height: isHovering ? 58 : 16,
        backgroundColor: isHovering ? "#7448ff" : "#000000",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {isHovering && (
        <ArrowUpRight className="h-6 w-6 text-white" strokeWidth={2.5} />
      )}
    </motion.div>
  );
}
