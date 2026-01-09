"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const FundoAnimado = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"], // controla quando começa/termina o efeito
  });

  // mapeia o progresso do scroll para transformações visuais
const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.7]); // desbota um pouco

  return (
    <motion.div
      ref={ref}
      className="absolute top-0  z-5 md:block hidden"
      style={{ scale, y, opacity }}
      initial={{ opacity: 0, y: 10, scale: 0.9, rotate: -2 }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
        rotate: 0,
      }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
      }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.img
        alt="Web Design"
        loading="lazy"
        src="/images/67a49e07e82621a76fb38ee6_dots.png"
        className="object-cover w-full h-full"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 0.5, -1, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
};