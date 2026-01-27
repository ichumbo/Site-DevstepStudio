"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowUpRight } from "lucide-react";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const [isPointer, setIsPointer] = useState(false);
  const [isOverPurple, setIsOverPurple] = useState(false);

  useEffect(() => {
    const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.15, ease: "power3" });
    const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.15, ease: "power3" });

    const moveCursor = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
      
      // Verificar se está sobre fundo roxo
      const elementUnderCursor = document.elementFromPoint(e.clientX, e.clientY);
      const purpleSection = elementUnderCursor?.closest('.bg-purple-600, .bg-[#7C3AED], [style*="background"][style*="#7C3AED"], .bg-accent');
      setIsOverPurple(!!purpleSection);
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, .clickable, .asset-card');
      if (target) {
        setIsPointer(true);
      } else {
        setIsPointer(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  // Determinar cores baseado no contexto
  const getCursorColors = () => {
    if (isPointer) {
      return isOverPurple 
        ? "w-14 h-14 bg-white shadow-[0_0_20px_rgba(255,255,255,0.4)]" 
        : "w-14 h-14 bg-[#7C3AED] shadow-[0_0_20px_rgba(124,58,237,0.4)]";
    }
    return isOverPurple ? "w-4 h-4 bg-white" : "w-4 h-4 bg-black";
  };

  const getIconColor = () => {
    return isOverPurple ? "text-[#7C3AED]" : "text-white";
  };

  return (
    <div 
      ref={cursorRef}
      className={`fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center rounded-full transition-all duration-300 ease-out hidden md:flex ${getCursorColors()}`}
      style={{ transform: 'translate(-50%, -50%)' }}
    >
      {isPointer && (
        <ArrowUpRight size={20} className={`${getIconColor()} animate-in zoom-in duration-300`} />
      )}
    </div>
  );
}