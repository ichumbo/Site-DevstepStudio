"use client";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function FancyCards({ cards, cardsRef, cardsControls }) {
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Detecta o card mais centralizado no scroll (mobile)
  useEffect(() => {
    if (!isMobile || !containerRef.current) return;

    const handleScroll = () => {
      const container = containerRef.current;
      const cards = Array.from(container.children);
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

    const container = containerRef.current;
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  return (
    <section
      ref={cardsRef}
      className={`flex flex-col justify-center items-center py-16 ${
        isMobile ? "overflow-x-hidden" : "overflow-hidden"
      }`}
    >
      {/* Container dos cards */}
      <div
        ref={containerRef}
        className={`flex ${
          isMobile
            ? "gap-4 snap-x snap-mandatory overflow-x-auto no-scrollbar scroll-smooth px-4"
            : "gap-[-2rem] md:gap-[-3rem]"
        }`}
      >
        {cards.map((card, i) => (
          <HoverCard
            key={i}
            card={card}
            index={i}
            controls={cardsControls}
            isMobile={isMobile}
          />
        ))}
      </div>

      {/* Indicadores (somente no mobile) */}
      {isMobile && (
        <div className="flex justify-center gap-2 mt-6">
          {cards.map((_, i) => (
            <motion.div
              key={i}
              className={`rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "bg-accent w-3 h-3"
                  : "bg-zinc-300 w-2 h-2"
              }`}
              animate={{ scale: i === activeIndex ? 1.3 : 1 }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function HoverCard({ card, index, controls, isMobile }) {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-50, 50], [8, -8]);
  const rotateY = useTransform(x, [-50, 50], [-8, 8]);

  function handleMouseMove(e) {
    if (isMobile) return;
    const rect = cardRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;
    x.set(offsetX);
    y.set(offsetY);
  }

  function handleMouseLeave() {
    if (isMobile) return;
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isMobile ? 0 : rotateX,
        rotateY: isMobile ? 0 : rotateY,
        transformStyle: "preserve-3d",
      }}
      variants={{
        hidden: {
          opacity: 0,
          y: 20,
          rotate: index === 0 ? -3 : index === 2 ? 3 : 0,
          scale: 1,
        },
        visible: {
          opacity: 1,
          y: 0,
          rotate: index === 0 ? -3 : index === 2 ? 3 : 0,
          scale: 1,
          transition: {
            duration: 0.8,
            delay: index * 0.2,
            ease: "easeOut",
          },
        },
      }}
      initial="hidden"
      animate={controls}
      whileHover={
        isMobile
          ? {}
          : {
              scale: 1.08,
              y: -10,
              boxShadow:
                "0px 25px 50px rgba(0, 0, 0, 0.35), 0 0 20px rgba(255,255,255,0.15)",
            }
      }
      whileTap={isMobile ? {} : { scale: 0.98 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 20,
      }}
      className={`
        ${card.color}
        relative rounded-3xl shadow-lg
        ${
          isMobile
            ? "min-w-[230px] snap-center"
            : "w-[260px] md:w-[300px]"
        }
        p-10 text-center
        h-[280px] md:h-[300px]
        transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
        ${!isMobile && "hover:z-20 cursor-pointer"}
        border group
      `}
    >
      {/* Glow animado */}
      {!isMobile && (
        <motion.div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 blur-2xl"
          style={{
            background:
              "radial-gradient(circle at center, rgba(255,255,255,0.12), transparent 60%)",
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      )}
      <h3 className="font-bold text-lg mb-3 relative z-10">{card.title}</h3>
      <p className="text-sm opacity-80 mb-6 relative z-10">{card.text}</p>
    </motion.div>
  );
}