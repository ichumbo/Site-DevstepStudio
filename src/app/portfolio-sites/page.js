"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// --- COMPONENTE DE CARD ASSIMÉTRICO COM PARALLAX INTERNO ---
function EliteCard({ project, setCursorText, index }) {
  const cardRef = useRef(null);
  const imgRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Efeito de Parallax na imagem ao fazer scroll
    gsap.to(imgRef.current, {
      y: -60,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        scrub: true
      }
    });
  }, []);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 12;
    const y = ((e.clientY - top) / height - 0.5) * -12;

    gsap.to(cardRef.current, {
      rotateY: x,
      rotateX: y,
      scale: 1.03,
      duration: 0.6,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    setCursorText("");
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      scale: 1,
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });
  };

  return (
    <div 
      ref={containerRef}
      className={`relative w-full mb-32 md:mb-0 ${index % 2 !== 0 ? "md:mt-60" : ""}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        onMouseEnter={() => setCursorText("EXPLORAR")}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="perspective-1000"
      >
        <div
          ref={cardRef}
          className="relative aspect-[3/4] rounded-[3.5rem] overflow-hidden bg-zinc-100 shadow-2xl transition-shadow duration-700 hover:shadow-[0_60px_100px_rgba(116,72,255,0.15)]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Imagem com Parallax reverso */}
          <div className="absolute inset-0 scale-125">
            <img 
              ref={imgRef}
              src={project.img} 
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Overlay de Vidro Inferior */}
          <div 
            className="absolute bottom-0 left-0 w-full p-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent text-white"
            style={{ transform: "translateZ(50px)" }}
          >
            <span className="text-[#7448ff] font-bold text-[10px] uppercase tracking-[0.3em] mb-3 block">
              {project.category}
            </span>
            <h3 className="text-4xl md:text-5xl font-syne font-black tracking-tighter leading-none">
              {project.title}
            </h3>
            <div className="mt-6 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
               <div className="h-[1px] w-12 bg-white/30"></div>
               <span className="text-[10px] font-bold uppercase tracking-widest">Ver Case</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function PortfolioSites() {
  const [filter, setFilter] = useState("todos");
  const [cursorText, setCursorText] = useState("");

  // Scroll suave nativo (sem biblioteca externa)
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  const projects = [
    { id: 1, category: "sites", title: "SolBikes", img: "/images/topic-1.png" },
    { id: 2, category: "ecommerce", title: "Lunetterie", img: "/images/topic-3.png" },
    { id: 3, category: "landingpages", title: "Set Go", img: "/images/topic-5.png" },
    { id: 4, category: "sites", title: "cÊxito", img: "/images/topic-2.png" },
  ];

  return (
    <main className="bg-[#fbfbfd] min-h-screen pb-40 selection:bg-[#7448ff] selection:text-white">
      
      {/* 1. Header Brutalista / Minimalista */}
      <section className="container mx-auto px-6 pt-48 pb-32">
        <div className="max-w-[1200px]">
          <motion.span 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="text-[#7448ff] font-black text-sm uppercase tracking-[0.5em] mb-8 block"
          >
            DevStep Studio © 2024
          </motion.span>
          <h1 className="text-7xl md:text-[13rem] font-syne font-black leading-[0.75] tracking-tighter text-black">
            CRAFTING <br />
            <span className="text-zinc-200">BEYOND.</span>
          </h1>
        </div>
      </section>

      {/* 2. Filtro Flutuante Moderno */}
      <div className="sticky top-12 z-[100] flex justify-center mb-40">
        <nav className="bg-black/90 backdrop-blur-2xl p-2 rounded-full border border-white/10 flex gap-2 shadow-2xl scale-90 md:scale-100">
          {["todos", "sites", "landingpages", "ecommerce"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${
                filter === cat ? "bg-[#7448ff] text-white" : "text-zinc-500 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </nav>
      </div>

      {/* 3. Grid Assimétrica de Projetos */}
      <section className="container mx-auto px-6 max-w-[1400px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20">
          <AnimatePresence mode="popLayout">
            {projects
              .filter(p => filter === "todos" || p.category === filter)
              .map((project, index) => (
                <EliteCard 
                  key={project.id} 
                  project={project} 
                  setCursorText={setCursorText} 
                  index={index}
                />
              ))}
          </AnimatePresence>
        </div>
      </section>

      {/* 4. Texto de Fundo (Kinetic Typography) */}
      <div className="fixed inset-0 z-[-1] pointer-events-none opacity-[0.02] flex items-center justify-center">
        <h2 className="text-[40vw] font-black font-syne select-none">STEP</h2>
      </div>

    </main>
  );
}