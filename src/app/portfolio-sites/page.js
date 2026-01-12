"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Globe, ShoppingBag, Zap, Laptop } from 'lucide-react';
import { Button } from "@/components/button";

gsap.registerPlugin(ScrollTrigger);

// Dados dos projetos (Siga este padrão para adicionar novos)
const allProjects = [
  { id: 1, category: "sites", title: "SolBikes", tag: "Institucional", img: "/images/Sites/Visual do Projeto Completo.png", link: "https://solbikes.com.br" },
  { id: 2, category: "ecommerce", title: "Lunetterie", tag: "Shopify", img: "/images/Sites/Visual do Projeto Completo (1).png", link: "https://www.lunetterie.com.br" },
  { id: 3, category: "landingpages", title: "Set Go", tag: "SaaS LP", img: "/images/Sites/Visual do Projeto Completo (2).png", link: "https://setgoapp.com/" },
  { id: 4, category: "sites", title: "cÊxito", tag: "Educação", img: "/images/Sites/Visual do Projeto Completo (3).png", link: "https://cexito.com.br" },
];

export default function PortfolioSites() {
  const [filter, setFilter] = useState("todos");
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  const categories = [
    { id: "todos", label: "Todos", icon: <Globe size={16} /> },
    { id: "sites", label: "Sites", icon: <Laptop size={16} /> },
    { id: "landingpages", label: "Landing Pages", icon: <Zap size={16} /> },
    { id: "ecommerce", label: "E-commerce", icon: <ShoppingBag size={16} /> },
  ];

  const filteredProjects = filter === "todos" 
    ? allProjects 
    : allProjects.filter(p => p.category === filter);

  useEffect(() => {
    // Reveal do título estilo DevStep
    gsap.fromTo(titleRef.current, 
      { opacity: 0, y: 100, skewY: 5 },
      { opacity: 1, y: 0, skewY: 0, duration: 1.2, ease: "power4.out" }
    );
  }, []);

  return (
    <div className="bg-[#fbfbfd] min-h-screen pt-40 pb-20">
      <div className="container mx-auto px-6">
        
        {/* Header da Página */}
        <header className="max-w-4xl mb-20">
          <motion.span 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="text-[#7448ff] font-bold text-xs uppercase tracking-[0.5em] mb-6 block"
          >
            Showcase de Excelência
          </motion.span>
          <h1 ref={titleRef} className="font-syne font-extrabold text-6xl md:text-8xl text-black tracking-tighter leading-[0.85] mb-8">
            Nossos <br />
            <span className="text-[#7448ff] italic">Projetos.</span>
          </h1>
          <p className="text-zinc-500 text-xl font-medium max-w-2xl leading-relaxed">
            Explorando as fronteiras do digital com interfaces que convertem e experiências que marcam.
          </p>
        </header>

        {/* Filtros Estilo Pill (DNA Apple) */}
        <nav className="flex flex-wrap gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm transition-all duration-500 border ${
                filter === cat.id 
                ? "bg-black text-white border-black shadow-xl scale-105" 
                : "bg-white text-zinc-500 border-zinc-200 hover:border-[#7448ff] hover:text-[#7448ff]"
              }`}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </nav>

        {/* Grid de Projetos Animada */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                className="group relative bg-white rounded-[2.5rem] overflow-hidden border border-zinc-100 shadow-sm hover:shadow-2xl transition-all duration-700"
              >
                {/* Imagem do Mockup */}
                <div className="aspect-[16/10] overflow-hidden">
                  <img 
                    src={project.img} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                  />
                  {/* Overlay ao Hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-sm">
                    <a 
                      href={project.link} 
                      target="_blank"
                      className="bg-white text-black p-6 rounded-full transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500 shadow-2xl"
                    >
                      <ArrowUpRight size={32} />
                    </a>
                  </div>
                </div>

                {/* Info do Projeto */}
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-black text-[#7448ff] uppercase tracking-widest bg-purple-50 px-3 py-1 rounded-md">
                      {project.tag}
                    </span>
                  </div>
                  <h3 className="text-3xl font-syne font-bold text-black group-hover:text-[#7448ff] transition-colors">
                    {project.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Footer CTA da Página */}
        <footer className="mt-32 p-16 bg-black rounded-[3rem] text-center overflow-hidden relative">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#7448ff]/20 rounded-full blur-[100px] pointer-events-none" />
          <h2 className="text-4xl md:text-5xl font-syne font-bold text-white mb-8 relative z-10">
            Tem uma ideia inovadora? <br />
            <span className="text-[#7448ff]">Vamos construir juntos.</span>
          </h2>
          <Button color="white" size="large" href="https://wa.link/kdl2a4">
            Solicitar Orçamento
          </Button>
        </footer>
      </div>
    </div>
  );
}