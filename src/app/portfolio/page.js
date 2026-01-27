"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Componente de Card Reestilizado (Mais Robusto)
function PortfolioCard({ project, setCursorText }) {
  const cardRef = useRef(null);
  const imgRef = useRef(null);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 15;
    const y = ((e.clientY - top) / height - 0.5) * -15;

    gsap.to(cardRef.current, {
      rotateY: x,
      rotateX: y,
      scale: 1.02,
      duration: 0.6,
      ease: "power2.out",
    });

    // Parallax da imagem interna
    gsap.to(imgRef.current, {
      x: x * 2,
      y: -y * 2,
      scale: 1.1,
      duration: 0.6
    });
  };

  const handleMouseLeave = () => {
    setCursorText("");
    gsap.to(cardRef.current, { rotateY: 0, rotateX: 0, scale: 1, duration: 1, ease: "elastic.out(1, 0.3)" });
    gsap.to(imgRef.current, { x: 0, y: 0, scale: 1, duration: 1 });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative group mb-20 md:mb-0"
      onMouseEnter={() => setCursorText("Click to View")}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        ref={cardRef}
        className="relative aspect-[4/5] md:aspect-[3/4] rounded-[3rem] overflow-hidden bg-white border border-zinc-200/50 shadow-2xl transition-shadow duration-700 hover:shadow-[0_50px_100px_rgba(116,72,255,0.15)]"
        style={{ transformStyle: "preserve-3d" }}
      >
        <img 
          ref={imgRef}
          src={project.img} 
          className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-1000"
          alt={project.title}
        />
        
        {/* Badge Flutuante */}
        <div className="absolute top-10 left-10 overflow-hidden" style={{ transform: "translateZ(50px)" }}>
           <span className="bg-black text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-[0.2em]">
             {project.tag}
           </span>
        </div>

        {/* Info Overlay inferior */}
        <div className="absolute bottom-0 left-0 w-full p-12 bg-gradient-to-t from-black/80 via-black/20 to-transparent text-white" style={{ transform: "translateZ(30px)" }}>
          <p className="text-[#7448ff] font-bold text-xs uppercase tracking-widest mb-2">{project.category}</p>
          <h3 className="text-4xl md:text-5xl font-syne font-black tracking-tighter">{project.title}</h3>
        </div>
      </div>
    </motion.div>
  );
}

export default function PortfolioMelhorado() {
  const [filter, setFilter] = useState("todos");
  const [cursorText, setCursorText] = useState("");
  
  // Exemplo de grid assimétrica (estilo agência)
  const projects = [
    { id: 1, category: "sites", title: "SolBikes", tag: "Creative", img: "/images/topic-1.png" },
    { id: 2, category: "ecommerce", title: "Lunetterie", tag: "Shopify", img: "/images/topic-3.png" },
    { id: 3, category: "landingpages", title: "Set Go", tag: "SaaS", img: "/images/topic-5.png" },
    { id: 4, category: "sites", title: "cÊxito", tag: "E-learning", img: "/images/topic-2.png" },
  ];

  return (
    <div className="bg-[#fbfbfd] min-h-screen pb-32 overflow-hidden selection:bg-[#7448ff] selection:text-white">
      {/* 1. Header Brutalista */}
      <section className="container mx-auto px-6 pt-40 pb-20">
        <div className="flex flex-col md:flex-row justify-between items-end gap-10">
          <div className="max-w-4xl">
            <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1 }}>
              <span className="text-[#7448ff] font-black text-sm uppercase tracking-[0.4em] mb-4 block">Archive 2024-2026</span>
              <h1 className="text-7xl md:text-[12rem] font-syne font-black leading-[0.75] tracking-tighter text-black">
                CRAFTED <br /> <span className="text-zinc-200">DIGITAL.</span>
              </h1>
            </motion.div>
          </div>
          <div className="pb-4">
             <p className="text-zinc-500 font-medium max-w-xs text-lg border-l-2 border-[#7448ff] pl-6">
               Não apenas sites. Construímos sistemas visuais que dominam o mercado.
             </p>
          </div>
        </div>
      </section>

      {/* 2. Filtro Minimalista Flutuante */}
      <div className="sticky top-10 z-[100] flex justify-center mb-24">
        <nav className="bg-black/90 backdrop-blur-xl p-2 rounded-full border border-white/10 flex gap-2 shadow-2xl">
          {["todos", "sites", "landingpages", "ecommerce"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                filter === cat ? "bg-[#7448ff] text-white" : "text-zinc-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </nav>
      </div>

      {/* 3. Grid Assimétrica (O segredo do design avançado) */}
      <section className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-40">
          <AnimatePresence mode="popLayout">
            {projects.filter(p => filter === "todos" || p.category === filter).map((project, index) => (
              <div key={project.id} className={index % 2 !== 0 ? "md:mt-40" : ""}>
                <PortfolioCard project={project} setCursorText={setCursorText} />
              </div>
            ))}
          </AnimatePresence>
        </div>
      </section>
      
      {/* 4. Background Kinetic Text */}
      <div className="fixed inset-0 z-[-1] pointer-events-none opacity-[0.03] flex items-center justify-center">
        <h2 className="text-[30vw] font-black font-syne rotate-12">DEVSTEP</h2>
      </div>
    </div>
  );
}