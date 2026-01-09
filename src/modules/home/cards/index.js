"use client";

import Image from "next/image";
import { motion } from "framer-motion";

function InfiniteColumn({ images, tilt = "0deg", duration = 20, reverse = false }) {
  const duplicated = [...images, ...images]; // duplicar pra loop contínuo

  return (
    <div
      className="flex flex-col gap-4 animate-scroll"
      style={{
        rotate: tilt,
        animationDuration: `${duration}s`,
        animationDirection: reverse ? "reverse" : "normal",
      }}
    >
      {duplicated.map((src, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.05, rotate: 0, transition: { duration: 0.3 } }}
          className="overflow-hidden rounded-md shadow-md"
        >
          <Image
            src={src}
            alt={`image-${i}`}
            width={450}
            height={270}
            className="w-full h-[280px] object-cover"
          />
        </motion.div>
      ))}
    </div>
  );
}

export default function InfiniteScrollShowcase() {
  const column1 = [
    "/images/cases/1.png",
    "/images/cases/2.png",
    "/images/cases/3.png",
    "/images/cases/4.png",
    "/images/cases/5.png",
    "/images/cases/18.png",
  ];
  const column2 = [
    "/images/cases/6.png",
    "/images/cases/8.png",
    "/images/cases/7.png",
    "/images/cases/9.png",
    "/images/cases/10.png",
    "/images/cases/19.png",
    "/images/cases/20.png",
  ];
  const column3 = [
    "/images/cases/11.png",
    "/images/cases/12.png",
    "/images/cases/13.png",
    "/images/cases/14.png",
  ];
  const column4 = [
    "/images/cases/15.png",
    "/images/cases/16.png",
    "/images/cases/17.png",
    "/images/cases/4.png",
    "/images/cases/6.png",
    "/images/cases/12.png",
  ];

  return (
    <div className="relative overflow-hidden px-10 h-[86vh] bg-white">
      {/* Gradientes de fade */}
      <div className="pointer-events-none absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-white to-transparent z-10" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-white to-transparent z-10" />

      {/* Colunas */}
      <div className="flex md:flex-row flex-col gap-5 justify-center">
        <InfiniteColumn images={column1} duration={50} />
        <InfiniteColumn images={column2} duration={35} reverse />
        <InfiniteColumn images={column3} duration={45} />
        <InfiniteColumn images={column4} duration={40} reverse />
      </div>
    </div>
  );
}