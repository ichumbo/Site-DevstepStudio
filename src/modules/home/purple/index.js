"use client";
import { motion } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/button";

export default function PurpleScrollSection() {
  const ref = useRef(null);

  return (
    <section
      ref={ref}
      className="min-h-[70dvh] pt-20 flex flex-col justify-center items-center text-white relative overflow-hidden bg-gradient-to-br from-[#7448FF] to-[#7448FF] px-6"
    >
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="absolute top-8 md:top-10"
      >
        <img
          src="/images/logo.svg"
          className="w-36 md:w-52"
          alt="DevStep Logo"
        />
      </motion.div>

      {/* Título */}
      <motion.h2
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-syne w-full md:w-8/12 lg:w-7/12 mb-6 text-center leading-tight md:leading-[1.2]"
      >
        Topa começar o seu projeto incrível agora mesmo?
      </motion.h2>

      {/* Parágrafo */}
      <motion.p
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-base sm:text-lg md:text-base max-w-md md:max-w-2xl text-center leading-relaxed text-purple-100 px-2"
      >
        Cuidamos das soluções de design e desenvolvimento para colocar seu site no ar.
      </motion.p>

      {/* Botão */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        viewport={{ once: true }}
        className="mt-10"
      >
        <Button
          color="white"
          size="medium"
          
                href="https://wa.link/kdl2a4"
          className="flex rounded-md py-2.5 px-6 text-base sm:text-lg"
        >
          Comece seu Projeto
        </Button>
      </motion.div>
    </section>
  );
}