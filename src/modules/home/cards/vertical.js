"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Kick-off",
    desc: "Reunião para extrair todas as informações importantes sobre o projeto.",
  },
  {
    id: 2,
    title: "Wireframe",
    desc: "Estrutura básica para validar a navegação e fluxo do produto.",
  },
  {
    id: 3,
    title: "Design",
    desc: "Criação da identidade visual e layout final.",
  },
  {
    id: 4,
    title: "Front-end",
    desc: "Desenvolvimento da interface visual do projeto.",
  },
  {
    id: 5,
    title: "Back-end",
    desc: "Implementação da lógica, APIs e banco de dados.",
  },
  {
    id: 6,
    title: "SEO e Otimização",
    desc: "Ajustes para performance e indexação.",
  },
  {
    id: 7,
    title: "Vídeo explicativo",
    desc: "Criação de um vídeo que apresenta o produto.",
  },
];

export default function Processo() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);

  // Scroll suave até o card ativo
  const scrollToCard = (index, smooth = true) => {
    const container = containerRef.current;
    if (!container) return;
    const cards = container.querySelectorAll(".process-card");
    const card = cards[index];
    if (card) {
      const scrollLeft =
        card.offsetLeft - container.offsetWidth / 2 + card.offsetWidth / 2;
      setIsAutoScrolling(true);
      container.scrollTo({
        left: scrollLeft,
        behavior: smooth ? "smooth" : "auto",
      });
      setTimeout(() => setIsAutoScrolling(false), 800);
      setActiveIndex(index);
    }
  };

  const handleNext = () => {
    const next = (activeIndex + 1) % steps.length;
    scrollToCard(next);
  };

  const handlePrev = () => {
    const prev = (activeIndex - 1 + steps.length) % steps.length;
    scrollToCard(prev);
  };

  // Detecta scroll manual
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let timeout;
    const handleUserScroll = () => {
      if (isAutoScrolling) return;
      setIsUserInteracting(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsUserInteracting(false), 4000);

      // Calcula o card mais centralizado
      const cards = Array.from(container.querySelectorAll(".process-card"));
      let closestIndex = 0;
      let closestDistance = Infinity;

      cards.forEach((card, i) => {
        const rect = card.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const distance = Math.abs(
          rect.left + rect.width / 2 - (containerRect.left + containerRect.width / 2)
        );
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = i;
        }
      });

      setActiveIndex(closestIndex);
    };

    container.addEventListener("scroll", handleUserScroll);
    return () => container.removeEventListener("scroll", handleUserScroll);
  }, [isAutoScrolling]);

  // Auto-scroll automático
  useEffect(() => {
    if (isUserInteracting) return;
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [activeIndex, isUserInteracting]);

  return (
    <section className="relative text-zinc-950 px-2 sm:px-6">
      <div className="relative h-[430px] sm:h-[450px]">
        {/* Botões */}
        <div className="hidden sm:flex">
          <button
            onClick={handlePrev}
            className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 bg-accent p-2 sm:p-3 rounded-full shadow-md hover:opacity-80 transition z-40"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 bg-accent p-2 sm:p-3 rounded-full shadow-md hover:opacity-80 transition z-40"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </button>
        </div>

        {/* Container de cards */}
        <div
          ref={containerRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar px-2 items-center h-[430px] sm:h-[450px]"
        >
          {steps.map((step, i) => (
            <AnimatedCard
              key={step.id}
              step={step}
              index={i}
              isActive={activeIndex === i}
            />
          ))}
        </div>

        {/* Indicadores de progresso (mobile) */}
        <div className="flex sm:hidden justify-center gap-2 mt-2">
          {steps.map((_, i) => (
            <motion.div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i === activeIndex ? "bg-accent" : "bg-zinc-500"
              }`}
              animate={{ scale: i === activeIndex ? 1.3 : 1 }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function AnimatedCard({ step, index, isActive }) {
  const controls = useAnimation();

  useEffect(() => {
    controls.start(isActive ? "visible" : "hidden");
  }, [isActive, controls]);

  const variants = {
    hidden: { opacity: 1, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate={controls}
      className={`process-card snap-center shrink-0 w-[250px] sm:w-[300px] p-5 sm:p-6 rounded-xl border border-gray-700 h-[320px] sm:h-[350px] flex flex-col justify-between transition-all duration-500 ${
        isActive
          ? "bg-accent text-white scale-105 shadow-2xl"
          : "bg-zinc-800 text-gray-300 hover:scale-105"
      }`}
    >
      <div>
        <span className="text-sm font-semibold opacity-70">0{step.id}</span>
        <h3 className="text-xl sm:text-2xl font-semibold mt-2">{step.title}</h3>
      </div>
      <p className="text-sm sm:text-base opacity-80">{step.desc}</p>
    </motion.div>
  );
}