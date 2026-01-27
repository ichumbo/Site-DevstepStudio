"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export const Header = () => {
  const items = [
    { label: "Serviços", url: "/services" },
    { label: "Sobre mim", url: "/about" },
    { label: "Contato", url: "/contact" },
  ];

  const path = usePathname();
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { scrollY } = useScroll();

  // Ativa animação de scroll
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

  // Header base
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.header
      variants={headerVariants}
      initial="hidden"
      animate="visible"
      className="fixed top-0 left-0 z-50 flex justify-center w-full px-4"
    >
      {/* Container principal com fundo branco e blur */}
      <motion.div
        animate={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          boxShadow: scrolled
            ? "0 4px 25px rgba(0,0,0,0.08)"
            : "0 2px 10px rgba(0,0,0,0.04)",
          backdropFilter: "blur(10px)",
        }}
        transition={{ duration: 0.3 }}
        className="flex flex-row justify-between items-center w-full container rounded-2xl py-4 px-6 mt-6 transition-all duration-300"
      >
        {/* Logo com animação */}
        <motion.div
          animate={{
            scale: scrolled ? 0.9 : 1,
            opacity: scrolled ? 0.95 : 1,
            y: scrolled ? 2 : 0,
          }}
          transition={{ type: "spring", stiffness: 250, damping: 18 }}
        >
          <Link href="/home" className="no-underline">
            <img
              src="/images/logo_escura.svg"
              alt="logo"
              className="h-8 md:h-9 cursor-pointer"
            />
          </Link>
        </motion.div>

        {/* Navegação desktop */}
        <nav className="hidden md:hidden gap-8 text-base font-syne font-semibold  ">
          {items.map((item) => (
            <motion.div
              key={item.url}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link
                href={item.url}
                className={`transition-colors duration-200 ${
                  path === item.url
                    ? "text-accent"
                    : "text-zinc-800 hover:text-accent"
                }`}
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Botão principal */}
        <motion.div
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 20px rgba(139, 92, 246, 0.4)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            href="/"
            className={`hidden md:flex rounded-md text-base tracking-wide font-syne font-bold py-2 px-5 transition-all duration-300 ${
              scrolled
                ? "bg-accent text-white hover:bg-accent-foreground"
                : "bg-accent text-white hover:bg-accent-foreground"
            }`}
          >
            Bater um papo
          </Link>
        </motion.div>

        {/* Ícone menu mobile */}
        <div
          className="md:hidden flex flex-col gap-1 cursor-pointer"
          onClick={() => setIsMenuActive(!isMenuActive)}
        >
          <motion.span
            animate={{ rotate: isMenuActive ? 45 : 0, y: isMenuActive ? 6 : 0 }}
            className="w-6 h-[2px] rounded bg-zinc-800"
          />
          <motion.span
            animate={{ opacity: isMenuActive ? 0 : 1 }}
            className="w-6 h-[2px] rounded bg-zinc-800"
          />
          <motion.span
            animate={{ rotate: isMenuActive ? -45 : 0, y: isMenuActive ? -6 : 0 }}
            className="w-6 h-[2px] rounded bg-zinc-800"
          />
        </div>
      </motion.div>

      {/* Menu mobile dropdown */}
      {isMenuActive && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute top-[5.5rem] w-[90%] max-w-6xl bg-white/95 z-50 backdrop-blur-md shadow-xl rounded-2xl flex flex-col items-center py-4 space-y-2 md:hidden"
        >
          {items.map((item) => (
            <Link
              key={item.url}
              href={item.url}
              className="font-syne text-zinc-800 hover:text-accent transition-colors"
              onClick={() => setIsMenuActive(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
                href="https://wa.link/kdl2a4"
            className="font-syne font-bold text-white bg-accent px-4 py-2 rounded-md hover:bg-accent-foreground transition-all"
          >
            Bater um papo
          </Link>
        </motion.div>
      )}
    </motion.header>
  );
};