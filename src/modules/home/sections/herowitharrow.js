"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/button";

gsap.registerPlugin(ScrollTrigger);

export default function HeroWithArrow() {
  const textRefs = useRef([]);
  const arrowPaths = useRef([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (textRefs.current.length > 0) {
      // Fade-in dos textos
      gsap.fromTo(
        textRefs.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.3, ease: "power2.out" }
      );
    }

    // Configura o SVG da seta
    arrowPaths.current.forEach((path) => {
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
    });

   arrowPaths.current.forEach((path) => gsap.set(path, { opacity: 0, strokeDashoffset: path.getTotalLength() }));

gsap.to(arrowPaths.current, {
  strokeDashoffset: 0,
  opacity: 1,
  duration: 1.5,
  stagger: 0.2,
  ease: "power2.out",
  scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
});
  }, []);

  return (
    <div ref={sectionRef} className="   ">
          

        {/* Animated Arrow */}
        <div className="absolute left-[18%] bottom-40 rotate-[25deg] w-[258px] h-[189px] md:block hidden">
          <svg
            width="258"
            height="189"
            viewBox="0 0 258 189"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              ref={(el) => el && arrowPaths.current.push(el)}
              d="M229.803 1.24548C251.22 55.418 265.12 164.18 149.382 165.847C108.299 164.675 28.2401 145.358 16.6411 141.972"
              stroke="white"
              strokeWidth="2"
              fill="none"
            />
            <path
              ref={(el) => el && arrowPaths.current.push(el)}
              d="M22.5776 137.584L16.1462 142.043L20.0396 148.051"
              stroke="white"
              strokeWidth="2"
              fill="none"
            />
            <path
              ref={(el) => el && arrowPaths.current.push(el)}
              d="M227.491 9.15434C247.876 61.6548 261.379 166.952 152.306 168.138C113.581 166.852 38.0572 147.863 27.113 144.544"
              stroke="white"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div> 
    </div>
  );
}